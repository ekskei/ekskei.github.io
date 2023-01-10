---
title: git同步远程仓库分支
icon: edit
author:
  name: ekskei
  url: https://github.com/ekskei
date: 2022-12-06
category:
  - git
tag:
  - git
---

# git同步远程仓库分支

## 本地有新分支，远程没有
在本地新分支中进行以下命令推送即可：
```shell
git push
```

## 远程有新分支，本地没有
```shell
# 将某个远程主机的更新，全部取回本地
git fetch

# 查看所有分支
git branch -a

# 创建并切换分支
git checkout -b 远程分支名 origin/远程分支名
```

## 本地删除了分支，远程也想删除

到gitlab/github/gitee进行删除，或者：
```shell
git push origin -d 分支名
```

## 远程删除了分支，本地也想删除

```shell
git remote prune origin
```
