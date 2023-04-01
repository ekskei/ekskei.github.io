---
title: git不同分支代码的合并
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

# git不同分支代码的合并

项目不同分支之间代码的合并是常用的操作。

假设要把branchA的代码合并到branchB，步骤如下：

（1）切换到branchB中，执行：

```shell
git merge branchA --squash
```

--squash 选项的含义是：不提交、不移动HEAD，因此需要一条额外的commit命令。效果相当于将原来分支上的多个commit合并成一个，放在当前分支上，原来的commit历史记录不合并过来（前提是分支的commit历史不重要）。

（2）提交合并后的代码

```shell
git commit -m "合并分支代码"
```

（3）将代码推送到远程仓库

```shell
git push
```
