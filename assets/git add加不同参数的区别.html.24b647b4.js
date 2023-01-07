import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as t,f as a}from"./app.bf3f43c3.js";const d={},e=a(`<h1 id="git-add加不同参数的区别" tabindex="-1"><a class="header-anchor" href="#git-add加不同参数的区别" aria-hidden="true">#</a> git add加不同参数的区别</h1><p>git add 可将该文件添加到暂存区。常用的加不同参数的命令有以下几个：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># -A 相当于all，将当前整个工作区中所有的文件改动提交至暂存区</span>
<span class="token comment"># 包括整个工作区中的新增、修改和被删除的文件，不受当前所在目录限制</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>

<span class="token comment"># 将当前工作区中当前目录（包括子目录）下的所有的文件改动提交至暂存区</span>
<span class="token comment"># 包括新增、修改和被删除的文件，不包括当前所在目录之外的文件</span>
<span class="token comment"># 2.x 版本相比 1.x 版本，对 git add . 的功能做了改动</span>
<span class="token comment"># 2.x 会提交被删除的文件，而 1.x 不包括被删除的文件</span>
<span class="token comment"># 2.x 中如果想在使用 git add . 时不提交被删除的文件，可加上--ignore-removal</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>

<span class="token comment"># 将当前整个工作区中被修改和被删除的文件提交至暂存区</span>
<span class="token comment"># 包括整个工作区中修改和被删除的文件，不受当前所在目录限制</span>
<span class="token comment"># 而新文件因为未被跟踪（untracked），所以不会被提交至暂存区</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-u</span>

<span class="token comment"># 将当前工作区中当前目录（包括子目录）下的所有的文件改动提交至暂存区</span>
<span class="token comment"># 包括新增、修改和被删除的文件，但不包括文件名以 . 符号开头的文件的改动</span>
<span class="token comment"># 不包括当前所在目录之外的文件</span>
<span class="token function">git</span> <span class="token function">add</span> *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结，对于 git 2.x 版本来说，各个命令的区别详见下表：</p><table><thead><tr><th>命 令</th><th>新 文 件</th><th>被修改的文件</th><th>被删除的文件</th><th>当前目录外的文件</th></tr></thead><tbody><tr><td>git add -A</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td>git add .</td><td>✅</td><td>✅</td><td>✅</td><td>❌</td></tr><tr><td>git add -u</td><td>❌</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td>git add *</td><td>❌</td><td>✅</td><td>✅</td><td>❌</td></tr></tbody></table>`,5),i=[e];function c(l,o){return s(),t("div",null,i)}const p=n(d,[["render",c],["__file","git add加不同参数的区别.html.vue"]]);export{p as default};
