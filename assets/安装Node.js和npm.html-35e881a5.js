import{_ as t,V as r,W as d,X as e,Y as n,$ as s,F as l}from"./framework-f0a7c3f9.js";const a={},c=e("h1",{id:"在-windows-上安装-node-js-和-npm-的正确方法",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#在-windows-上安装-node-js-和-npm-的正确方法","aria-hidden":"true"},"#"),n(" 在 Windows 上安装 Node.js 和 npm 的正确方法")],-1),i=e("p",null,"npm 是 Node.js下的 JavaScript 包管理器，目前开发前端基本上离不开 npm。",-1),p=e("p",null,"其实安装过程是很简单的，但是我没想到 Node.js 官网上的安装包竟然也有坑。",-1),_={href:"https://nodejs.org/zh-cn/download/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,"官网上写的是Node.js 18.12.1 (包含 npm 8.19.2)，实际装完用 npm -v 查看发现是 6.4.1 版本，此 npm 版本太低，与Node.js 版本不匹配，无法使用，于是我就卸载了。",-1),v={href:"https://learn.microsoft.com/zh-cn/windows/dev-environment/javascript/nodejs-on-windows",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,[e("strong",null,"具体安装步骤如下：")],-1),j={href:"https://github.com/coreybutler/nvm-windows/releases",target:"_blank",rel:"noopener noreferrer"},w=e("p",null,"安装完 nvm 之后，在命令行执行 nvm list available",-1),f=e("p",null,"使用最新的 LTS 版本 18.12.1 安装（ LTS 比 CURRENT 版本更稳定），我用的安装命令是 nvm install 18.12.1",-1),N=e("p",null,"安装完后使用 nvm ls 可以看到刚安装的 Node.js 版本，通过输入 nvm use 18.12.1 来选择要使用的版本（如果安装多个版本，也可使用 nvm use 版本号 进行切换）",-1),g=e("p",null,"最后使用 node -v 查看 Node.js 版本，使用 npm -v 查看 npm 版本，确认安装成功",-1);function b(x,k){const o=l("ExternalLinkIcon");return r(),d("div",null,[c,i,p,e("p",null,[n("网上的文章一般是让大家从 Node.js 官网 "),e("a",_,[n("https://nodejs.org/zh-cn/download/"),s(o)])]),e("p",null,[n("下载安装包进行安装，但是我下载最新的 LTS 版本（长期维护版） "),e("a",m,[n("https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi"),s(o)]),n(" ，安装后发现npm版本有问题。")]),h,e("p",null,[n("然后我找到这篇文章 "),e("a",v,[n("https://learn.microsoft.com/zh-cn/windows/dev-environment/javascript/nodejs-on-windows"),s(o)]),n(" ，使用 nvm 来安装 Node.js ，安装完后用 npm -v 查看，版本为用 8.19.2 ，这样就完全没有问题了。nvm 还可以实现多个 Node.js 版本共存，切换方便，推荐使用。")]),u,e("p",null,[n("在 "),e("a",j,[n("https://github.com/coreybutler/nvm-windows/releases"),s(o)]),n(" 下载 nvm-setup.exe，并安装")]),w,f,N,g])}const T=t(a,[["render",b],["__file","安装Node.js和npm.html.vue"]]);export{T as default};
