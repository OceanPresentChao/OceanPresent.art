---
title: 使用GitHub Actions自动部署博客
author: OceanPresent
time: '2023-3-4'
lang: zh-CN
---

[[toc]]

# 需求背景
之前更新博客都是用github进行管理，但在具体部署到腾讯云服务器时都是用ftp进行手动传输。虽然用ftp也很方便，但到底也还是要自己输入指令去更新服务器上的文件，经常会出现github和网站上的博客更新不同步的问题。因此研究了一下如何配合GitHub的actions工作流来自动部署博客到服务器上。

## 云服务器的环境准备
1. nginx反向代理要配置好，把访问域名映射到指定的博客文件
2. 防火墙端口记得打开
3. HTTPS服务要支持，不然只能用HTTP访问了
4. 要安装node
5. 允许以ssh的方式访问

## 创建云服务器密钥对
首先在云服务器上创建一个密钥对，公钥在服务器控制台上随时可以查看，私钥会自动下载到电脑上，一定要保存好，掉了就只能重新创建了。

![](http://res.oceanpresent.art/blog/202304031604199.png)

打开要部署的 Github 项目，点击 **secrets and variables -> Actions**。新建一个**secrets**，name随便填，value填刚刚下载到的 **密钥** 。

![](http://res.oceanpresent.art/blog/202304031607876.png)

## 创建yml文件
在项目源代码中创建文件夹 **.github/workflows** ,创建文件 **ci.yml** 填入内容:
```bash
name: Build app and deploy to cloud server
on:
  #监听push操作
  push:
    branches:
      # master分支，你也可以改成其他分支
      - master
jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Install Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '16.14.2'
    - name: Install npm dependencies
      run: npm install
    - name: Run build task
      run: npm run build
    - name: Deploy to Server
      uses: easingthemes/ssh-deploy@v2.1.5
      env:
          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }} #把SERVER_SSH_KEY改成之前github仓库里创建的secret的名称
          ARGS: '-rltgoDzvO --delete'
          SOURCE: dist # 这是要复制到静态服务器的文件夹名称
          REMOTE_HOST: 'xxx.xxx.xxx.xxx' # 你的云服务器公网地址
          REMOTE_USER: root # 云服务器登录后默认为 root 用户，并且所在文件夹为 root
          TARGET: /www/server # 打包后的 dist 文件夹将放在 /www/server
```

保存，推送到 Github 上。
以后只要项目执行 git push 操作，就会自动执行 ci.yml 定义的脚本，将打包文件放到云服务器上。
这个 Actions 主要做了两件事：

1. 克隆项目，下载依赖，打包。
2. 用云服务器私钥以 SSH 的方式登录到云服务，把打包的文件上传（使用 rsync）到指定的文件夹中。

![](http://res.oceanpresent.art/blog/202304031608186.png)