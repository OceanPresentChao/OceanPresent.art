---
title: rCore Ch6笔记
author: OceanPresent
time: '2023-11-3'
lang: zh-CN
---

[[toc]]

## 文件系统

### 文件和目录

![](https://cdn.nlark.com/yuque/0/2023/png/34848238/1699017129334-3b6dc72c-f955-45a8-89da-5be0338a71da.png#averageHue=%23e9e9e9&clientId=u07e14824-3efb-4&from=paste&id=ucc103c12&originHeight=326&originWidth=564&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u36991e6f-011f-42d5-89d5-7ca885f8801&title=)

### 文件系统

常规文件和目录都是实际保存在持久存储设备中的。持久存储设备仅支持以扇区（或块）为单位的随机读写，这和 通过路径即可索引到文件并以字节流进行读写 的 用户视角 有很大的不同。负责中间转换的便是 文件系统 (File System) 。

文件系统负责将逻辑上的目录树结构（包括其中每个文件或目录的数据和其他信息）映射到持久存储设备上，决定设备上的每个扇区应存储哪些内容。反过来，文件系统也可以从持久存储设备还原出逻辑上的目录树结构。

因此文件系统有不同的实现，例如Windows 上的 FAT/NTFS 和 Linux 上的 Ext3/Ext4/Btrfs。同一台设备的不同持久化设备可以使用不同类型的文件系统。

在内核中有一层 虚拟文件系统 (VFS, Virtual File System) ，它规定了逻辑上目录树结构的通用格式及相关操作的抽象接口，只要不同的底层文件系统均实现虚拟文件系统要求的那些抽象接口，再加上 挂载 (Mount) 等方式，这些持久存储设备上的不同文件系统便可以用一个统一的逻辑目录树结构一并进行管理。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34848238/1699017209379-162dd436-cc68-4fdb-97f1-5258b04fdf1f.png#averageHue=%23fdfcfb&clientId=u07e14824-3efb-4&from=paste&height=94&id=u0557d05b&originHeight=187&originWidth=856&originalType=binary&ratio=2&rotation=0&showTitle=false&size=49519&status=done&style=none&taskId=uaee68ce2-9eb0-4517-a2c8-a4d704564a9&title=&width=428)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34848238/1699017364641-e377f16c-3861-4f88-b9bb-3d7fd12f7cea.png#averageHue=%23faf8ed&clientId=u07e14824-3efb-4&from=paste&height=343&id=ua78dc0c5&originHeight=686&originWidth=1182&originalType=binary&ratio=2&rotation=0&showTitle=false&size=180472&status=done&style=none&taskId=u466d0a07-359a-495a-9b65-a6b88c5ae3d&title=&width=591)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34848238/1699017369794-80ce927b-2c35-4c9d-a201-2345c01da998.png#averageHue=%23fefdfc&clientId=u07e14824-3efb-4&from=paste&height=230&id=uc9a27598&originHeight=460&originWidth=771&originalType=binary&ratio=2&rotation=0&showTitle=false&size=89471&status=done&style=none&taskId=ua9e65e08-c7d3-4ef2-abe1-6d26f07980a&title=&width=385.5)

### 文件系统easy-fs

easy-fs crate 自下而上大致可以分成五个不同的层次：

1. 磁盘块设备接口层：定义了以块大小为单位对磁盘块设备进行读写的trait接口
2. 块缓存层：在内存中缓存磁盘块的数据，避免频繁读写磁盘
3. 磁盘数据结构层：磁盘上的超级块、位图、索引节点、数据块、目录项等核心数据结构和相关处理
4. 磁盘块管理器层：合并了上述核心数据结构和磁盘布局所形成的磁盘文件系统数据结构，以及基于这些结构的创建/打开文件系统的相关处理和磁盘块的分配和回收处理
5. 索引节点层：管理索引节点（即文件控制块）数据结构，并实现文件创建/文件打开/文件读写等成员函数来向上支持文件操作相关的系统调用

#### 磁盘布局

在 easy-fs 磁盘布局中，按照块编号从小到大顺序地分成 5 个不同属性的连续区域：
最开始的区域的长度为一个块，其内容是 easy-fs 超级块 (Super Block)。超级块内以魔数的形式提供了文件系统合法性检查功能，同时还可以定位其他连续区域的位置。
第二个区域是一个索引节点位图，长度为若干个块。它记录了后面的索引节点区域中有哪些索引节点已经被分配出去使用了，而哪些还尚未被分配出去。
第三个区域是索引节点区域，长度为若干个块。其中的每个块都存储了若干个索引节点。
第四个区域是一个数据块位图，长度为若干个块。它记录了后面的数据块区域中有哪些数据块已经被分配出去使用了，而哪些还尚未被分配出去。
最后的区域则是数据块区域，顾名思义，其中的每一个已经分配出去的块保存了文件或目录中的具体数据内容。

![](http://res.oceanpresent.art/blog/202311032109711.png#id=nMxHr&originHeight=251&originWidth=1109&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)