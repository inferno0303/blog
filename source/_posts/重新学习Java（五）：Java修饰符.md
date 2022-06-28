---
title: 重新学习Java（五）：Java修饰符
date: 2022-05-05
tags: note
---

# Java修饰符

Java语言提供了很多修饰符，主要分为以下两类：

- 访问修饰符
- 非访问修饰符

修饰符用来定义类、方法或变量，通常放在语句的最前端，我们通过下面的例子来说明：

```java
public class ClassName {
    // ...
}
private boolean myFlag;
static final double weeks = 9.5;
protected static final int BOXWIDTH - 42;
public static void main(String[] args) {
    // 方法体
}
```

## 访问控制修饰符

Java可以使用访问控制符来保护对类、变量、方法和构造方法的访问，支持4种不同的访问权限：

- default，默认，什么也不写，在同一包内可见，不适用任何修饰符，在类、接口、变量、方法中使用。
- private，在同一类内可见，在变量、方法中使用，不能修饰类（外部类）
- public，对所有类可见，使用对象：类、接口、变量、方法
- protected，对同一包内的类和所有子类可见，使用对象：变量、方法，不能修饰类（外部类）

## 非访问修饰符

- static，独立于class的变量或方法，只有一份拷贝，static变量或方法，与对象是无关的
- final，指不能被再次修改的变量、常量，需要赋初值，表示无法被子类修改
- abstract，抽象类不能被实例化成对象，抽象方法所在的类必须是抽象类，唯一的作用是未来对类进行扩充
- synchronized，同步方法，表示同时只能被一个线程访问
- transient，非持久化的
- volatile，与线程安全相关，每次读取都要真正的读取
