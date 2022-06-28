---
title: ja-netfilter激活Jetbrains全家桶
date: 2021-05-29
tags: 技巧
---

> 本文不涉及任何盗版资源的传播，不存储任何非法资源，请各位用户支持正版

## (1) 下载ja-netfilter

github仓库：https://github.com/ja-netfilter/ja-netfilter

**更新：github被下架了，请去gitee下载：https://gitee.com/ja-netfilter/ja-netfilter**

解压放到你喜欢的目录里，比如用户目录根目录`C:/Users/myname/ja-netfilter/`

## (2) 编辑idea的vmoptions配置

vmoptions配置文件在目标软件安装目录的/bin目录下，例如webstorm的vmoptions文件名为：
`webstorm64.exe.vmoptions`

在文本最后一行加上：
`-javaagent:C:\Users\myname\ja-netfilter\ja-netfilter.jar`

## (3) 编辑ja-netfilter配置

ja-netfilter需要读取文本配置文件，才能按规则拦截http请求，默认情况下ja-netfilter.jar会读取同目录下的`config`文件夹，这里给出一个能用的拦截规则。

编辑dns.conf：
```
[DNS]
EQUAL,jetbrains.com
```

编辑url.conf：
```
[URL]
PREFIX,https://account.jetbrains.com/lservice/rpc/validateKey.action
```

更多规则配置参考ja-netfilter的文档：[https://github.com/ja-netfilter/ja-netfilter#config-file-format](https://github.com/ja-netfilter/ja-netfilter#config-file-format)

## (4) 略

懂得都懂