---
title: ZooKeeper
date: 2022-04-30
tags: note
---

> ZooKeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services.

<!-- more -->

## 应用场景
- 数据发布/订阅
- 负载均衡
- 命名服务
- 分布式协调/通知
- 集群管理
- Master 选举
- 分布式锁
- 分布式队列

## 对比
如果场景未应用配置的强一致分发，类比到阿里内部，就是 Diamond，在阿里云售卖产品为 ACM。

|产品|ACM|Spring Cloud Config Server|ZooKeeper|ETCD
|---|---|---|---|---|
|配置修改|直接在 ACM 控制台上进行配置修改|一般在 Git 仓库上进行配置修改|通过调用 ZK API 修改|通过调用 etcd API 修改|
|配置自动推送|修改过的配置自动推送到监听的客户端|客户端只能在启动的时候加载|修改过的配置自动推送到监听的客户端|修改过的配置自动推送到监听的客户端|
|API接口|基于 RESTful API，同时支持 Java Native 接口，Spring Cloud 接口，和其他语言类接口|基于 RESTful API 和 Spring Cloud 规范，同时也支持其他语言客户端|支持 Java 原生接口|基于 RESTful API 的接口|
|版本管理|在 ACM 上自动记录各个修改的版本信息|通过 Git 间接管理版本|不带任何版本控制|不带任何版本控制|
|配置推送追踪|可查询所有客户端配置推送状态和轨迹|无法查询配置推送历史|无法查询配置推送历史|无法查询配置推送历史|

## Quick Start
参考 [start](https://zookeeper.apache.org/doc/r3.3.3/zookeeperStarted.html) 文档。

- 添加 zoo.cfg 文件，内容如下：
```
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/Users/zhoukeke/Downloads/apache-zookeeper-3.8.0-bin/tmp/zookeeper
clientPort=2181
```

- 启动 ```bin/zkServer.sh start```
```
# bin/zkServer.sh start
ZooKeeper JMX enabled by default
Using config: /Users/zhoukeke/Downloads/apache-zookeeper-3.8.0-bin/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
```

- 连接 ```bin/zkCli.sh -server 127.0.0.1:2181```
```
$bin/zkCli.sh -server 127.0.0.1:2181
Connecting to 127.0.0.1:2181
2022-04-08 15:08:56,133 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:zookeeper.version=3.8.0-5a02a05eddb59aee6ac762f7ea82e92a68eb9c0f, built on 2022-02-25 08:49 UTC
2022-04-08 15:08:56,134 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:host.name=localhost
2022-04-08 15:08:56,134 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:java.version=17.0.2
2022-04-08 15:08:56,134 [myid:] - INFO  [main:o.a.z.Environment@98]
...
[zk: 127.0.0.1:2181(CONNECTED) 0] help
[zk: 127.0.0.1:2181(CONNECTED) 3] create /zk_pipe_test "hello zk_pipe_test"
Created /zk_pipe_test
[zk: 127.0.0.1:2181(CONNECTED) 4] get /zk_pipe_test
hello zk_pipe_test
[zk: 127.0.0.1:2181(CONNECTED) 6] ls /
[zk_pipe_test, zookeeper]
```

- 关闭服务器 `bin/zkServer.sh stop`

## Java Example
### Dependencies
```
<dependencies>
    <dependency>
        <groupId>org.apache.zookeeper</groupId>
        <artifactId>zookeeper</artifactId>
        <version>3.4.8</version>
    </dependency>
</dependencies>
```

### Code
```
package com.demo.zookeeper;

import java.io.IOException;

import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;

public class Main implements Watcher {

	public static void main(String[] args) throws IOException, KeeperException, InterruptedException {
		ZooKeeper zk = new ZooKeeper("127.0.0.1:2181", 3000, new Main());

		byte[] bytes = zk.getData("/zk_pipe_test", false, null);

		System.out.println(new String(bytes));
	}

	public void process(WatchedEvent event) {
		// TODO Auto-generated method stub
		System.out.println(event);
	}
}
```
### output
```
log4j:WARN No appenders could be found for logger (org.apache.zookeeper.ZooKeeper).
log4j:WARN Please initialize the log4j system properly.
log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.
WatchedEvent state:SyncConnected type:None path:null
hello zk_pipe_test
```

## One More Thing
Paxos, 分布式一致性算法， https://zhuanlan.zhihu.com/p/31780743

## References
- Paxos
- zookeeper
- ACM
- 应用场景
- start
- https://zookeeper.apache.org/doc/r3.3.3/javaExample.html#ch_Introduction
- https://ihong5.wordpress.com/2014/05/27/maven-how-to-connect-to-a-zookeeper-in-java/