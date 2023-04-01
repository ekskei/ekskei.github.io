---
title: git基本操作
icon: edit
author:
  name: ekskei
  url: https://github.com/ekskei
date: 2022-12-01
category:
  - git
tag:
  - git
---
# git基本操作

git是一个分布式版本控制系统，用于管理软件项目的源代码。以下内容为git的基本操作。

## 安装git

### 在Windows上安装git

访问git官网下载安装程序，然后按照提示进行安装。

### 在Mac上安装git

使用Homebrew进行安装：

brew install git

### 在Linux上安装git

使用包管理器进行安装，例如在Ubuntu上：

sudo apt-get install git

## 配置git

配置用户名和邮箱（提交代码时需要）：

git config --global user.name "Your Name"

git config --global user.email "your.email@example.com"

查看配置信息：

git config --list

## 创建仓库

### 初始化仓库

在项目根目录执行以下命令：

git init

这将创建一个名为.git的隐藏目录，用于存储仓库数据。

### 克隆仓库

从远程仓库克隆一个项目：

git clone "repository_url"

## 操作文件

1. 查看文件状态

    git status

2. 跟踪文件

    将文件添加到暂存区：

    git add "file"

    将所有文件添加到暂存区：

    git add .

3. 提交更改

    将暂存区的更改提交到仓库：

    git commit -m "Commit message"

4. 查看提交历史

    git log

    查看简洁的提交历史：

    git log --oneline

## 分支管理

1. 查看分支

    git branch

2. 创建分支

    git branch "new_branch_name"

3. 切换分支

    git checkout "branch_name"

4. 创建并切换分支

    git checkout -b "new_branch_name"

5. 合并分支

    将指定分支合并到当前分支：

    git merge "branch_name"

6. 删除分支

    git branch -d "branch_name"

## 远程仓库操作

1. 添加远程仓库

    git remote add "remote_name" "repository_url"

2. 查看远程仓库

    git remote -v

3. 推送到远程仓库

    git push "remote_name" "branch_name"

4. 拉取远程仓库

    git pull "remote_name" "branch_name"

5. 删除远程分支

    git push "remote_name" --delete "branch_name"

## 撤销操作

1. 撤销工作区修改

    git checkout -- "file"

2. 撤销暂存区修改

    git reset HEAD "file"

3. 回滚到指定提交

    git reset --hard "commit_hash"
