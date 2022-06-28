# hexo-blog-dev

> hexo博客
> inferno0303@github

## hexo的世界规则

### Hexo的文件约定

hexo的约定，source文件夹中的文件，将会被原样输出到public文件夹中
hexo在构建时，下划线的文件夹会被忽略，也不会被拷贝到public中

### Hexo内置的模块

**hexo内置ejs模块和stylus模块**

ejs模块：可以在构建时，将ejs模板文件转换成html静态文件
ejs模板文件，约定在theme/layout目录下，入口默认是layout.ejs，把它当index.html用就可以了
layout.ejs可以include其他文件（包括css、js文件和其他ejs模块），可以写<script />标签

stylus模块：可以增强网页样式语法，将.styl文件原地输出为.css文件，stylus支持css嵌套，计算属性等

### Hexo的ejs的约定

hexo的约定，index.ejs是首页的模板（对于不会ejs规则的使用者，这很难理解，为什么不命名为home.ejs？）
post.ejs是文章页的模板，tag.ejs是标签页的模板等等...它们都会被渲染进layout.ejs这个公共父模板中
根据不同页面url，生成不同的.html文件，基于ejs，动态将其他模板**嵌入父模板layout.ejs中，得到相应的.html文件**

### Hexo的stulus约定

hexo内置了stylus模块，可以将*.styl文件在原地编译成*.css

### hexo库以及API

db.json是hexo的数据库，在dev和build阶段有用，生产环境中没有，要加入.gitignore

[未完]