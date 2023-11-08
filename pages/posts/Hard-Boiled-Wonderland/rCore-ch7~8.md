---
title: rCore Ch7~8笔记
author: OceanPresent
time: '2023-11-5'
lang: zh-CN
---

[[toc]]

## 进程间通信IPC
IPC的目标：多进程协作完成复杂应用需求

- 功能模块化
- 程序之间可以相对隔离
- 多个程序的合作可完成复杂的事情

进程间通信的定义：各进程之间通过数据交换（共享或传递）进行交互的行为
进程通信的方式
直接通信：两个进程间不需要通过内核的中转，就可以相互传递信息
间接通信：两个进程间通过系统调用和内核的中转，来相互传递消息

![0198afc7cc0037ed0f733a74a94f3d74.png](https://cdn.nlark.com/yuque/0/2023/png/34848238/1699018032098-5281b246-70b7-4503-9d41-c2be4534aaab.png#averageHue=%23f5f0dd&clientId=u07e14824-3efb-4&from=paste&height=416&id=ud5c475b9&originHeight=832&originWidth=1434&originalType=binary&ratio=2&rotation=0&showTitle=false&size=195184&status=done&style=none&taskId=u52a1a67e-3ccf-43ac-97ee-d4d0f0f0596&title=&width=717)

### 信号处理过程

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34848238/1699104475667-455fcafa-6ce7-4376-9669-515c2eab5c3a.png#averageHue=%23f9f8f8&clientId=u07e14824-3efb-4&from=paste&height=444&id=ub4368b8e&originHeight=887&originWidth=659&originalType=binary&ratio=2&rotation=0&showTitle=false&size=260124&status=done&style=none&taskId=u3a57c7c0-928f-4be5-a269-bfee8fbe529&title=&width=329.5)

## 并发

### 线程

线程是进程的一部分，描述指令流执行状态。它是进程中的指令执行流的基本单元，是CPU调度的基本单位。
为什么要线程

1. 并行实体（多个顺序控制流）共享同一个地址空间和所有可用数据
2. 访问数据和共享资源方便
3. 切换控制流轻量
4. 管理不同控制流便捷

进程vs线程

- 进程是资源（包括内存、打开的文件等）分配的单位，线程是 CPU 调度的单位；
- 进程拥有一个完整的资源平台，而线程只独享必不可少的资源，如寄存器和栈；
- 线程同样具有就绪、阻塞、执行三种基本状态，同样具有状态之间的转换关系；
- 线程能减少并发执行的时间和空间开销；
- 一个进程中可以同时存在多个线程；
- 各个线程之间可以并发执行；
- 各个线程之间可以共享地址空间和文件等资源；
- 当进程中的一个线程崩溃时，会导致其所属进程的所有线程崩溃（这里是针对 C/C++ 语言，Java语言中的线程崩溃不会造成进程崩溃）。

线程的不足
大规模并发I/O操作场景下

1. 大量线程占内存总量大
2. 管理线程程开销大
3. 创建/删除/切换
4. 访问共享数据易错

### 协程

协程由Melvin Conway在1963年提出并实现，协程是“行为与主程序相似的子例程(subroutine)”，协程采用同步编程方式支持大规模并发I/O异步操作。

协程是一种程序组件，是由子例程（过程、函数、例程、方法、子程序）的概念泛化而来的，子例程只有一个入口点且只返回一次，协程允许多个入口点，可在指定位置挂起和恢复执行。

协程的核心思想：控制流的主动让出与恢复

![3a713ca0658b234bdf796ed5555ba4c9.png](https://cdn.nlark.com/yuque/0/2023/png/34848238/1699106486368-26d549bc-9c9b-45ac-b063-831c3439a636.png#averageHue=%23f7f7f6&clientId=u07e14824-3efb-4&from=paste&height=321&id=u6e5d29fa&originHeight=1206&originWidth=1266&originalType=binary&ratio=2&rotation=0&showTitle=false&size=314901&status=done&style=none&taskId=u45de022b-7b6a-4c7a-8f50-cb8471f60e3&title=&width=337)

## 同步与互斥

### 实现方法

1. 禁用中断（仅限于单处理器）
2. 软件方法（复杂）
3. 锁是一种高级的同步抽象方法
   1. 硬件原子操作指令（单处理器或多处理器均可）
   2. 互斥可以使用锁来实现

### 信号量

信号量是被保护的整数变量
初始化完成后，只能通过P()和V()操作修改，由操作系统保证，PV操作是原子操作，P() 可能阻塞，V()不会阻塞
通常假定信号量是“公平的”，线程不会被无限期阻塞在P()操作，假定信号量等待按先进先出排队
