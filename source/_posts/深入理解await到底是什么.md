---
title: 深入理解await到底是什么
date: 2022-05-25
tags: note
---

# 深入理解await到底是什么

> 前置知识：微任务、宏任务、Event Loop
> 推荐阅读：[https://juejin.cn/post/6936630572936593422](https://juejin.cn/post/6936630572936593422)

## 0x01 首先要了解Promise的两个重要属性

> 此处引用自[https://segmentfault.com/a/1190000038865350](https://segmentfault.com/a/1190000038865350)

### 三个状态
- pending 准备
- fulfilled 成功
- rejected 失败

### 两个过程

- pending -> fulfilled
- pending -> rejected

### 一个方法
- then

### Promise的数据结构

```javascript
{
  [[PromiseState]]: "fulfilled",  // 状态
  [[PromiseResult]]: 1 // resolve函数传递的参数值
}
```

## 0x02 其次要知道async是什么

async包装的函数永远返回一个Promise对象

- async函数执行完语句后，就自动触发`resolve()`
- async函数内return，会将返回值装入`Promise数据结构`的`PromiseResult`属性里
- 如果async函数没有return，那么`PromiseResult`属性里会装入`undefined`
- 如果async函数没有发生异常，那么`PromiseState`会变成`fulfilled`
- 如果async函数体发生了异常，那么`PromiseState`会变成`rejected`

## 0x03 最后再了解await干了什么

它的作用如下：

> 引用自文章[https://segmentfault.com/a/1190000024442415](https://segmentfault.com/a/1190000024442415)
> await 语句期望在其右侧有一个 promise 对象。当你使用 await 语句时，javascript 会暂停 async 函数的执行，等待 promise 返回一个值，然后继续执行。

await其实是一个语法糖，用来方便的实现 Promise 结构的封装，它必须在async内使用（为什么？文章后面会说明原因）

大部分初学者粗浅的理解是：
- await 右边的函数一定是异步函数
- await 会阻塞当前的它所在的 async 函数执行过程，要等右边的异步函数执行完成再执行下面的代码

**以上的理解很粗浅，而且是大约是错的**

让我们看以下例子：

```javascript
async function func1() {
    console.log("C")
    await func2() // 调用一个异步函数func2()
    console.log("C++")
}

function func2() {
    return new Promise(resolve => {
        console.log("Java")
        resolve()
    }).then(() => {
        console.log("Python")
    })
}

func1()
```

执行结果为：

```
C
Java
Python
C++
```
这个输出结果符合预期，毕竟await真的有等func2做完所有事情后再向下执行
以上代码的`await`相当于做了这件事，等效于：

```javascript
async function func1() {
    console.log("C")
    func2()
    // console.log("C++") 这句话被移动到当前Promise返回值的.then里面去了
}

function func2() {
    return new Promise(resolve => {
        console.log("Java")
        resolve()
    }).then(() => {
        console.log("Python")
    })
}

func1().then(() => {
    console.log("C++") // 我在这里
})
```

执行结果：

```
C
Java
Python
C++
```

妙啊！

那么async代码相当于做了这件事，等效于：

```javascript
function func1() {
    return new Promise((resolve, reject) => {
        console.log("C")
        func2()
        resolve() // 把后面的callback丢到任务队列里，此时队列里已经有一个微任务啦
    })
}

function func2() {
    return new Promise(resolve => {
        console.log("Java")
        resolve() // 把后面的callback丢到任务队列里，此时队列里没有微任务呢
    }).then(() => {
        console.log("Python") // 我是第一个callback
    })
}

func1().then(() => {
    console.log("C++") // 我是第二个callback
})
```

输出结果：

```
C
Java
Python
C++
```

通过这三个例子，我们一步步把async await丢了，看到了他们语法糖前原本的样子

## 0x04 关于await的误区

先看这个例子，**请注意fun2()**：

```javascript
// 微任务队列 - 深刻理解await到底干了什么
async function fun1() {
    console.log("fun1 - 1")
    await fun2() // 此时fun2()不返回一个Promise对象
    console.log("fun1 - 2")
}

function fun2() {
    console.log("fun2 - 1")
}

new Promise(function (resolve) {
    console.log("promise - 1")
    resolve()
}).then(function (value) {
    console.log("promise then - 1")
})

fun1().then(() => {
    console.log("fun1 then")
})
```

执行结果为：

```
promise - 1
fun1 - 1
fun2 - 1
promise then - 1
fun1 - 2
fun1 then
```

以上代码去掉了async 和 await 后是这样的：

```javascript
function fun1() {
    return new Promise((resolve, reject) => {
        console.log("fun1 - 1")
        fun2()
        resolve()
    })
}

function fun2() {
    console.log("fun2 - 1")
}

new Promise(function (resolve) {
    console.log("promise - 1")
    resolve()
}).then(function (value) {
    console.log("promise then - 1")
})

fun1().then(() => {
    console.log("fun1 - 2")
}).then(() => {
    console.log("fun1 then")
})
```

剖析一下执行过程：

```javascript
1、先执行console.log("promise - 1")，输出
2、然后执行resolve()，把.then后面的console.log("promise then - 1")推到任务队列里了
3、然进入fun1()后执行console.log("fun1 - 1")
4、接着执行fun2函数里的console.log("fun2 - 1")

此时同步代码已经执行完了

5、然后执行resolve()，把fun1的then的callback，也就是console.log("fun1 - 2")，丢到任务队列里去，推入队列后，此时队列里有2个任务了
6、因为前一个Promise对象的同步代码已经执行完成，触发了隐式resolve()，所以将console.log("fun1 then") 推入队列，此时队列里有3个任务了

此时任务队列已经有3个微任务了，遵循先入先出的队列规则

7、取出console.log("promise then - 1")
8、取出console.log("fun1 - 2")
9、取出console.log("fun1 then")
```

要了解执行过程，结合注解版更好理解：

```javascript
function fun1() {
    return new Promise((resolve, reject) => {
        console.log("fun1 - 1") // 我第4，被执行
        fun2() // 我第5，执行fun2函数
        resolve() // 我第7，把fun1的then的callback丢到任务队列里去，此时队列已经有一个任务啦
    })
}

function fun2() {
    console.log("fun2 - 1") // 我第6，被执行了
}

new Promise(function (resolve) {
    console.log("promise - 1") // 我第1先执行
    resolve() // 我第2执行，把后面的callback丢到任务队列里
}).then(function (value) {
    console.log("promise then - 1") // 第2后，我被丢到任务队列里去了，还没执行呢
    // 我第9，当前已经没有要同步执行的代码了，我被从任务队列里取出来执行啦，取出后还剩2个任务
})

fun1().then(() => { // 第3，执行fun1函数
    console.log("fun1 - 2") // 我第10，从任务队列里取出并执行，取出后任务队列还有1个任务
}).then(() => {
    console.log("fun1 then") 
    // 我第8，因为前一个Promise对象同步代码已经执行完成，触发了隐式resolve()，我被丢到任务队列里了，此时任务队列已经有2个任务啦
    // 第11，我被从任务队列里取出来执行了，取出后任务队列为空
})
```

## 0x05 总结

以上的例子说明了：

- **await其实就是把它下面的所有代码块，移动到当前所在async函数的.then回调中了！这也回答了前文中「为什么await一定要在async函数中」的问题了**

- 还要特别记住的是，**async函数执行完所有的同步语句后，会触发隐式resolve，而resolve就是把.then的callback丢到异步队列的操作**

- 其次要知道的是，**Promise.then()也会返回Promise对象，这就是.then().then()链式调用的基础。**

学而不思则罔，思而不学则殆。