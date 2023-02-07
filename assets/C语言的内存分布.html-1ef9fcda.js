const e=JSON.parse('{"key":"v-3ed7fd8a","path":"/docs/cpp%E7%AC%94%E8%AE%B0/C%E8%AF%AD%E8%A8%80%E7%9A%84%E5%86%85%E5%AD%98%E5%88%86%E5%B8%83.html","title":"C语言的内存分布","lang":"zh-CN","frontmatter":{"title":"C语言的内存分布","icon":"edit","author":{"name":"ekskei","url":"https://github.com/ekskei"},"date":"2018-08-25T00:00:00.000Z","category":["C/C++"],"tag":["内存"],"description":"C 程序的内存分布 C 程序的典型内存由文本段、数据段、堆和栈4部分组成： 1. 文本段（Text Segment、代码段、代码区） 文本段，也称为代码段或简称为文本，是目标文件或内存中程序的一部分，其中包含可执行指令。文本段放在堆或栈的下面，以防止堆和栈溢出覆盖它。 文本段通常是可共享的，因此对于频繁执行的程序，内存中只需要一个副本。此外，文本段通常是只读的，以防止程序意外修改其指令。 2. 数据段（Data Segment、全局/静态数据段、全局/静态存储区） 分为两部分：","head":[["meta",{"property":"og:url","content":"https://codevk.com/docs/cpp%E7%AC%94%E8%AE%B0/C%E8%AF%AD%E8%A8%80%E7%9A%84%E5%86%85%E5%AD%98%E5%88%86%E5%B8%83.html"}],["meta",{"property":"og:site_name","content":"CODEVK"}],["meta",{"property":"og:title","content":"C语言的内存分布"}],["meta",{"property":"og:description","content":"C 程序的内存分布 C 程序的典型内存由文本段、数据段、堆和栈4部分组成： 1. 文本段（Text Segment、代码段、代码区） 文本段，也称为代码段或简称为文本，是目标文件或内存中程序的一部分，其中包含可执行指令。文本段放在堆或栈的下面，以防止堆和栈溢出覆盖它。 文本段通常是可共享的，因此对于频繁执行的程序，内存中只需要一个副本。此外，文本段通常是只读的，以防止程序意外修改其指令。 2. 数据段（Data Segment、全局/静态数据段、全局/静态存储区） 分为两部分："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-07T14:20:25.000Z"}],["meta",{"property":"article:author","content":"ekskei"}],["meta",{"property":"article:tag","content":"内存"}],["meta",{"property":"article:published_time","content":"2018-08-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-07T14:20:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"C语言的内存分布\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-08-25T00:00:00.000Z\\",\\"dateModified\\":\\"2023-02-07T14:20:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ekskei\\",\\"url\\":\\"https://github.com/ekskei\\"}]}"]]},"headers":[{"level":2,"title":"1. 文本段（Text Segment、代码段、代码区）","slug":"_1-文本段-text-segment、代码段、代码区","link":"#_1-文本段-text-segment、代码段、代码区","children":[]},{"level":2,"title":"2. 数据段（Data Segment、全局/静态数据段、全局/静态存储区）","slug":"_2-数据段-data-segment、全局-静态数据段、全局-静态存储区","link":"#_2-数据段-data-segment、全局-静态数据段、全局-静态存储区","children":[{"level":3,"title":"2.1 已初始化数据段（Initialized Data Segment）","slug":"_2-1-已初始化数据段-initialized-data-segment","link":"#_2-1-已初始化数据段-initialized-data-segment","children":[]},{"level":3,"title":"2.2 未初始化的数据段（Uninitialized Data Segment、BSS）","slug":"_2-2-未初始化的数据段-uninitialized-data-segment、bss","link":"#_2-2-未初始化的数据段-uninitialized-data-segment、bss","children":[]}]},{"level":2,"title":"3. 堆（Heap）","slug":"_3-堆-heap","link":"#_3-堆-heap","children":[]},{"level":2,"title":"4. 栈（Stack）","slug":"_4-栈-stack","link":"#_4-栈-stack","children":[]},{"level":2,"title":"关于 C++ 程序的自由存储区（free store）","slug":"关于-c-程序的自由存储区-free-store","link":"#关于-c-程序的自由存储区-free-store","children":[]}],"git":{"createdTime":1675779625000,"updatedTime":1675779625000,"contributors":[{"name":"ekskei","email":"837866535@qq.com","commits":1}]},"readingTime":{"minutes":3.78,"words":1133},"filePathRelative":"docs/cpp笔记/C语言的内存分布.md","localizedDate":"2018年8月25日","excerpt":"<h1> C 程序的内存分布</h1>\\n<p>C 程序的典型内存由文本段、数据段、堆和栈4部分组成：</p>\\n<h2> 1. 文本段（Text Segment、代码段、代码区）</h2>\\n<p>文本段，也称为代码段或简称为文本，是目标文件或内存中程序的一部分，其中包含可执行指令。文本段放在堆或栈的下面，以防止堆和栈溢出覆盖它。</p>\\n<p>文本段通常是可共享的，因此对于频繁执行的程序，内存中只需要一个副本。此外，文本段通常是只读的，以防止程序意外修改其指令。</p>\\n<h2> 2. 数据段（Data Segment、全局/静态数据段、全局/静态存储区）</h2>\\n<p>分为两部分：</p>\\n","autoDesc":true}');export{e as data};
