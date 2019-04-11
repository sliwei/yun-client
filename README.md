# 云盘客户端

> 设计仿于百度

## Dev Setup

``` bash
# 安装
npm install

# 启动web
npm run dev

# 访问
localhost:8080

```

## Build Setup

``` bash

# 打包web

npm run build:test  # 测试
npm run build:prod  # 线上

# 复制对应打包命令生成的文件到线上环境

> dist/test
> dist/prod

```

## 项目结构

```

# 开发环境文件
yun-client
  config                // 配置文件
  dist                  // 打包文件夹
    test                // 测试
    prod                // 线上
  src                   // 项目入口
    api                 // 接口
    components          // 页面模块
    public              // 资源
    bundle.js           // react路由切割
    config.js           // 路由菜单
    defined.less        // 默认样式
    index.js            // 主入口
    index.scss          // 主入口样式
    theme.scss          // 主题样式
    theme_dark.scss     // 主题1
    theme_light.scss    // 主题2
  .babelrc              // babel配置
  index.html            // html模板
  package.json          // 插件配置
  postcss.config.js     // 样式兼容
  webpack.config.js     // 打包配置

# 线上环境文件(打包完成后，Jenkins或复制以下文件到线上访问即可)
yun-client
  dist
    test                // 打包生成测试文件
    prod                // 打包生成线上文件

```

## 项目主要插件

插件名称|描述
----|----
antd|UI框架
axios|http请求
nprogress|加载条
