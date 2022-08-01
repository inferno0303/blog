---
title: 重新学习Java（一）：基础语法
date: 2022-05-01
tags: Java
---

# Java基础语法

一个Java程序可以认为是一系列对象的集合，这些对象通过调用彼此的方法来协同工作，下面介绍类、对象、方法和实例变量的概念。

- 对象：对象是类的一个实例，有状态和行为，例如一条狗是一个对象，它的状态有：颜色、名字、品种，行为有：摇尾巴、叫、吃等。
- 类：类是一个模板，它描述一类对象的行为和状态。
- 方法：方法就是行为，一个类可以有很多方法。逻辑运算，数据修改以及所有动作都是在方法中完成的。

## 第一个Java程序

```
public class HelloWorld {
    // 第一个Java程序
    // 它将输出字符串 Hello World
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}
```

- public 访问修饰符
- static 关键字
- void 返回类型
- main 方法名
- String 字符串类型
- args 字符串数组

## Java的类与文件名的规范：
- Java类名与源文件名要相同，首字母大写
- 方法名要以小写字母开头，驼峰法命名
- 主方法（main函数）入口，所有的Java程序都由 public static void main(String[] args) 开始执行

## 如何编译和运行
```
javac HelloWorld.java
java HelloWorld
```

## Java修饰符
Java可以使用修饰符，主要有两类：
- 访问控制修饰：default、public、protected、private
- 非访问控制修饰：final、abstract、static、synchronized

## Java变量
- 局部变量
- 类变量（静态变量）
- 成员变量（非静态变量）

## Java数组
数组是储存在堆上的对象，可以保存多个同类型的变量。

## 继承
在 Java 中，一个类可以由其他类派生。如果你要创建一个类，而且已经存在一个类具有你所需要的属性或方法，那么你可以将新创建的类继承该类。

利用继承的方法，可以重用已存在类的方法和属性，而不用重写这些代码。被继承的类称为超类（super class），派生类称为子类（sub class）。

## 接口
在 Java 中，接口可理解为对象间相互通信的协议。接口在继承中扮演着很重要的角色。

==接口只定义派生要用到的方法，但是方法的具体实现完全取决于派生类。==