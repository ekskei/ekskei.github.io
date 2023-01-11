---
title: git设置代理
icon: edit
author:
  name: ekskei
  url: https://github.com/ekskei
date: 2022-01-11
category:
  - git
tag:
  - git
---

# git设置代理

电脑上已经启用了代理，浏览器访问 github 很快，但是实际使用中发现 git clone 或者 push 到 github 很慢，经常出现超时。

在网上查了一下，发现 git 默认是不走代理的，需要自己手动设置。方法如下：

## 设置代理
这里使用的是 socks5 代理， PORT 是代理的端口号，需根据实际情况替换。我只针对 github 进行了设置，如果还有其他网站需要走代理，可以按照此方法进行设置。
```
git config --global http.https://github.com.proxy socks5://127.0.0.1:PORT
```

## 取消代理
```
git config --global --unset http.https://github.com.proxy
```