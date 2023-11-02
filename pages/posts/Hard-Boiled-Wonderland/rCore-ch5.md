---
title: rCore Ch5笔记
author: OceanPresent
time: '2023-11-1'
lang: zh-CN
---

[[toc]]
# rCore Ch5

### 进程

![](http://res.oceanpresent.art/blog/202311021251475.png)

任务抽象进化成了进程抽象，其主要改动集中在进程管理上，提供了新的系统调用：sys_fork(创建子进程)、sys_waitpid(等待子进程结束并回收子进程资源)、sys_exec（用新的应用内容覆盖当前进程，即达到执行新应用的目的）。

为了让用户能够输入命令或执行程序的名字，ProcessOS还增加了一个 read 系统调用服务，这样用户通过操作系统的命令行接口 – 新添加的 shell 应用程序发出命令，来动态地执行各种新的应用。

![](http://res.oceanpresent.art/blog/202311021251813.png)

### 进程回收机制

进当一个进程主动退出或出错退出的时候，在 exit_current_and_run_next 中会立即回收一部分资源并在进程控制块中保存退出码
而需要等到它的父进程通过 waitpid 系统调用（与 fork/exec 两个系统调用放在相同位置）捕获到它的退出码之后，它的进程控制块才会被回收，从而该进程的所有资源都被回收。

### 用户初始程序

当内核初始化完毕之后，它会从可执行文件 initproc 中加载并执行用户初始程序 initproc，而用户初始程序 initproc中又会 fork 并 exec 来运行shell程序 user_shell 。这两个应用虽然都是在 CPU 的 U 特权级执行的，但是相比其他应用，它们要更加底层和基础。

### 任务调度的idle流

Processor 有一个不同的 idle 控制流，它运行在这个 CPU 核的启动栈上，功能是尝试从任务管理器中选出一个任务来在当前 CPU 核上执行。在内核初始化完毕之后，会通过调用 run_tasks 函数来进入 idle 控制流
调度功能的主体是 run_tasks() 。它循环调用 fetch_task 直到顺利从任务管理器中取出一个任务，随后便准备通过任务切换的方式来执行

当一个应用用尽了内核本轮分配给它的时间片或者它主动调用 yield 系统调用交出 CPU 使用权之后，内核会调用 schedule 函数来切换到 idle 控制流并开启新一轮的任务调度。

```rust
// os/src/task/processor.rs

pub fn schedule(switched_task_cx_ptr: *mut TaskContext) {
    let mut processor = PROCESSOR.exclusive_access();
    let idle_task_cx_ptr = processor.get_idle_task_cx_ptr();
    drop(processor);
    unsafe {
        __switch(
            switched_task_cx_ptr,
            idle_task_cx_ptr,
        );
    }
}
```

注意，换入/换出进程和调度执行流在内核层各自执行在不同的内核栈上，分别是进程自身的内核栈和内核初始化时使用的启动栈。这样的话，调度相关的数据不会出现在进程内核栈上，也使得调度机制对于换出进程的Trap执行流是不可见的