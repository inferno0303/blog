---
title: 重新学习Java（四）：变量类型
date: 2022-05-04
tags: Java
---

# Java变量类型

在Java语言中所有变量在使用前必须声明。

 Java语言支持的变量类型有：
 
 静态变量、类变量、有static：与类共存亡，在方法区中分配内存
 实例变量、成员变量、没有static：与实例共存亡，在堆中分配内存
 局部变量：类的方法（函数体）block中的变量，与方法共存亡，在栈中分配内存
 
 ```java
 public class Variable {
     static int allClicks = 0; // 类变量
     String str = "Hello World"; // 实例变量
     public void method() {
         int i = 0; // 局部变量
     }
 }
 ```