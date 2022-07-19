# 小菠菜Flow

## 一个记录学习和生活的博客

> 作者：inferno0303@github

## 初识Hexo文件规则

### 文件约定

- source文件夹中的文件，将会被原样输出到public文件夹中
- Hexo在构建时，下划线的文件夹会被忽略，也不会被拷贝到public中

### 内置模块

#### ejs模块

ejs模块的作用：在构建时，**将.ejs模板文件转换成.html文件**

**入口默认是layout.ejs**（应该是在hexo.router模块中硬编码的规则）
layout.ejs可以include其他文件（包括.css .js 和其他.ejs），兼容html语法，可以写script标签

**index.ejs是"/"路由路径的布局文件**（这很难理解，为什么不命名为home.ejs？也许是约定大于配置吧）
post.ejs是默认的layout（布局），在_config.yml中有定义default_layout = post

**layout.ejs相当于是一个容器**，其他布局会嵌入到layout中

#### stylus模块

stylus模块：可以增强网页样式语法，将.styl文件原地输出为.css文件，stylus支持css嵌套，计算属性等

### Hexo库以及API

**db.json是hexo的数据库**，在dev和build阶段有用，生产环境中没有，所以要加入.gitignore

## Hexo布局

### 布局的嵌套关系

新建.ejs文件，则这个ejs文件就是布局了，**在ejs文件上面以Front-matter格式声明该布局的父布局ejs**，如果不声明，**则隐式的声明为layout布局为父布局，将在layout.ejs里使用body变量导出。**

```未完```