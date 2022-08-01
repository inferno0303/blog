---
title: 重新学习Java（二）：类
date: 2022-05-02
tags: Java
---

# Java对象和类

Java作为一种面向对象语言，支持以下基本概念
- 多态
- 继承
- 封装
- 抽象
- 类
- 对象
- 实例
- 方法
- 重载

**对象：对象是类的一个实例。
类：类是一个模板。**

简单的类：

```java
public class Dog {
    String breed;
    int size;
    String colour;
    int age;
    
    void eat() {
    }
    
    void run() {
    }
    
    void sleep() {
    }
    
    void name() {
    }
}
```

一个类可以包含以下类型变量：

- 局部变量：在方法、构造方法或者语句块中定义的变量被称为局部变量。
- 成员变量：成员变量是定义在类中，方法体之外的变量。这种变量在创建对象的时候实例化，成员变量可以被类中方法、构造方法和特定类的语句块访问。
- 类变量：类变量也声明在类中，方法体之外，但必须声明为static类型。

## 构造方法

每个类都有构造方法，如果没有显式的为类定义构造方法，Java编译器将会为该类提供一个默认构造方法。
在创建一个对象的时候，至少要调用一个构造方法，构造方法的名称必须与类名相同，一个类可以有多个构造方法。

下面是一个构造方法的示例：

```java
public class Puppy{

    public Puppy(){
        
    }
    
    public Puppy(String name){
        // 这个构造器仅有一个参数：name
    }
}
```

## 创建对象
对象是根据类创建的，在Java中，使用关键字new来创建一个新的对象。创建对象需要以下三步：

- 声明：声明一个对象，包括对象名称和对象类型。
- 实例化：使用关键字new来创建一个对象。
- 初始化：使用new创建对象时，会调用构造方法初始化对象。

下面是一个创建对象的例子：

```java
public class Puppy {
    // 这个构造器仅有一个参数：name
    public Puppy(String name) {
        System.out.println("小狗的名字是：" + name);
    }
    public static void main(String[] args) {
        // 下面的语句将创建一个Puppy对象
        Puppy myPuppy = new Puppy("tommy");
    }
}
```

## 源文件声明规则

- 一个源文件中只能有一个public类
- 一个源文件中可以有多个非public类
- 源文件的名称应该和public类的名称保持 一直
- 如果一个类定义在某个包中，那么package语句应该在源文件的首行
- 如果源文件包含import语句，那么应该放在package语句和类定义之间

## Java包

包主要用来对类和接口进行分类，当开发Java程序时，可能编写成百上千的类，有必要对类和接口进行分类。