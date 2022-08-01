---
title: Java虚拟机
date: 2022-05-19
tags: Java
---

## JVM的架构

JVM主要由四部分组成：

1. Class Loader（类加载器）
2. Runtime Data Area（JVM内存空间结构模型）：Stack（栈）、Heap（堆）、Method Area（方法区）、PC Register、Native Method Stack（本地方法栈）
3. Execution Engine（执行引擎，对命令进行解析成字节码）
4. Native interface（本地接口，用Java调用native方法）

## 反射是什么

Java反射，是在运行状态中，对于任意一个**类**，都能获取这个类的所有属性和方法。对于任意一个**对象**，都能调用它的任意方法和属性。
这种**动态获取信息、动态调用对象方法**的功能称为Java语言的反射机制。

## 写一个反射的例子

```java
Class rc = Class.forName("com.xx.xx"); // 加载一个类
Robot r = (Robot) rc.newInstance(); // 新建类实例对象
rc.getName(); // 获取类的名字
Method getHello = rc.getDeclaredMethod("hello", String.class) // 获取这个类的某一个方法，类型是Method，可以获取private方法
getHello.setAccessible(true); // 调用方法前，要设置可访问性
Object str = getHello.invoke(r, "Bob"); // 调用这个方法，invoke
```

## 谈谈ClassLoader

类从编译到执行的过程：
1. 编译器将Hello.java源文件编译为Hello.class字节码文件
2. ClassLoader将字节码转换为JVM中的Class<Hello>对象
3. JVM将类实例化为对象

### ClassLoader是什么

ClassLoader在Java中由非常重要的作用，它主要是工作在Class装载的加载阶段，主要作用是从系统外部获得**Class二进制数据流**，它是Java的核心组件，所有的Class都是由ClassLoader进行加载的。ClassLoader负责将Class文件的二进制数据流装进系统，然后交给Java虚拟机进行连接，初始化等操作。

### ClassLoader的种类

1. BootStrapClassLoader：C++编写，加载核心库，提高安全性和性能，与平台相关
2. ExtClassLoader：获取java.ext路径的类，加载javax
3. AppClassLoader：加载ClassPath，用户编写的程序

## 操作系统的内存：从物理地址到逻辑地址

物理地址 -> 分页管理机制 -> 线性地址 -> 分段管理机制 -> 逻辑地址

32bit系统：2^32
64bit系统：2^64

地址空间的划分：
- 内核空间
- 用户空间
