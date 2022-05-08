---
title: npm如何换源、清除缓存？
date: 2021-05-07
tags: tips
---

**1、npm换源：**
```
a)、临时生效：
npm install 包的名字 --registry https://registry.npm.taobao.org

b、设置npm的配置（全局配置）
// 查看npm源的当前地址
npm config get registry

// 设置淘宝镜像地址
npm config set registry https://registry.npm.taobao.org
```

**2、yarn换源：**
```
a、临时生效：
yarn save 包的名字 --registry https://registry.npm.taobao.org/

b、设置yarn的配置项（全局配置）
// 查看yarn源的当前地址
yarn config get registry

// 设置淘宝镜像
yarn config set registry https://registry.npm.taobao.org/
```

**3、查看npm的node_modules目录：**
```
// 查看npm的全局root目录
npm root -g

// 查看npm的全局前缀
npm prefix -g

// 查看npm的全局bin目录
npm bin -g
*默认情况，npm 在 C:\Users\YangXu\AppData\Roaming\npm 下
```

**4、清理npm软件包缓存：**
```
// clean npm cache
npm cache clean
// aliases:
npm cacahe clear
// or this:
npm cache rm
```

**5、更改npm全局路径、cache路径**
```
// 首先在别的盘新建两个目录
D:\nodejs\node_modules\npm\node_global_modules
D:\nodejs\node_modules\npm\node_cache
// 然后依次执行
npm config set prefix="D:\nodejs\node_modules\npm\node_global_modules"
npm config set cache="D:\nodejs\node_modules\npm\node_cache"

// 设置之后，查看config：
npm config ls
// cacahe = "D:\\Envs\\nodejs\\node_modules\\npm\\npm_cache"
// prefix = "D:\\Envs\\nodejs\\node_modules\\npm\\node_global_modules"
// registry = "https://registry.npm.taobao.org/"


// 0、修改环境变量，新增环境变量：
NODE_HOME => D:\nodejs
// 1、编辑Path，增加nodejs的bin路径：
%NODE_HOME%\
// 2、增加node_modules global bin路径：
%NODE_HOME%\node_modules\npm\node_global_modules
```

**6、yarn全局路径：**
```
yarn global bin // 已安装的全局文件夹
yarn global dir // 通过yarn安装的全局文件夹
```


**7、疑难杂症，解决 yarn create @umijs/umi-app 文件路径错误的问题**：
```
yarn安装 create-umi-app 后，将 create-umi-app 安装在Yarn目录下，并将 create-umi-app 通过脚本链接到 npm_global_modules 路径，这一步有错误。

解决方法：到project根目录执行：
C:\Users\YangXu\AppData\Local\Yarn\Data\global\node_modules\.bin\create-umi-app.cmd
```