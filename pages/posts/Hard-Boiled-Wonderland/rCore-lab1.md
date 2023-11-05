---
title: rCore Lab1笔记
author: OceanPresent
time: '2023-10-28'
lang: zh-CN
---

[[toc]]
# 编程题
## 获取任务信息

思路：题目要求查询的信息都是全局持久化的，因此需要在TaskControlBlock中添加这些信息。

task_status已经存在，不需要添加

task_syscall_times需要在sys_call函数中拦截，根据系统调用的id进行桶计数即可

task_runtime比较麻烦，有两种思路：
1. 保存任务第一次调度的时间，在sys_task_info调用时将当前时间和第一次的时间相减（我的做法）
2. 分别记录任务在用户态和系统态下的时间，在sys_task_info调用时将两者相加。(此思路源于[参考](https://hangx-ma.github.io/2023/07/01/rcore-note-ch3.html))
   1. 内核态时间.在 run_first_task 以及 mark_current_exited， mark_current_suspend 中更新信息， 另外需要在 task 退出时打印耗时。
   2. 用户态时间.用户态和内核态的分界处就是 trap， 因而在 trap_handler 的起始位置和末尾位置可分别作为 user time 的开始以及 user time 的结束。

# 问答题
## 1 运行 Rust 三个 bad 测例 (ch2b_bad_*.rs) 
错误信息：

```
[ERROR] [kernel] .bss [0x8027b000, 0x802a4000)
[kernel] PageFault in application, bad addr = 0x0, bad instruction = 0x804003c4, kernel killed it.
[kernel] IllegalInstruction in application, kernel killed it.
[kernel] IllegalInstruction in application, kernel killed it.
```

sbi版本：
RUST sbi v0.3.2

## 2 深入理解 trap.S 中两个函数 __alltraps 和 __restore
### 1 L40：刚进入 __restore 时，a0 代表了什么值。请指出 __restore 的两种使用情景。

a0代表当前Trap的TrapContext地址，因为a0常用来存储函数的返回值，而traphandler的返回值是trapcontext的引用

>当批处理操作系统初始化完成，或者是某个应用程序运行结束或出错的时候，我们要调用 run_next_app 函数切换到下一个应用程序。此时 CPU 运行在 S 特权级，而它希望能够切换到 U 特权级。

因此__restore可用于：
1. 批处理操作系统初始化完成后，从内核态切换到运行第一个应用程序
2. 当一个应用程序结束或者Trap结束后，从内核态恢复到用户态运行下一个应用程序

### 2 L43-L48：这几行汇编代码特殊处理了哪些寄存器？这些寄存器的的值对于进入用户态有何意义？请分别解释。
```
ld t0, 32*8(sp)
ld t1, 33*8(sp)
ld t2, 2*8(sp)
csrw sstatus, t0
csrw sepc, t1
csrw sscratch, t2
```
由struct TrapContext的定义可知，32*8(sp)代表sstatus，33*8(sp)代表sepc，2*8(sp)代表用户栈sp的地址（TrapContext的set_sp函数将x[2]设为sp）

- sstatus：设置该寄存器的值来改变CPU特权级状态，
- sepc：记录trap结束后返回的应用程序需要继续执行的地址
- sp：指定用户程序执行时使用的栈

### 3 L50-L56：为何跳过了 x2 和 x4？
```
ld x1, 1*8(sp)
ld x3, 3*8(sp)
.set n, 5
.rept 27
   LOAD_GP %n
   .set n, n+1
.endr
```

x2和x4分别保存了sp和tp（thread pointer）的值。x2此时保存的是内核栈的地址，覆盖掉会导致错误；tp的值目前一直用不到，所以就不操作=。=、

### 4 L60：该指令之后，sp 和 sscratch 中的值分别有什么意义？
```
csrrw sp, sscratch, sp
```
sp指向用户栈，sscratch指向内核栈

### 5 __restore：中发生状态切换在哪一条指令？为何该指令执行之后会进入用户态？

我以为发生在`csrw sstatus, t0`指令中，因为该指令修改了sstatus的值。实际上是发生在`sret`指令中，因为 sret 会应用 sstatus 上设定的特权级

### 6 L13：该指令之后，sp 和 sscratch 中的值分别有什么意义？
```
csrrw sp, sscratch, sp
```

sp指向内核栈，sscratch指向用户栈

### 7 从 U 态进入 S 态是哪一条指令发生的？

发生在ecall指令。在执行ecall指令时，sstatus会先被设置为此时的CPU特权级（S或U），然后跳转到__alltraps，同时把特权级设置为S