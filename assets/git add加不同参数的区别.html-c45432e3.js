const e=JSON.parse('{"key":"v-2cfcd410","path":"/docs/Git%E7%AC%94%E8%AE%B0/git%20add%E5%8A%A0%E4%B8%8D%E5%90%8C%E5%8F%82%E6%95%B0%E7%9A%84%E5%8C%BA%E5%88%AB.html","title":"git add加不同参数的区别","lang":"zh-CN","frontmatter":{"title":"git add加不同参数的区别","icon":"edit","author":{"name":"ekskei,","url":"https://github.com/ekskei"},"date":"2022-12-06T00:00:00.000Z","category":["git"],"tag":["git"],"description":"git add加不同参数的区别 git add 可将该文件添加到暂存区。常用的加不同参数的命令有以下几个： # -A 相当于all，将当前整个工作区中所有的文件改动提交至暂存区 # 包括整个工作区中的新增、修改和被删除的文件，不受当前所在目录限制 git add -A # 将当前工作区中当前目录（包括子目录）下的所有的文件改动提交至暂存区 # 包括新增、修改和被删除的文件，不包括当前所在目录之外的文件 # 2.x 版本相比 1.x 版本，对 git add . 的功能做了改动 # 2.x 会提交被删除的文件，而 1.x 不包括被删除的文件 # 2.x 中如果想在使用 git add . 时不提交被删除的文件，可加上--ignore-removal git add . # 将当前整个工作区中被修改和被删除的文件提交至暂存区 # 包括整个工作区中修改和被删除的文件，不受当前所在目录限制 # 而新文件因为未被跟踪（untracked），所以不会被提交至暂存区 git add -u # 将当前工作区中当前目录（包括子目录）下的所有的文件改动提交至暂存区 # 包括新增、修改和被删除的文件，但不包括文件名以 . 符号开头的文件的改动 # 不包括当前所在目录之外的文件 git add *","head":[["meta",{"property":"og:url","content":"https://codevk.com/docs/Git%E7%AC%94%E8%AE%B0/git%20add%E5%8A%A0%E4%B8%8D%E5%90%8C%E5%8F%82%E6%95%B0%E7%9A%84%E5%8C%BA%E5%88%AB.html"}],["meta",{"property":"og:site_name","content":"CODEVK"}],["meta",{"property":"og:title","content":"git add加不同参数的区别"}],["meta",{"property":"og:description","content":"git add加不同参数的区别 git add 可将该文件添加到暂存区。常用的加不同参数的命令有以下几个： # -A 相当于all，将当前整个工作区中所有的文件改动提交至暂存区 # 包括整个工作区中的新增、修改和被删除的文件，不受当前所在目录限制 git add -A # 将当前工作区中当前目录（包括子目录）下的所有的文件改动提交至暂存区 # 包括新增、修改和被删除的文件，不包括当前所在目录之外的文件 # 2.x 版本相比 1.x 版本，对 git add . 的功能做了改动 # 2.x 会提交被删除的文件，而 1.x 不包括被删除的文件 # 2.x 中如果想在使用 git add . 时不提交被删除的文件，可加上--ignore-removal git add . # 将当前整个工作区中被修改和被删除的文件提交至暂存区 # 包括整个工作区中修改和被删除的文件，不受当前所在目录限制 # 而新文件因为未被跟踪（untracked），所以不会被提交至暂存区 git add -u # 将当前工作区中当前目录（包括子目录）下的所有的文件改动提交至暂存区 # 包括新增、修改和被删除的文件，但不包括文件名以 . 符号开头的文件的改动 # 不包括当前所在目录之外的文件 git add *"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-08T13:59:13.000Z"}],["meta",{"property":"article:author","content":"ekskei,"}],["meta",{"property":"article:tag","content":"git"}],["meta",{"property":"article:published_time","content":"2022-12-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-08T13:59:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git add加不同参数的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-12-06T00:00:00.000Z\\",\\"dateModified\\":\\"2023-01-08T13:59:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ekskei,\\",\\"url\\":\\"https://github.com/ekskei\\"}]}"]]},"headers":[],"git":{"createdTime":1673186353000,"updatedTime":1673186353000,"contributors":[{"name":"ekskei","email":"837866535@qq.com","commits":1}]},"readingTime":{"minutes":1.56,"words":468},"filePathRelative":"docs/Git笔记/git add加不同参数的区别.md","localizedDate":"2022年12月6日","excerpt":"<h1> git add加不同参数的区别</h1>\\n<p>git add 可将该文件添加到暂存区。常用的加不同参数的命令有以下几个：</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token comment\\"># -A 相当于all，将当前整个工作区中所有的文件改动提交至暂存区</span>\\n<span class=\\"token comment\\"># 包括整个工作区中的新增、修改和被删除的文件，不受当前所在目录限制</span>\\n<span class=\\"token function\\">git</span> <span class=\\"token function\\">add</span> <span class=\\"token parameter variable\\">-A</span>\\n\\n<span class=\\"token comment\\"># 将当前工作区中当前目录（包括子目录）下的所有的文件改动提交至暂存区</span>\\n<span class=\\"token comment\\"># 包括新增、修改和被删除的文件，不包括当前所在目录之外的文件</span>\\n<span class=\\"token comment\\"># 2.x 版本相比 1.x 版本，对 git add . 的功能做了改动</span>\\n<span class=\\"token comment\\"># 2.x 会提交被删除的文件，而 1.x 不包括被删除的文件</span>\\n<span class=\\"token comment\\"># 2.x 中如果想在使用 git add . 时不提交被删除的文件，可加上--ignore-removal</span>\\n<span class=\\"token function\\">git</span> <span class=\\"token function\\">add</span> <span class=\\"token builtin class-name\\">.</span>\\n\\n<span class=\\"token comment\\"># 将当前整个工作区中被修改和被删除的文件提交至暂存区</span>\\n<span class=\\"token comment\\"># 包括整个工作区中修改和被删除的文件，不受当前所在目录限制</span>\\n<span class=\\"token comment\\"># 而新文件因为未被跟踪（untracked），所以不会被提交至暂存区</span>\\n<span class=\\"token function\\">git</span> <span class=\\"token function\\">add</span> <span class=\\"token parameter variable\\">-u</span>\\n\\n<span class=\\"token comment\\"># 将当前工作区中当前目录（包括子目录）下的所有的文件改动提交至暂存区</span>\\n<span class=\\"token comment\\"># 包括新增、修改和被删除的文件，但不包括文件名以 . 符号开头的文件的改动</span>\\n<span class=\\"token comment\\"># 不包括当前所在目录之外的文件</span>\\n<span class=\\"token function\\">git</span> <span class=\\"token function\\">add</span> *\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
