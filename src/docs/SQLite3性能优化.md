---
icon: edit
date: 2022-11-30
category:
  - 数据库
tag:
  - SQLite
---

# SQLite3性能优化

## 场景描述

有10000条数据需要插入数据库，原来未优化的代码为直接循环执行INSERT语句。

```C++
void test0()
{
    sqlite3 *db = NULL;
    sqlite3_open("test0.db", &db);
    auto begin = std::chrono::steady_clock::now();
    sqlite3_exec(db, "CREATE TABLE Test(id INTEGER,msg TEXT);", 0, 0, 0);
    const int m = 10000;
    for (int i = 0; i < m; i++)
    {
        sqlite3_exec(db, "INSERT INTO Test(id,msg) VALUES(123,'hello');", 0, 0, 0);
    }
    auto end = std::chrono::steady_clock::now();
    auto elapsed = std::chrono::duration_cast<std::chrono::milliseconds>(end - begin).count();
    printf("test0执行时间: %ld ms\n", elapsed);
    sqlite3_close(db);
}
```

## 使用事务

如果有许多数据需要插入数据库，逐条插入，导致频繁的提交以及磁盘 IO，使用事务机制，可以批量插入数据，可以极大的提升写入速度。

```C++
void test1()
{
    sqlite3* db = NULL;
    sqlite3_open("test1.db", &db);
    auto begin = std::chrono::steady_clock::now();
    sqlite3_exec(db, "CREATE TABLE Test(id INTEGER,msg TEXT);", 0, 0, 0);
    sqlite3_exec(db, "BEGIN;", 0, 0, 0);
    const int m = 10000;
    for (int i = 0; i < m; i++)
    {
        sqlite3_exec(db, "INSERT INTO Test(id,msg) VALUES(123,'hello');", 0, 0, 0);
        if (i % 1000 == 999) {
            sqlite3_exec(db, "COMMIT;", 0, 0, 0);
            sqlite3_exec(db, "BEGIN;", 0, 0, 0);
        }
    }
    sqlite3_exec(db, "COMMIT;", 0, 0, 0);

    auto end = std::chrono::steady_clock::now();
    auto elapsed = std::chrono::duration_cast<std::chrono::milliseconds>(end - begin).count();
	printf("test1执行时间: %ld ms\n", elapsed);
    sqlite3_close(db);
}
```

## 使用执行准备

执行准备相当于将 SQL 语句提前编译，省去每次执行 SQL 语句时候的语法检查等操作，可以极大优化 SQL 语句的执行效率。

```C++
void test2()
{
    sqlite3* db = NULL;
    sqlite3_open("test2.db", &db);
    sqlite3_exec(db, "CREATE TABLE Test(id INTEGER,msg TEXT);", 0, 0, 0);
    sqlite3_stmt *stmt = NULL;
    const char *sql = "INSERT INTO Test(id,msg) VALUES (?,?);";
    auto begin = std::chrono::steady_clock::now();
    sqlite3_prepare_v2(db, sql, strlen(sql), &stmt, 0);
    sqlite3_exec(db, "BEGIN;", 0, 0, 0);
    const int m = 10000;
    for (int i = 0; i < m; i++) {
        sqlite3_reset(stmt);
        sqlite3_bind_int(stmt, 1, 123);
        const char* str = "hello";
        sqlite3_bind_text(stmt, 2, str, strlen(str), 0);
        sqlite3_step(stmt);
        if (i % 1000 == 999) {
            sqlite3_exec(db, "COMMIT;", 0, 0, 0);
            sqlite3_exec(db, "BEGIN;", 0, 0, 0);
        }
    }
    sqlite3_exec(db, "COMMIT;", 0, 0, 0);
    sqlite3_finalize(stmt);
    auto end = std::chrono::steady_clock::now();
    auto elapsed = std::chrono::duration_cast<std::chrono::milliseconds>(end - begin).count();
	printf("test2执行时间: %ld ms\n", elapsed);
    sqlite3_close(db);
}
```

## 使用内存模式

内存模式是将数据库直接创建到内存中，使用方法为 sqlite3_open 打开 ":memory:" ，内存模式相比普通模式，可以节省写文件时间。可以先将数据库创建到内存中，数据写入完整之后，再执行 VACUUM INTO语句将其写入到磁盘。使用内存模式写数据速度很快，但是一般用不到，毕竟我们一般用数据库就是为了数据的持久保存和读取。

```C++
void test3()
{
    sqlite3* db = NULL;
    sqlite3_open(":memory:", &db);
    sqlite3_exec(db, "CREATE TABLE Test(id INTEGER,msg TEXT);", 0, 0, 0);
    sqlite3_stmt *stmt = NULL;
    const char *sql = "INSERT INTO Test(id,msg) VALUES (?,?);";
    auto begin = std::chrono::steady_clock::now();
    sqlite3_prepare_v2(db, sql, strlen(sql), &stmt, 0);
    sqlite3_exec(db, "BEGIN;", 0, 0, 0);
    const int m = 10100;
    for (int i = 0; i < m; i++) {
        sqlite3_reset(stmt);
        sqlite3_bind_int(stmt, 1, 123);
        const char* str = "hello";
        sqlite3_bind_text(stmt, 2, str, strlen(str), 0);
        sqlite3_step(stmt);
        if (i % 1000 == 999) {
            sqlite3_exec(db, "COMMIT;", 0, 0, 0);
            sqlite3_exec(db, "BEGIN;", 0, 0, 0);
        }
    }
    sqlite3_exec(db, "COMMIT;", 0, 0, 0);
    sqlite3_finalize(stmt);
    sqlite3_exec(db, "VACUUM INTO 'test3.db';", 0, 0, 0);
    auto end = std::chrono::steady_clock::now();
    auto elapsed = std::chrono::duration_cast<std::chrono::milliseconds>(end - begin).count();
	printf("test3执行时间: %ld ms\n", elapsed);
    sqlite3_close(db);
}
```

## 修改写同步模式

在 sqlite3 中 synchronous 有三种模式，分别是 FULL、NORMAL 和 OFF。默认synchronous值为FULL，在FULL模式下，保证数据不会损坏，安全性最高，但是写入速度也最慢。OFF 模式会比 FULL 模式快很多，但是数据损坏的可能性较大，不建议设为OFF。如果要加快写入速度，可以设置为NORMAL，速度比FULL快，并且几乎不会损坏数据（不是100%不会损坏）。
synchronous设置为NORMAL的方法为，在sqlite3_open语句后面加一行代码：

```C++
sqlite3_exec(db, "PRAGMA synchronous=NORMAL;", 0, 0, 0);
```

## 测试结果

我在自己电脑上测试了以上各种情况，打印程序执行所用的时间(ms)，数据如下表：

| synchronous                | FULL(默认) | NORMAL |
| -------------------------- | ---------- | ------ |
| 不优化                     | 1447405    | 977747 |
| 使用事务                   | 1580       | 1168   |
| 使用事务+执行准备          | 1436       | 1004   |
| 使用事务+执行准备+内存模式 | 15         | 9      |
