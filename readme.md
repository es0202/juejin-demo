#### config/http.js文件内容如下：
```
module.exports = {
  header: {
    headers: {
      'X-Agent': 'Juejin/Web',
      'X-Legacy-Device-Id': '',
      'X-Legacy-Token': '',
      'X-Legacy-Uid': '',
      'Content-Type': 'application/json'
    }
  },
  header1: {
    headers: {
      'X-Juejin-Client': '',
      'X-Juejin-Src': 'web',
      'X-Juejin-Token': '',
      'X-Juejin-Uid': '',
    }
  },
  param_common: {
    'operationName': '',
    'query': '',
    'variables': {
      'first': 20, //一次性20条数据
    },
  },
  param_recommend: {
    'extensions': {
      'query': {
        'id': ''
      }
    }
  },
  param_others: {//除了推荐、关注标签外其他标签使用的query id一致
    'extensions': {
      'query': {
        'id': ""
      }
    }
  },
  param_follow: {
    "variables": {
      "type": "ARTICLE",
      "after": ""
    },
    "extensions": {
      "query": {
        "id": ""
      }
    }
  },
  param_articles_popular: {
    'variables': {
      'order': 'POPULAR'
    }
  },
  param_articles_new: {
    'variables': {
      'order': 'NEWEST'
    }
  },
  param_authors: {
    'variables': {
      'limit': 10,
      'excluded': []
    },
    'extensions': {
      'query': {
        'id': ''
      }
    }
  }
}
```
本项目跨域调用掘金的接口
请自行登录juejin.im, 获取调用接口所需的token及各种查询的extensions.query.id值

#### 升级问题
webpack-bundel-analyzer 3.3.2版本容易受 css 攻击

webpack-dev-server 3.1.11之前的版本，因为 HMR 需要使用 WebSocket，但 WebSocket 不检查请求来源可能导致攻击者窃取代码

webpack 升级到4

    ```
    TypeError: Cannot find module 'webpack/bin/config-yargs'
    ```
  ##### 安装 webpack-cli

    ```
    TypeError: compilation.mainTemplate.applyPluginsWaterfall is not a function at D:\gitRepository\simple\node_modules\html-webpack-plugin\lib\compiler.js:81:51
    ```
  ##### 更新 html-webpack-plugin@latest

    ```
    TypeError: Cannot read property 'vue' of undefined
    ```
  ##### 更新 vue-loader

    ```
    Module Error (from ./node_modules/vue-loader/lib/index.js): vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
    Module parse failed: Unexpected character '@'
    ```
  ##### vue-loader 最新版本15问题，降低版本如14.2.2

  ```
  Cannot assign to read only property 'exports' of object '#<Object>' at Module../node_modules/webpack-dev-server/client/clients/BaseClient.js
  ```
  ##### 不允许在 js 中混用 module.exports 和 import ，webpack 配置的 babel-loader 模块移除条件 resolve('node_modules/webpack-dev-server/client')

#### 点赞、取消点赞为put/delete方法，绕不过cors预检，只做了动态样式，没法调用掘金的接口

#### TODO
#### take care '/home'和'/home/recommend'相关判断
#### axios请求404，多半是跨域拼接的请求地址不对，pathRewrite没设置
