---
title: 在 Windows 上安装 Node.js 和 npm 的正确方法
shortTitle: 安装 Node.js 和 npm
icon: edit
date: 2022-11-30
category:
  - JavaScript
tag:
  - Node.js
  - npm
---

# 在 Windows 上安装 Node.js 和 npm 的正确方法

npm 是 Node.js下的 JavaScript 包管理器，目前开发前端基本上离不开 npm。

其实安装过程是很简单的，但是我没想到 Node.js 官网上的安装包竟然也有坑。

网上的文章一般是让大家从 Node.js 官网
https://nodejs.org/zh-cn/download/

下载安装包进行安装，但是我下载最新的 LTS 版本（长期维护版）
https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi ，安装后发现npm版本有问题。

官网上写的是Node.js 18.12.1 (包含 npm 8.19.2)，实际装完用 npm -v 查看发现是 6.4.1 版本，此 npm 版本太低，与Node.js 版本不匹配，无法使用，于是我就卸载了。

然后我找到这篇文章
https://learn.microsoft.com/zh-cn/windows/dev-environment/javascript/nodejs-on-windows ，使用 nvm 来安装 Node.js ，安装完后用 npm -v 查看，版本为用 8.19.2 ，这样就完全没有问题了。nvm 还可以实现多个 Node.js 版本共存，切换方便，推荐使用。

**具体安装步骤如下：**

在  https://github.com/coreybutler/nvm-windows/releases 下载 nvm-setup.exe，并安装

安装完 nvm 之后，在命令行执行 nvm list available

使用最新的 LTS 版本 18.12.1 安装（ LTS 比 CURRENT 版本更稳定），我用的安装命令是 nvm install 18.12.1

安装完后使用 nvm ls 可以看到刚安装的 Node.js 版本，通过输入 nvm use 18.12.1 来选择要使用的版本（如果安装多个版本，也可使用 nvm use 版本号 进行切换）

最后使用 node -v 查看 Node.js 版本，使用 npm -v 查看 npm 版本，确认安装成功
