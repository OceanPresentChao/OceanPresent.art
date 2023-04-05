---
title: Webcam-MineSweeper开发日志
author: OceanPresent
time: '2022-10-20'
lang: zh-CN
---

[[toc]]

# 总结

源代码仓库：[OceanPresentChao/Webcam-MineSweeper](https://github.com/OceanPresentChao/Webcam-MineSweeper)

Demo：[演示](https://oceanpresentchao.github.io/Webcam-MineSweeper/)

# 前置知识

## 迁移学习

迁移学习是指在一个任务中学习到的知识和经验，如何应用到另一个相关任务中的机器学习方法。它是一种利用已有的知识和经验来解决新问题的方法，可以加快新任务的学习速度和提高其性能。

传统的机器学习方法需要大量的数据来训练模型，而迁移学习则可以利用已经训练好的模型的知识来加快训练过程，并且可以在新的任务上表现出更好的性能。迁移学习的核心思想是将一个已经训练好的模型的权重参数作为起点，进一步训练调整到目标任务上。

# 项目具体实现

## 架构

Webcam- MineSweeper源自于之前做的Vue-MineSweeper，在该项目的基础上增加了通过摄像头配合tensorflow.js训练模型进行游玩的功能。
项目架构主要分为两部分：

1. 原生的扫雷游戏Vue-MineSweeper
2. tensorflow.js通过摄像头采集图片训练分类模型

当训练好模型后，点击开始按钮，模型会启动一个定时器不断获取摄像头的图片，根据图片分类结果来判断用户所做的操作。通过mitt库来触发事件来操作Vue-MineSweeper游戏。

## 训练样本和标签的获取

当启动了webcam后，可以webcam.capture函数来获取图片，我们创建一个训练集类来专门保存用户自己添加的图片样本和标签

```typescript
function addExample(example: tf.Tensor, label: OperationLabel) {
    // 执行给定的函数，即 fn，一旦它终止，它就会清除由指定函数 fn 分配的所有等距张量Tensors，但不包括 fn 返回的张量。
    const y = tf.tidy(() => tf.oneHot(tf.tensor1d([label]).toInt(), this.numClasses))

    if (this.xs === null || this.ys === null) {
      // keep函数存储的Tensor不会在tidy函数中清除
      this.xs = tf.keep(example)
      this.ys = tf.keep(y)
    }
    else {
      const oldX = this.xs
      this.xs = tf.keep(oldX.concat(example, 0))

      const oldY = this.ys
      this.ys = tf.keep(oldY.concat(y, 0))

      oldX.dispose()
      oldY.dispose()
      y.dispose()
    }
  }
```

## 原理

### 模型结构

第一层：Flatten层
创建扁平化层，这层的功能是将输入的张量也就是mobilenet卷积层的输出扁平化为一个矢量。从技术角度来讲，这一层其实就是张量的一次变形，并没有任何计算以及网络权重参数{inputShape: [7, 7, 256]}

```typescript
tf.layers.flatten({
        inputShape: truncatedModel.outputs[0].shape.slice(1),
      })
```

第二层：全连接层

```typescript
tf.layers.dense({
        units: config.units,//定义神经元个数
        activation: 'relu',//定义激活函数为relu
        kernelInitializer: 'varianceScaling',//定义网络权重的初始化函数，使用varianceScaling来进行权重初始化
        useBias: true,// 网络带有偏置权重
      })
```

第三层：全连接层

```typescript
tf.layers.dense({
        units: config.classnum,
        kernelInitializer: 'varianceScaling',
        useBias: false,
        activation: 'softmax',
      })
```

### 优化器

这里使用了基于自适应动量的参数优化算法，学习算法的学习率在网页上设置

```typescript
const optimizer = tf.train.adam(config.learningRate)
```

### 损失函数

损失函数使用categoricalCrossentropy，在complie函数里配置即可

```typescript
sequentialModel.compile({ optimizer, loss: 'categoricalCrossentropy' })
```

### 训练

将之前用户自己添加的数据集和网页应用上用户自己设置的参数传入fit函数

```typescript
// model.fit()方法用于执行训练过程
  sequentialModel.fit(controllerDataset.xs, controllerDataset.ys, {
    batchSize,//训练批次大小
    epochs: config.epochs,//训练的阶段数，也就是在一组数据上重复训练几次
    callbacks: {
      onBatchEnd: async (batch, logs) => {
        config.status = `Loss: ${logs!.loss.toFixed(5)}`
      },
      onTrainBegin: () => {
        config.status = 'training'
      },
      onTrainEnd: () => {
        config.status += ' train finished'
      },
    },
  })
```

### 预测图片的类别

本项目最关键的部分莫过于预测图片的类别，这决定了Vue- MineSweeper这个游戏该进行什么操作。例如模型预测了当前的图片类型为“Up”，那么Vue- MineSweeper中就会选择 当前被选中的格子 上方的格子；当预测图片类型为“click”，那么Vue- MineSweeper就会打开当前被选择的格子（相当于鼠标左键）

项目基于迁移学习模型，将图片先传入tensorflw.js自带的mobilenet，跑完卷积层后，将输出再传入我们自己创建的Sequential模型。最后得到预测的图片类型。

```typescript
async function predictImage(truncatedModel: tf.LayersModel, sequentialModel: tf.Sequential, image: tf.Tensor) {
  // 使用mobilenet网络进行第一步预测, 获取mobilenet网络的卷积层激活函数的输出.
  const embeddings = truncatedModel.predict(image)
    // 使用新训练的迁移层对网络进行训练，使用mobilenet作为输入
  const predictions = sequentialModel.predict(embeddings)
  if (predictions instanceof tf.Tensor) {
    // 返回预测的手势中概率最大的那一个。对应来说就是网络识别后认为最可能的手势。
    const predictedClass = predictions.as1D().argMax()
    const classId = (await predictedClass.data())[0]//获取预测类别
    return classId
  }
}
```