const e=JSON.parse(`{"key":"v-6c09952d","path":"/docs/SQLite3%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.html","title":"SQLite3性能优化","lang":"zh-CN","frontmatter":{"icon":"edit","date":"2022-11-30T00:00:00.000Z","category":["数据库"],"tag":["SQLite"],"sticky":false,"star":true,"description":"SQLite3性能优化 场景描述 有10000条数据需要插入数据库，原来未优化的代码为直接循环执行INSERT语句。 void test0() { &nbsp; &nbsp; sqlite3 *db = NULL; &nbsp; &nbsp; sqlite3_open(\\"test0.db\\", &amp;db); &nbsp; &nbsp; auto begin = std::chrono::steady_clock::now(); &nbsp; &nbsp; sqlite3_exec(db, \\"CREATE TABLE Test(id INTEGER,msg TEXT);\\", 0, 0, 0); &nbsp; &nbsp; const int m = 10000; &nbsp; &nbsp; for (int i = 0; i &lt; m; i++) &nbsp; &nbsp; { &nbsp; &nbsp; &nbsp; &nbsp; sqlite3_exec(db, \\"INSERT INTO Test(id,msg) VALUES(123,'hello');\\", 0, 0, 0); &nbsp; &nbsp; } &nbsp; &nbsp; auto end = std::chrono::steady_clock::now(); &nbsp; &nbsp; auto elapsed = std::chrono::duration_cast&lt;std::chrono::milliseconds&gt;(end - begin).count(); &nbsp; &nbsp; printf(\\"test0执行时间: %ld ms\\\\n\\", elapsed); &nbsp; &nbsp; sqlite3_close(db); }","head":[["meta",{"property":"og:url","content":"https://codevk.com/docs/SQLite3%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.html"}],["meta",{"property":"og:site_name","content":"CODEVK"}],["meta",{"property":"og:title","content":"SQLite3性能优化"}],["meta",{"property":"og:description","content":"SQLite3性能优化 场景描述 有10000条数据需要插入数据库，原来未优化的代码为直接循环执行INSERT语句。 void test0() { &nbsp; &nbsp; sqlite3 *db = NULL; &nbsp; &nbsp; sqlite3_open(\\"test0.db\\", &amp;db); &nbsp; &nbsp; auto begin = std::chrono::steady_clock::now(); &nbsp; &nbsp; sqlite3_exec(db, \\"CREATE TABLE Test(id INTEGER,msg TEXT);\\", 0, 0, 0); &nbsp; &nbsp; const int m = 10000; &nbsp; &nbsp; for (int i = 0; i &lt; m; i++) &nbsp; &nbsp; { &nbsp; &nbsp; &nbsp; &nbsp; sqlite3_exec(db, \\"INSERT INTO Test(id,msg) VALUES(123,'hello');\\", 0, 0, 0); &nbsp; &nbsp; } &nbsp; &nbsp; auto end = std::chrono::steady_clock::now(); &nbsp; &nbsp; auto elapsed = std::chrono::duration_cast&lt;std::chrono::milliseconds&gt;(end - begin).count(); &nbsp; &nbsp; printf(\\"test0执行时间: %ld ms\\\\n\\", elapsed); &nbsp; &nbsp; sqlite3_close(db); }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-08T13:59:13.000Z"}],["meta",{"property":"article:tag","content":"SQLite"}],["meta",{"property":"article:published_time","content":"2022-11-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-08T13:59:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SQLite3性能优化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-30T00:00:00.000Z\\",\\"dateModified\\":\\"2023-01-08T13:59:13.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"场景描述","slug":"场景描述","link":"#场景描述","children":[]},{"level":2,"title":"使用事务","slug":"使用事务","link":"#使用事务","children":[]},{"level":2,"title":"使用执行准备","slug":"使用执行准备","link":"#使用执行准备","children":[]},{"level":2,"title":"使用内存模式","slug":"使用内存模式","link":"#使用内存模式","children":[]},{"level":2,"title":"修改写同步模式","slug":"修改写同步模式","link":"#修改写同步模式","children":[]},{"level":2,"title":"测试结果","slug":"测试结果","link":"#测试结果","children":[]}],"git":{"createdTime":1670150377000,"updatedTime":1673186353000,"contributors":[{"name":"ekskei","email":"837866535@qq.com","commits":3}]},"readingTime":{"minutes":3.39,"words":1018},"filePathRelative":"docs/SQLite3性能优化.md","localizedDate":"2022年11月30日","excerpt":"<h1> SQLite3性能优化</h1>\\n<h2> 场景描述</h2>\\n<p>有10000条数据需要插入数据库，原来未优化的代码为直接循环执行INSERT语句。</p>\\n<div class=\\"language-C++ line-numbers-mode\\" data-ext=\\"C++\\"><pre class=\\"language-C++\\"><code>void test0()\\n{\\n&nbsp; &nbsp; sqlite3 *db = NULL;\\n&nbsp; &nbsp; sqlite3_open(\\"test0.db\\", &amp;db);\\n&nbsp; &nbsp; auto begin = std::chrono::steady_clock::now();\\n&nbsp; &nbsp; sqlite3_exec(db, \\"CREATE TABLE Test(id INTEGER,msg TEXT);\\", 0, 0, 0);\\n&nbsp; &nbsp; const int m = 10000;\\n&nbsp; &nbsp; for (int i = 0; i &lt; m; i++)\\n&nbsp; &nbsp; {\\n&nbsp; &nbsp; &nbsp; &nbsp; sqlite3_exec(db, \\"INSERT INTO Test(id,msg) VALUES(123,'hello');\\", 0, 0, 0);\\n&nbsp; &nbsp; }\\n&nbsp; &nbsp; auto end = std::chrono::steady_clock::now();\\n&nbsp; &nbsp; auto elapsed = std::chrono::duration_cast&lt;std::chrono::milliseconds&gt;(end - begin).count();\\n&nbsp; &nbsp; printf(\\"test0执行时间: %ld ms\\\\n\\", elapsed);\\n&nbsp; &nbsp; sqlite3_close(db);\\n}\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{e as data};
