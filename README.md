# 欢迎来到我的博客

欢迎来到我的博客，也是一个数字花园。

在这个纷繁的信息时代，我将有价值的信息沉淀于此，希望能为大家提供一个清新的知识源泉。

本博客是基于 Hexo 构建的静态网页。

> 创建时间：2022-04-29  
> 更新时间：2023-06-27  
> 版本：V1.0  
> 作者：github@inferno0303

# 1 如何使用

> 详细Hexo命令，例如如何本地运行、构建产物请参考 [Hexo 官方文档](https://hexo.io/zh-cn/docs/commands)

以下记录最常用操作命令

## 1.1 使用npm安装依赖

```
npm config set registry https://registry.npm.taobao.org
npm install
```

## 1.2 运行本地Web服务器

```
node .\node_modules\hexo\bin\hexo server
```

## 1.3 清理本地缓存

清除缓存文件 (db.json) 和已生成的静态文件 (public)，在某些情况（尤其是更换主题后），如果发现您对站点的更改无论如何也不生效，您可能需要运行该命令。

```
 node .\node_modules\hexo\bin\hexo clean
```

## 1.4 生成静态文件

```
 node .\node_modules\hexo\bin\hexo generate
```

# 2 文件目录结构

> 参考 Hexo 官方文档：[Hexo 官方文档](https://hexo.io/zh-cn/docs/setup)

```
$ hexo init <folder>
$ cd <folder>
$ npm install
```

安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

## 2.1 _config.yml

网站的配置信息，可以在此配置大部分的参数。

## 2.2 package.json

描述 Node.js 项目的配置文件，Hexo 应用程序的信息。EJS, Stylus 和 Markdown 渲染引擎 已默认安装，您可以自由移除。

## 2.3 scaffolds/ （模板文件夹）

模版文件夹。当您新建文章时，Hexo 会根据 scaffold 来创建文件。

Hexo 的模板是指在新建的文章文件中默认填充的内容。例如，如果您修改 scaffold/post.md 中的 Front-matter 内容，那么每次新建一篇文章时都会包含这个修改。

## 2.4 source/（资源文件夹）

资源文件夹是存放用户资源的地方。例如：文章、图片。

用于编写博客文章的Markdown文件是以.md扩展名结尾的，存放在/source/_posts/目录下。

除 _posts 文件夹（存储markdown文件，是博客文章的内容）之外，开头命名为 _ (下划线)的文件 / 文件夹和隐藏的文件将会被忽略。Markdown 和 HTML 文件会被解析并放到 public 文件夹，而其他文件会被拷贝过去。

## 2.5 themes/（主题文件夹）

主题文件夹。Hexo 会根据主题来生成静态页面。

自定义主题遇到很多坑，Hexo 的官方文档写得很差，下一节会对自定义 Hexo 主题做详细说明。


# 3 主题文件的目录结构

> 参考 Hexo 官方文档：[Hexo 官方文档](https://hexo.io/zh-cn/docs/themes)

创建 Hexo 主题非常容易，您只要在 themes 文件夹内，新增一个任意名称的文件夹，并修改 _config.yml 内的 theme 设定，即可切换主题。一个主题可能会有以下的结构：

```
.
├── _config.yml
├── languages
├── layout
├── scripts
└── source
```

主题资源存放在`/theme/`目录下，每个主题都以子文件夹的形式存在，子文件夹名称就是主题的名字，比如`/theme/my_theme/`。

在主题目录中，最常用包含以下几个目录：

- `layout/`（用于存放主题的布局文件）
- `script/`（用于存放主题相关的脚本文件）
- `source/`（用于存放主题所需的其他资源文件）

此外，主题目录中还包含主题的配置文件，名为：`config.yml`

## 3.1 _config.yml

主题的配置文件。和 Hexo 配置文件不同，主题配置文件修改时会自动更新，无需重启 Hexo Server。

## 3.2 layout/
布局文件夹。用于存放主题的模板文件，决定了网站内容的呈现方式，Hexo 内建 Nunjucks 模板引擎，您可以另外安装插件来获得 EJS、Haml、Jade 或 Pug 支持，Hexo 根据模板文件的扩展名来决定所使用的模板引擎，例如：

- layout.ejs   - 使用 EJS
- layout.swig  - 使用 Swig

## 3.3 scripts/
脚本文件夹。在启动时，Hexo 会载入此文件夹内的 JavaScript 文件，请参见 插件 以获得更多信息。

## 3.4 source/
资源文件夹，除了模板以外的 Asset，例如 CSS、JavaScript 文件等，都应该放在这个文件夹中。文件或文件夹开头名称为 _（下划线）或隐藏的文件会被忽略。

如果文件可以被渲染的话，会经过解析然后储存到 public 文件夹，否则会直接拷贝到 public 文件夹。

# 4 如何自定义主题

自定义 Hexo 主题要创建以下的文件：

- `/layout/*.ejs`：各模板文件，用于在 `*.md` 文章头指定 layout 。
- `/source/*`：资源文件夹，JS、CSS等静态文件会被复制到public文件夹，浏览器可直接访问。
- `/script/*.js`：脚本文件，在启动时 Hexo 会载入此文件夹内的 JS 代码，通常用于插件开发。
- `_config.yml`：主题的配置文件，可以编写一写全局变量，用于在主题模板内使用变量。

说明：

- **`/layout/*.ejs`目录下的文件是 EJS 模板文件。在 `*.md` 文件头部的 `layout` 属性指定 ejs 模板名，渲染器会根据对应的 EJS 模板文件生成相应的 HTML 内容。它们可以被看作是各个页面的 HTML 模板容器。**


## 4.1 创建 /layout/layout.ejs

`/layout/layout.ejs`是根 EJS 模板文件，其中包含标准的 HTML `<head>` 等头部标签。在最终的渲染过程中，其他页面将被嵌套到该根模板中，相当于父容器。


下面是一个最简单的 layout.ejs 文件的示例内容：

```ejs
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyBlog</title>
</head>
<body>
    <!-- body 变量会根据页面的 URL 自动填充内容 -->
    <%- body %>
</body>
</html>
```

## 4.2 创建 /layout/index.ejs

`/layout/index.ejs` 模板文件是必需的，每个主题至少都应包含一个 `index` 模板，因为它充当了网页根页面 `/` 的容器。当找不到其他模板文件时，如 post 文章或 archive 归档页面，系统会自动回退到该模板文件，确保网站的正常显示。

下面是一个最简单的 index.ejs 文件的示例内容：

```
<section>
    <!-- 使用 page 变量导入适用于首页的内容 -->
</section>
```

值得注意的是，**Hexo 会自动生成 post、archives、tags 等页面**，因此虽然 post、archive、tags 的模板不是必需的，但最好还是单独创建这些模板，这样做可以保证这些页面正常显示。

## 4.3 创建 /layout/post.ejs

**Hexo 约定 post 页面使用名为 `post.ejs` 的模板，因此要创建 `post.ejs` 模板。**

下面是一个最简单的 post.ejs 文件的示例内容：

```
<article>
    <!-- 使用 post 变量导入适用于文章页面的内容 -->
</article>
```

## 4.4 创建 /layout/archive.ejs

**Hexo 约定 archives 页面使用名为 `archive.ejs` 的模板，因此要创建 `archive.ejs` 模板。**

下面是一个最简单的 archive.ejs 文件的示例内容：

```
<section>
    <!-- 使用 page 变量导入适用于归档页面的内容 -->
</section>
```

## 4.5 创建其他 ejs 模板

**可以创建自定义模板，以显示自定义页面，而不局限于post、archives这些默认页面，下面以创建 about 页面为例子。**

在 `/source/` 文章目录创建 `about.md` 文件（不是 `/theme/my_theme/source/` 目录），内容如下：

```
---
layout: about
---
可以介绍自己，这是内容，这是内容。
```

由于该 Markdown 文档声明使用了 about 模板，在构建网页时会寻找 /layout/about.ejs 作为模板文件，并生成相应的 HTML 内容。以下是 /layout/about.ejs 的内容：

```
<h1>关于我</h1>
<p>以下是 about.md 文章的内容：</p>
<p>
    <%- page.content %>
</p>
```

在上面的ejs模板中，`about.md` 文档内容会被 `<%- page.content %>` 变量导出。

**从上述描述可以看出，使用 `*.md` 文件可以创建新的页面路由。通过在 `*.md` 文件的头部指定 `layout` 属性，我们可以将其与任意的 `*.ejs` 模板关联起来。这种方法使得我们能够轻松创建具有不同风格的网页。**

## 4.6 创建 css js 资源文件

在 `/source/` 文件夹中，我们可以创建 CSS 和 JS 文件，用于在不同的页面中引入并发挥作用。这些静态文件，包括 JS、CSS 等，会被复制到 public 文件夹中，从而可以直接在浏览器中访问。

# 5 我自定义的地方

## 5.1 构建静态Web产物的目录

`public_dir: docs`

默认值是 public，但这里是为了匹配 github page 服务，所以默认将 docs 目录作为静态根目录

*未完*
