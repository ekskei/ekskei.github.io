import{_ as p,W as o,X as r,Y as t,Z as e,a0 as n,$ as a,C as h}from"./framework-b32ce0b5.js";const l={},d=a('<h1 id="git基本操作" tabindex="-1"><a class="header-anchor" href="#git基本操作" aria-hidden="true">#</a> git基本操作</h1><p>git是一个分布式版本控制系统，用于管理软件项目的源代码。以下内容为git的基本操作。</p><h2 id="安装git" tabindex="-1"><a class="header-anchor" href="#安装git" aria-hidden="true">#</a> 安装git</h2><h3 id="在windows上安装git" tabindex="-1"><a class="header-anchor" href="#在windows上安装git" aria-hidden="true">#</a> 在Windows上安装git</h3><p>访问git官网下载安装程序，然后按照提示进行安装。</p><h3 id="在mac上安装git" tabindex="-1"><a class="header-anchor" href="#在mac上安装git" aria-hidden="true">#</a> 在Mac上安装git</h3><p>使用Homebrew进行安装：</p><p>brew install git</p><h3 id="在linux上安装git" tabindex="-1"><a class="header-anchor" href="#在linux上安装git" aria-hidden="true">#</a> 在Linux上安装git</h3><p>使用包管理器进行安装，例如在Ubuntu上：</p><p>sudo apt-get install git</p><h2 id="配置git" tabindex="-1"><a class="header-anchor" href="#配置git" aria-hidden="true">#</a> 配置git</h2><p>配置用户名和邮箱（提交代码时需要）：</p>',13),u={href:"http://user.name",target:"_blank",rel:"noopener noreferrer"},c=a('<p>git config --global user.email &quot;<a href="mailto:your.email@example.com">your.email@example.com</a>&quot;</p><p>查看配置信息：</p><p>git config --list</p><h2 id="创建仓库" tabindex="-1"><a class="header-anchor" href="#创建仓库" aria-hidden="true">#</a> 创建仓库</h2><h3 id="初始化仓库" tabindex="-1"><a class="header-anchor" href="#初始化仓库" aria-hidden="true">#</a> 初始化仓库</h3><p>在项目根目录执行以下命令：</p><p>git init</p><p>这将创建一个名为.git的隐藏目录，用于存储仓库数据。</p><h3 id="克隆仓库" tabindex="-1"><a class="header-anchor" href="#克隆仓库" aria-hidden="true">#</a> 克隆仓库</h3><p>从远程仓库克隆一个项目：</p><p>git clone &quot;repository_url&quot;</p><h2 id="操作文件" tabindex="-1"><a class="header-anchor" href="#操作文件" aria-hidden="true">#</a> 操作文件</h2><ol><li><p>查看文件状态</p><p>git status</p></li><li><p>跟踪文件</p><p>将文件添加到暂存区：</p><p>git add &quot;file&quot;</p><p>将所有文件添加到暂存区：</p><p>git add .</p></li><li><p>提交更改</p><p>将暂存区的更改提交到仓库：</p><p>git commit -m &quot;Commit message&quot;</p></li><li><p>查看提交历史</p><p>git log</p><p>查看简洁的提交历史：</p><p>git log --oneline</p></li></ol><h2 id="分支管理" tabindex="-1"><a class="header-anchor" href="#分支管理" aria-hidden="true">#</a> 分支管理</h2><ol><li><p>查看分支</p><p>git branch</p></li><li><p>创建分支</p><p>git branch &quot;new_branch_name&quot;</p></li><li><p>切换分支</p><p>git checkout &quot;branch_name&quot;</p></li><li><p>创建并切换分支</p><p>git checkout -b &quot;new_branch_name&quot;</p></li><li><p>合并分支</p><p>将指定分支合并到当前分支：</p><p>git merge &quot;branch_name&quot;</p></li><li><p>删除分支</p><p>git branch -d &quot;branch_name&quot;</p></li></ol><h2 id="远程仓库操作" tabindex="-1"><a class="header-anchor" href="#远程仓库操作" aria-hidden="true">#</a> 远程仓库操作</h2><ol><li><p>添加远程仓库</p><p>git remote add &quot;remote_name&quot; &quot;repository_url&quot;</p></li><li><p>查看远程仓库</p><p>git remote -v</p></li><li><p>推送到远程仓库</p><p>git push &quot;remote_name&quot; &quot;branch_name&quot;</p></li><li><p>拉取远程仓库</p><p>git pull &quot;remote_name&quot; &quot;branch_name&quot;</p></li><li><p>删除远程分支</p><p>git push &quot;remote_name&quot; --delete &quot;branch_name&quot;</p></li></ol><h2 id="撤销操作" tabindex="-1"><a class="header-anchor" href="#撤销操作" aria-hidden="true">#</a> 撤销操作</h2><ol><li><p>撤销工作区修改</p><p>git checkout -- &quot;file&quot;</p></li><li><p>撤销暂存区修改</p><p>git reset HEAD &quot;file&quot;</p></li><li><p>回滚到指定提交</p><p>git reset --hard &quot;commit_hash&quot;</p></li></ol>',19);function s(g,m){const i=h("ExternalLinkIcon");return o(),r("div",null,[d,t("p",null,[e("git config --global "),t("a",u,[e("user.name"),n(i)]),e(' "Your Name"')]),c])}const q=p(l,[["render",s],["__file","git基本操作.html.vue"]]);export{q as default};
