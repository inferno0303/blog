---
title: Java多线程（一）
date: 2022-05-16
tags: note
---

# Java多线程

## 1、进程和线程的联系

### 由来

串行：初期计算机只能串行执行任务，并且需要长时间等待用户输入

批处理：预先将用户的指令集中成清单，批量串行处理用户指令，仍然无法并发执行

进程：进程独占内存空间，保存各自运行状态，相互间不干扰且可以互相切换，为并发处理任务提供了可能

线程：共享进程的内存资源，相互间切换更快速，支持更细粒度的任务控制，使进程内的子任务得以并发执行

### 区别

**一句话总结：进程是资源分配的最小单位，线程是CPU调度的最小单位。**

- 所有与进程相关的资源，都被记录在PCB中
- 进程是抢占处理机的调度单位；线程属于某个线程，共享其资源
- 进程拥有虚拟地址空间，线程属于进程，共享虚拟地址空间
- 线程只由堆栈寄存器、程序计数器和TCB组成

### 总结

- 线程不能看作独立应用，进程可以看作独立应用
- 进程拥有独立的地址空间，相互不影响，线程只是进程的不同执行路径
- 线程没有独立的地址空间，多进程的程序比多线程程序健壮
- 进程的切换比线程的切换开销大

### JVM的进程和线程

- Java对操作系统提供的功能进行封装，包括进程和线程
- 运行一个程序会产生一个进程，进程包含至少一个线程
- 每个进程对应一个JVM实例，多个线程共享JVM堆内存
- Java采用单线程编程模型，程序会自动创建主线程
- 主线程可以创建子线程，原则上要后于子线程完成执行

## 2、示例：打印当前线程名

```java
public class CurrentThread {
    public static void main(String[] args) {
        Thread thread = Thread.currentThread();
        String name = thread.getName();
        System.out.println(name); // -> main
    }
}
```

**JVM是多线程的，在启动的时候，会启动其他线程，比如垃圾收集器GC线程。**

## 3、线程的生命周期

新建状态 -> 就绪状态 -> 运行状态 -> 阻塞状态 -> 死亡状态

- 新建状态：使用new关键字和Thread类或子类建立一个线程对象后，线程处于新建状态。
- 就绪状态：线程调用了start()方法后，进入就绪状态，处于就绪队列中，要等待JVM线程调度器的调度。
- 运行状态：获取CPU资源，执行run()方法，它可以变为阻塞状态，就绪状态，或死亡状态。
- 阻塞状态：如果一个线程执行了sleep睡眠、suspend挂起等方法，失去所占用的资源后，该线程就从运行状态进入阻塞状态，在睡眠时间结束，或重新获得设备资源后，科重新进入就绪状态，可以分为三种：
- - 等待阻塞：运行中执行wait()，线程进入等待阻塞状态
- - 同步阻塞，线程获取synchronizes同步锁失败（因为同步锁被其他线程占用）
- - 其他阻塞：通过调用线程的sleep()或join()发出了I/O请求，线程就进入阻塞状态，当sleep结束，或join等待线程终止或超时，或I/O处理完毕，线程重新进入就绪态
- 死亡状态：一个运行状态的线程完成任务或者其他终止条件发生时，该线程就切换到终止状态

### Java线程的状态，6个状态

- 新建（new）：创建后尚未启动的状态
- 运行（Runnable）：调用了start方法后，包含Running和Ready，Ready状态是在线程池中，还没有轮到，Running是正在执行
- 无限等待（Waiting）：不会被分配CPU执行时间，需要被显式的唤醒wait方法，join方法
- 限期等待（Timed Waiting）：在一定时间后会被系统自动唤醒
- 阻塞（Blocked）：等待获取排他锁
- 结束（Terminated）：已终止线程的状态，线程已经结束运行

## 4、线程的优先级

每一个 Java 线程都有一个优先级，这样有助于操作系统确定线程的调度顺序。
Java 线程的优先级是一个整数，其取值范围是 1 （Thread.MIN_PRIORITY ） - 10 （Thread.MAX_PRIORITY ）。
默认情况下，每一个线程都会分配一个优先级 NORM_PRIORITY（5）。
具有较高优先级的线程对程序更重要，并且应该在低优先级的线程之前分配处理器资源。但是，线程优先级不能保证线程执行的顺序，而且非常依赖于平台.

## 5、创建一个Java线程

- 通过实现Runnable接口
- 通过继承Thread类本身（实现了Runnable接口）
- 通过Callable和Future创建线程（有返回值）

### 通过Runable接口创建线程

```java
public class RunnableDemo implements Runnable {

    private Thread t;
    private String threadName;

    RunnableDemo(String name) {
        this.threadName = name;
        System.out.println("创建了线程：" + threadName);
    }

    @Override
    public void run() {
        System.out.println("正在运行线程：" + this.threadName);
        try {
            for(int i = 4; i > 0; i--) {
                System.out.println(this.threadName + "正在执行run()方法" + i);
                Thread.sleep(50);
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println(this.threadName + "执行run()方法完成了，退出");
    }

    public void start() {
        System.out.println("开始" + this.threadName);
        if (t == null) {
            t = new Thread(this, threadName); // 利用new Thread()实例化一个Thread对象，把实现Runnable接口的类传进去
            t.start(); // 调用Thread类的start()方法，创建一个线程，线程会进入就绪状态，获取资源后，JVM会自动调用该线程run()方法进入执行态
        }
    }
}

// main线程调用其他线程
public class TestThread {
    public static void main(String[] args) {
        RunnableDemo R1 = new RunnableDemo("线程1");
        R1.start();
        RunnableDemo R2 = new RunnableDemo("线程2");
        R2.start();
    }
}
```

输出结果：
```
创建了线程：线程1
开始线程1
创建了线程：线程2
开始线程2
正在运行线程：线程1
正在运行线程：线程2
线程2正在执行run()方法4
线程1正在执行run()方法4
线程2正在执行run()方法3
线程1正在执行run()方法3
线程2正在执行run()方法2
线程1正在执行run()方法2
线程2正在执行run()方法1
线程1正在执行run()方法1
线程2执行run()方法完成了，退出
线程1执行run()方法完成了，退出
```

### 通过继承Thread类来创建线程

**本质上也是重写run方法，毕竟Thread类也是实现Runnable接口**

```java
public class ThreadDemo extends Thread {
    private Thread t;
    private String threadName;

    ThreadDemo(String name) {
        this.threadName = name;
        System.out.println("创建了线程：" + threadName);
    }

    @Override
    public void run() {
        System.out.println("正在运行线程：" + this.threadName);
        try {
            for(int i = 4; i > 0; i--) {
                System.out.println(this.threadName + "正在执行run()方法" + i);
                Thread.sleep(50);
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println(this.threadName + "执行run()方法完成了，退出");
    }

    public void start() {
        System.out.println("开始" + this.threadName);
        if (t == null) {
            t = new Thread(this, threadName);
            t.start();
        }
    }
}

public class TestThread {
    public static void main(String[] args) {
        ThreadDemo T1 = new ThreadDemo("线程-1");
        T1.start();
        ThreadDemo T2 = new ThreadDemo("线程-2");
        T2.start();
    }
}

```

### 如何给run()方法传参

- 构造函数传参
- 成员变量传参
- 回调函数传参

## 6、如何实现处理线程的返回值

- 主线程等待法
- 使用Thread类的join()阻塞当前线程以等待子线程处理完毕
- 通过Callable接口实现，通过FutureTask或线程池Future获取

(1) 主线程等待法示例（很蠢）

```java
public class CycleWait implements Runnable {
    public String value = null;

    @Override
    public void run() {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        this.value = "we hava data now!";
    }

    public static void main(String[] args) throws InterruptedException {
        CycleWait cw = new CycleWait();
        Thread thread = new Thread(cw);
        thread.start();
        // 主线程等待法，基于子线程类成员变量，等待子线程值
        System.out.println("waiting for value ...");
        while (cw.value == null) {
            Thread.sleep(100);
        }
        System.out.println("value: " + cw.value);
    }
}
```

(2) 阻塞当前线程，等待子线程执行完成，（join方法阻塞当前线程）

```java
public static void main(String[] args) throws InterruptedException {
        CycleWait cw = new CycleWait();
        Thread thread = new Thread(cw);
        thread.start();
        // 线程实例.join()方法，阻塞当前的main线程，等待run()执行完成
        System.out.println("waiting for value ...");
        thread.join();
        System.out.println("value: " + cw.value);
    }
```

(3) 结合Callable接口和FutureTask类获取run方法返回值

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        System.out.println("start task");
        int total = 0;
        for (int i = 0; i < 100; i++) {
            total += i;
        }
        Thread.sleep(1000);
        System.out.println("task done");
        return "The total is: " + total;
    }

    public static void main(String[] args) {
        FutureTask<String> task = new FutureTask<>(new MyCallable());
        Thread thread = new Thread(task);
        thread.start();
        try {
            String s = task.get(); // 等待有返回值后再执行
            System.out.println("sub thread return a value -> \n" + s);
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}
```

(3.1) 基于线程池Future接口，本质上FutureTask也是实现了Future接口的

```java
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ThreadPoolDemo {
    public static void main(String[] args) {
        ExecutorService newCachedThreadPool = Executors.newCachedThreadPool();
        Future<String> future = newCachedThreadPool.submit(new MyCallable());
        try {
            System.out.println(future.get());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        } finally {
            // 不要忘记关闭线程池
            newCachedThreadPool.shutdown();
        }
    }
}
```

## 7、sleep和wait的区别

**最本质的区别**

- Thread.sleep 只会让出CPU，不会导致锁的改变
- Object.wait 不仅会让出CPU，还会释放已经占有的同步资源锁

```java
public class WaitSleepDemo {
    public static void main(String[] args) {
    
        // 锁
        final String lock = "hello world!";
        
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Thread 1 is waiting to get lock...");
                synchronized (lock) {
                    try {
                        System.out.println("Thread 1 get lock: " + lock);
                        lock.wait(1000); // wait会释放锁
                        System.out.println("Thread 1 is done");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Thread 2 is waiting to get lock...");
                synchronized (lock) {
                    try {
                        System.out.println("Thread 2 get lock: " + lock);
                        Thread.sleep(1000); // sleep不会释放锁资源
                        System.out.println("Thread 2 is done");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();
    }
}
```

输出结果：

```
Thread 1 is waiting to get lock...
Thread 1 get lock: hello world!
Thread 2 is waiting to get lock...
Thread 2 get lock: hello world!
Thread 2 is done
Thread 1 is done
```

## 8、notify和notifyAll的区别

某个对象，关于锁，对象有以下两个池：
- 锁池EntryList
- 等待池WaitSet

### 锁池（排队，竞争锁的拥有权）
假设线程A已经拥有了某个对象的锁，而其他线程B、C想要调用这个对象的某个synchronized方法，由于B、C线程在进入对象的synchronized方法（或者块）之前必须获得该对象锁的拥有权，恰巧该对象的锁目前正在被线程A占用，此时B、C线程就会被阻塞，进入一个地方去等待锁的释放，这个地方便是该对象的锁池

### 等待池（不参与竞争锁的拥有权，等notify，或wait时间到）
假设线程A调用了某个对象的wait()方法，线程A就会释放该对象的锁，同时线程A就进入到了该对象的等待池中，进入到等待池中的线程不会去竞争该对象的锁

- notifyAll会让所有处于等待池的线程全部进入锁池中，去竞争
- notify只会随机选取一个处于等待池中的线程，进入到锁池中，去竞争

## 9、如何中断线程

### 已经被抛弃的方法
- stop方法
- suspend和resume方法

### 目前使用的方法
- interrupt方法，通知线程应该要中断了
-> 如果线程处于被阻塞的状态，那么线程将立即退出被阻塞的状态，并抛出一个InterruptedException异常
-> 如果线程处于正常的活动状态，那么会将该线程的中断标志设置为true，被设置中断标志的线程会正常运行，需要手动处理

要经常检查中断标志位

## 10、yield暗示可以让出当前线程的CPU资源

不会对锁造成影响，调度器可能会忽略，不一定每次都一样




