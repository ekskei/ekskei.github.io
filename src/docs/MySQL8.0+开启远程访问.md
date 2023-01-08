---
icon: edit
date: 2023-01-07
category:
  - 数据库
tag:
  - MySQL
star: true
sticky: true
---

# MySQL 8.0+ 开启远程访问

MySQL 服务器默认绑定的地址是 127.0.0.1，只能通过 localhost 访问。如果想进行远程访问，需要进行一些简单的设置。

网上搜到的很多资料都是基于老版本的，已经过时。 MySQL 官方文档写得过于详细（复杂）。所以特意写一篇文章记录一下配置过程。

## 添加root密码
这一步不是必须的，可跳过。在 Windows 上安装 MySQL 过程中是可以在安装界面设置 root 密码的，但是在 Ubuntu 上用 apt 安装的 MySQL 是默认没有密码的，不安全，所以先添加密码。
首先通过以下命令登录MySQL：
```shell
mysql -u root -p
```
然后输入以下两条命令添加密码：
```SQL
use mysql;
alter user 'root'@'localhost' identified with mysql_native_password by 'password';
```
注意：引号内的 password 需改为自己的密码。
## 更改服务器绑定地址
更改配置文件 /etc/mysql/mysql.conf.d/mysqld.cnf

PS： Windows 下的配置文件为 C:\ProgramData\MySQL\MySQL Server 8.0\my.ini

将 [mysqld] 节点下的 bind-address 由原来的 127.0.0.1 改为 0.0.0.0

然后重启 MySQL 服务，命令为：
```shell
sudo systemctl restart mysql.service
```
或者
```shell
sudo service mysql restart
```

## 添加远程访问用户
首先登录 MySQL，然后依次输入以下命令：
```SQL
use mysql;
create user 'username'@'host' identified by 'password'; 
```
注意：引号内的值，需要根据实际需求进行设置。其中 username 为用户名； host 为登录域名，为 localhost 时表示本机，为 % 时表示任意 IP ，也可以像 192.168.1.% 这样，表示允许 192.168.1 这个段的所有 IP ； password 为密码。

然后输入以下命令，确认是否添加成功：
```SQL
select User,Host from user;
```

## 为远程访问用户授权
还是在上面的 MySQL 命令窗口中
```SQL
grant all privileges on *.* to 'username'@'host' with grant option; 
```
其中*.*第一个*表示所有数据库，第二个*表示所有数据表，如果不想授权全部那就把对应的*写成相应数据库或者数据表； username 为指定的用户； host 为该用户登录的域名

授权操作完后刷新权限：
```SQL
flush privileges;
```
这一步完成之后，就可以进行远程访问了。

## 附：收回权限和删除用户
```SQL
#收回权限（不包含赋权权限）
REVOKE ALL PRIVILEGES ON *.* FROM username;
REVOKE ALL PRIVILEGES ON username.* FROM username;

#收回赋权权限
REVOKE GRANT OPTION ON *.* FROM username;

#操作完后刷新权限
flush privileges;

#删除用户
drop user 'username'@'host';
```