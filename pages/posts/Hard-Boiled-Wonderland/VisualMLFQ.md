---
title: 基于反馈排队算法的CPU调度的模拟实现
author: OceanPresent
time: '2022-10-11'
lang: zh-CN
---
[[toc]]

# 总结

源代码仓库：[OceanPresentChao/Visual-MLFQ](https://github.com/OceanPresentChao/Visual-MLFQ)

Demo：[演示](https://oceanpresentchao.github.io/Visual-MLFQ/)

# 题目要求

## 功能要求

1、就绪队列设置

设置就绪队列个数（≥3）及每个就绪队列优先级和每个就绪队列时间片

2、运行结果

- 模拟动态创建多个进程，依据反馈排队算法调度原理，动态显示就绪队列中的进程、进程的剩余时间及占有CPU的进程
- 动态显示等待队列中的进程（假设当前只有一个事件的等待队列）

## 具体细节
1. 设置多个进程（进程名、运行时间）进入就绪队列
2. 依据反馈排队算法的调度原理，对就绪队列中的进程进行调度或使进程进入相应的就绪队列
3. 当就绪队列中进程被调度，要启动一个相对时钟以反映运行的时间片
4. 一个进程占有CPU运行时，要随机产生I/O请求或I/O请求完成
5. 当随机产生I/O请求时，占有CPU的进程要进入等待队列
6. 当随机产生I/O完成时，等待队列的进程要进入相应的就绪队列

# 实验环境


|  |  |
| ----------- | ----------- |
| 开发平台      | Windows 10 、Web浏览器      |
| 编译语言   | JavaScript 、  Typescript     |
| 使用框架	| Vue3、Fabric、ECharts  |
| 部署平台	| OpenEuler、Github Pages |

# 算法分析

## MLFQ

MLFQ中有许多独立的队列（queue），每个队列有不同的优先级（priority level）。任何时刻，一个工作只能存在于一个队列中。MLFQ总是优先执行较高优先级的工作（即在较高级队列中的工作）。

进程在队列中运行遵循如下特点：

规则1：如果A的优先级 > B的优先级，运行A（不运行B）。

规则2：如果A的优先级 = B的优先级，轮转运行A和B。

规则3：工作进入系统时，放在最高优先级（最上层队列）。

规则 4：一旦工作用完了其在某一层中的时间配额（无论中间主动放弃了多少次CPU），就降低其优先级（移入低一级队列）。

规则5：经过一段时间S，就将系统中所有工作重新加入最高优先级队列。

# 程序实现

## 程序特点
1.	设置界面
2.	进程、IO添加自定义化
3.	Canvas绘制
4.	进程信息图表统计

## 对象模拟

程序设计主要运用面向对象的思想，创建了进程Process类、IO类、队列Queue类，Queue类下延伸出了就绪、运行、等待队列，IO队列。

### Process类设计

![](http://res.oceanpresent.art/blog/202304042225247.png)

### IO类设计

![](http://res.oceanpresent.art/blog/202304042226146.png)

### 队列类设计

![](http://res.oceanpresent.art/blog/202304042226153.png)

## 可视化绘制

进程、IO、队列的绘制主要使用web浏览器的canvas，结合fabric框架。传入对象，绘制函数根据对象的各类属性的值动态渲染图像的位置、文字显示属性值。

下图为绘制IO的函数

![](http://res.oceanpresent.art/blog/202304042226579.png)

## 动画实现

使用setInterval函数定时每0.1s修改进程的任务剩余时间、当前时间片的时间，并依靠Vue3框架的响应式，触发渲染绘制函数。从而实现数据和页面可视化的同步和解耦。

![](http://res.oceanpresent.art/blog/202304042226562.png)

上图为调用Vue框架的watch函数来监听队列对象的数值变化，触发图像的重新渲染。

# 程序演示

## 设置界面

![](http://res.oceanpresent.art/blog/202304042226959.png)

## 运行界面

![](http://res.oceanpresent.art/blog/202304042227008.png)

## 进程信息统计界面

![](http://res.oceanpresent.art/blog/202304042227681.png)