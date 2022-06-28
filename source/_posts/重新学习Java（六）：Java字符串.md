---
title: 重新学习Java（六）：Java字符串
date: 2022-05-06
tags: note
---

# Java String类

创建字符串最简单的方法如下：

```java
String str = "Hello world";
```
在代码中遇到字符串常量时，这里的值是`Hello world`，编译器会自动使用该值创建一个String对象。
与其他对象一样，可以使用关键字和构造方法来创建String对象。

用构造函数创建字符串：
```java
String str = new String("Hello world");
```

String创建的字符串会存储在公共池中，而new创建的字符串对象在堆上：
```java
String s1 = "hello"; // String 直接创建，引用"hello"这个公共池中的常量
String s2 = "hello"; // String
String s3 = s1; // 相同引用
String s4 = new String("hello");
String s5 = new String("hello");
```
