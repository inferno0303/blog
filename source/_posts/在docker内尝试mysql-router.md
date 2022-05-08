---
title: 在docker内尝试mysql-router
date: 2020-09-06
tags: note
---

关键字：mysql、主从、mysql高可用、mysqlrouter

创建docker网络
```
docker network create my-net -d bridge
```


运行mysql_1
```
docker run -d --name mysql_1 -p 3307:3306 --network my-net -e MYSQL_ROOT_PASSWORD=12345678 -v $(pwd)/docker_volumns/mysql_1:/var/lib/mysql -v $(pwd)/my_master.cnf:/etc/mysql/my.cnf mysql:5.7.32
```

运行mysql_2
```
docker run -d --name mysql_2 -p 3307:3306 --network my-net -e MYSQL_ROOT_PASSWORD=12345678 -v $(pwd)/docker_volumns/mysql_2:/var/lib/mysql -v $(pwd)/my_slave.cnf:/etc/mysql/my.cnf mysql:5.7.32
```


配置mysql master（mysql_1）
```
docker exec -it mysql_1 bash
mysql -u root -p$MYSQL_ROOT_PASSWORD
CREATE user 'repl'@'%' IDENTIFIED WITH mysql_native_password BY '123';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';
flush privileges;
show master status;
```

配置mysql slave（mysql_2）
```
docker exec -it mysql_2 bash
mysql -u root -p$MYSQL_ROOT_PASSWORD
change master to master_host='mysql_1', master_user='repl', master_password='123', master_log_file='***', master_log_pos=***;
start slave;
show slave status;
```


运行mysql-router
```
docker run -dit --name mysqlrouter -p 33060:3306 --network my-net debian:latest
```

编辑好mysqlrouter.conf文件的内容，上游mysql-server为mysql_1和mysql_2
复制文件到mysql-router容器内
```
docker cp mysql-router-community_8.0.22-1debian10_amd64.deb mysqlrouter:/root
docker cp libssl1.1_1.1.1d-0+deb10u3_amd64.deb mysqlrouter:/root
docker cp mysqlrouter.conf mysqlrouter:/root
docker exec -it mysqlrouter bash
```

在mysqlrouter容器内执行
```
dpkg -i libssl1.1_1.1.1d-0+deb10u3_amd64.deb mysql-router-community_8.0.22-1debian10_amd64.deb
mysqlrouter -c mysqlrouter.conf
```

快捷方法：使用脚本配合镜像