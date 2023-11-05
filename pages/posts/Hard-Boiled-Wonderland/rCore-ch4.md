---
title: rCore Ch4笔记
author: OceanPresent
time: '2023-10-31'
lang: zh-CN
---

[[toc]]
# 地址空间

## ELF文件
参考：[http://chuquan.me/2018/05/21/elf-introduce/#elf-section-header-table](http://chuquan.me/2018/05/21/elf-introduce/#elf-section-header-table)

ELF文件是一种用于二进制文件、可执行文件、目标代码、共享库和核心转储格式文件的文件格式。
是UNIX系统实验室（USL）作为应用程序二进制接口（Application Binary Interface，ABI）而开发和发布的，也是Linux的主要可执行文件格式。
一个ELF文件由以下三部分组成：

1. ELF头(ELF header) - 描述文件的主要特性：类型，CPU架构，入口地址，现有部分的大小和偏移等等；
2. 程序头表(Program header table) - 列举了所有有效的段(segments)和他们的属性。 程序头表需要加载器将文件中的节加载到虚拟内存段中；
3. 节头表(Section header table) - 包含对节(sections)的描述。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34848238/1698742710631-fbca36ad-2b5b-413c-a735-42d3964431eb.png#averageHue=%23f6f5f4&clientId=u5f9ecd6d-d2ff-4&from=paste&height=205&id=u60baa725&originHeight=351&originWidth=578&originalType=binary&ratio=2&rotation=0&showTitle=false&size=24699&status=done&style=none&taskId=u72411976-9c6a-4802-b2c1-c426a5befa1&title=&width=338)

## Trampoline

trampoline段一般存在内核空间和用户空间的最高地址，用来保存错误处理代码。在__alltraps函数中，在指令`csrw satp, a1`的前后，程序所使用的地址转换方式是不同的，但是trampoline段无论是在内核空间还是用户空间它所在的虚拟地址是相同的，因此下一条指令可以正常继续进行，这种过渡是平滑的

## MMU

MMU是Memory Management Unit的缩写，中文名是内存管理单元，有时称作分页内存管理单元（英语：paged memory management unit，缩写为PMMU）。它是一种负责处理中央处理器（CPU）的内存访问请求的计算机硬件。它的功能包括虚拟地址到物理地址的转换（即虚拟内存管理）、内存保护、中央处理器高速缓存的控制，在较为简单的计算机体系结构中，负责总线的仲裁以及存储体切换（bank switching，尤其是在8位的系统上）。

## 快表TLB

绝大部分应用程序的虚拟地址访问过程具有时间局部性和空间局部性的特点。因此，在 CPU 内部，我们使用MMU中的 快表（TLB, Translation Lookaside Buffer） 来作为虚拟页号到物理页号的映射的页表缓存。

在一个多任务系统中，可能同时存在多个任务处于运行/就绪状态，它们各自的多级页表在内存中共存，那么 MMU 应该如何知道当前做地址转换的时候要查哪一个页表呢？回到 satp CSR 的布局 ，其中的 PPN 字段指的就是多级页表根节点所在的物理页号。因此，每个应用的地址空间就可以用包含了它多级页表根节点所在物理页号的 satp CSR 代表。在我们切换任务的时候， satp 也必须被同时切换。
如果修改了 satp 寄存器，说明内核切换到了一个与先前映射方式完全不同的页表。此时快表里面存储的映射已经失效了，这种情况下内核要在修改 satp 的指令后面马上使用 sfence.vma 指令刷新清空整个 TLB。

同样，我们手动修改一个页表项之后，也修改了映射，但 TLB 并不会自动刷新清空，我们也需要使用 sfence.vma 指令刷新整个 TLB。

## 内核与应用的地址空间

### 逻辑段：一段连续地址的虚拟内存

我们以逻辑段 MapArea 为单位描述一段连续地址的虚拟内存。所谓逻辑段，就是指地址区间中的一段实际可用（即 MMU 通过查多级页表 可以正确完成地址转换）的地址连续的虚拟地址区间，该区间内包含的所有虚拟页面都以一种相同的方式映射到物理页帧，具有可读/可写/可执行等属性。

### 地址空间：一系列有关联的逻辑段

地址空间是一系列有关联的逻辑段，这种关联一般是指这些逻辑段属于一个运行的程序（目前把一个运行的程序称为任务，后续会称为进程）。 用来表明正在运行的应用所在执行环境中的可访问内存空间，在这个内存空间中，包含了一系列的不一定连续的逻辑段。 
