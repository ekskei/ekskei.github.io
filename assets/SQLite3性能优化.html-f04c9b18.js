import{_ as e,V as i,W as n,Z as s}from"./framework-4b3cc28c.js";const d={},t=s(`<h1 id="sqlite3性能优化" tabindex="-1"><a class="header-anchor" href="#sqlite3性能优化" aria-hidden="true">#</a> SQLite3性能优化</h1><h2 id="场景描述" tabindex="-1"><a class="header-anchor" href="#场景描述" aria-hidden="true">#</a> 场景描述</h2><p>有10000条数据需要插入数据库，原来未优化的代码为直接循环执行INSERT语句。</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void test0()
{
    sqlite3 *db = NULL;
    sqlite3_open(&quot;test0.db&quot;, &amp;db);
    auto begin = std::chrono::steady_clock::now();
    sqlite3_exec(db, &quot;CREATE TABLE Test(id INTEGER,msg TEXT);&quot;, 0, 0, 0);
    const int m = 10000;
    for (int i = 0; i &lt; m; i++)
    {
        sqlite3_exec(db, &quot;INSERT INTO Test(id,msg) VALUES(123,&#39;hello&#39;);&quot;, 0, 0, 0);
    }
    auto end = std::chrono::steady_clock::now();
    auto elapsed = std::chrono::duration_cast&lt;std::chrono::milliseconds&gt;(end - begin).count();
    printf(&quot;test0执行时间: %ld ms\\n&quot;, elapsed);
    sqlite3_close(db);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用事务" tabindex="-1"><a class="header-anchor" href="#使用事务" aria-hidden="true">#</a> 使用事务</h2><p>如果有许多数据需要插入数据库，逐条插入，导致频繁的提交以及磁盘 IO，使用事务机制，可以批量插入数据，可以极大的提升写入速度。</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void test1()
{
    sqlite3* db = NULL;
    sqlite3_open(&quot;test1.db&quot;, &amp;db);
    auto begin = std::chrono::steady_clock::now();
    sqlite3_exec(db, &quot;CREATE TABLE Test(id INTEGER,msg TEXT);&quot;, 0, 0, 0);
    sqlite3_exec(db, &quot;BEGIN;&quot;, 0, 0, 0);
    const int m = 10000;
    for (int i = 0; i &lt; m; i++)
    {
        sqlite3_exec(db, &quot;INSERT INTO Test(id,msg) VALUES(123,&#39;hello&#39;);&quot;, 0, 0, 0);
        if (i % 1000 == 999) {
            sqlite3_exec(db, &quot;COMMIT;&quot;, 0, 0, 0);
            sqlite3_exec(db, &quot;BEGIN;&quot;, 0, 0, 0);
        }
    }
    sqlite3_exec(db, &quot;COMMIT;&quot;, 0, 0, 0);

    auto end = std::chrono::steady_clock::now();
    auto elapsed = std::chrono::duration_cast&lt;std::chrono::milliseconds&gt;(end - begin).count();
    printf(&quot;test1执行时间: %ld ms\\n&quot;, elapsed);
    sqlite3_close(db);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用执行准备" tabindex="-1"><a class="header-anchor" href="#使用执行准备" aria-hidden="true">#</a> 使用执行准备</h2><p>执行准备相当于将 SQL 语句提前编译，省去每次执行 SQL 语句时候的语法检查等操作，可以极大优化 SQL 语句的执行效率。</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void test2()
{
    sqlite3* db = NULL;
    sqlite3_open(&quot;test2.db&quot;, &amp;db);
    sqlite3_exec(db, &quot;CREATE TABLE Test(id INTEGER,msg TEXT);&quot;, 0, 0, 0);
    sqlite3_stmt *stmt = NULL;
    const char *sql = &quot;INSERT INTO Test(id,msg) VALUES (?,?);&quot;;
    auto begin = std::chrono::steady_clock::now();
    sqlite3_prepare_v2(db, sql, strlen(sql), &amp;stmt, 0);
    sqlite3_exec(db, &quot;BEGIN;&quot;, 0, 0, 0);
    const int m = 10000;
    for (int i = 0; i &lt; m; i++) {
        sqlite3_reset(stmt);
        sqlite3_bind_int(stmt, 1, 123);
        const char* str = &quot;hello&quot;;
        sqlite3_bind_text(stmt, 2, str, strlen(str), 0);
        sqlite3_step(stmt);
        if (i % 1000 == 999) {
            sqlite3_exec(db, &quot;COMMIT;&quot;, 0, 0, 0);
            sqlite3_exec(db, &quot;BEGIN;&quot;, 0, 0, 0);
        }
    }
    sqlite3_exec(db, &quot;COMMIT;&quot;, 0, 0, 0);
    sqlite3_finalize(stmt);
    auto end = std::chrono::steady_clock::now();
    auto elapsed = std::chrono::duration_cast&lt;std::chrono::milliseconds&gt;(end - begin).count();
	printf(&quot;test2执行时间: %ld ms\\n&quot;, elapsed);
    sqlite3_close(db);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用内存模式" tabindex="-1"><a class="header-anchor" href="#使用内存模式" aria-hidden="true">#</a> 使用内存模式</h2><p>内存模式是将数据库直接创建到内存中，使用方法为 sqlite3_open 打开 &quot;:memory:&quot; ，内存模式相比普通模式，可以节省写文件时间。可以先将数据库创建到内存中，数据写入完整之后，再执行 VACUUM INTO语句将其写入到磁盘。使用内存模式写数据速度很快，但是一般用不到，毕竟我们一般用数据库就是为了数据的持久保存和读取。</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void test3()
{
    sqlite3* db = NULL;
    sqlite3_open(&quot;:memory:&quot;, &amp;db);
    sqlite3_exec(db, &quot;CREATE TABLE Test(id INTEGER,msg TEXT);&quot;, 0, 0, 0);
    sqlite3_stmt *stmt = NULL;
    const char *sql = &quot;INSERT INTO Test(id,msg) VALUES (?,?);&quot;;
    auto begin = std::chrono::steady_clock::now();
    sqlite3_prepare_v2(db, sql, strlen(sql), &amp;stmt, 0);
    sqlite3_exec(db, &quot;BEGIN;&quot;, 0, 0, 0);
    const int m = 10100;
    for (int i = 0; i &lt; m; i++) {
        sqlite3_reset(stmt);
        sqlite3_bind_int(stmt, 1, 123);
        const char* str = &quot;hello&quot;;
        sqlite3_bind_text(stmt, 2, str, strlen(str), 0);
        sqlite3_step(stmt);
        if (i % 1000 == 999) {
            sqlite3_exec(db, &quot;COMMIT;&quot;, 0, 0, 0);
            sqlite3_exec(db, &quot;BEGIN;&quot;, 0, 0, 0);
        }
    }
    sqlite3_exec(db, &quot;COMMIT;&quot;, 0, 0, 0);
    sqlite3_finalize(stmt);
    sqlite3_exec(db, &quot;VACUUM INTO &#39;test3.db&#39;;&quot;, 0, 0, 0);
    auto end = std::chrono::steady_clock::now();
    auto elapsed = std::chrono::duration_cast&lt;std::chrono::milliseconds&gt;(end - begin).count();
	printf(&quot;test3执行时间: %ld ms\\n&quot;, elapsed);
    sqlite3_close(db);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改写同步模式" tabindex="-1"><a class="header-anchor" href="#修改写同步模式" aria-hidden="true">#</a> 修改写同步模式</h2><p>在 sqlite3 中 synchronous 有三种模式，分别是 FULL、NORMAL 和 OFF。默认synchronous值为FULL，在FULL模式下，保证数据不会损坏，安全性最高，但是写入速度也最慢。OFF 模式会比 FULL 模式快很多，但是数据损坏的可能性较大，不建议设为OFF。如果要加快写入速度，可以设置为NORMAL，速度比FULL快，并且几乎不会损坏数据（不是100%不会损坏）。 synchronous设置为NORMAL的方法为，在sqlite3_open语句后面加一行代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>sqlite3_exec(db, &quot;PRAGMA synchronous=NORMAL;&quot;, 0, 0, 0);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="测试结果" tabindex="-1"><a class="header-anchor" href="#测试结果" aria-hidden="true">#</a> 测试结果</h2><p>我在自己电脑上测试了以上各种情况，打印程序执行所用的时间(ms)，数据如下表：</p><table><thead><tr><th>synchronous</th><th>FULL(默认)</th><th>NORMAL</th></tr></thead><tbody><tr><td>不优化</td><td>1447405</td><td>977747</td></tr><tr><td>使用事务</td><td>1580</td><td>1168</td></tr><tr><td>使用事务+执行准备</td><td>1436</td><td>1004</td></tr><tr><td>使用事务+执行准备+内存模式</td><td>15</td><td>9</td></tr></tbody></table>`,19),l=[t];function a(r,c){return i(),n("div",null,l)}const v=e(d,[["render",a],["__file","SQLite3性能优化.html.vue"]]);export{v as default};
