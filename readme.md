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
  param: {
    operationName: '',
    query: '',
    variables: {
      first: 20,
      after: '',
      order: 'POPULAR'
    },
    extensions: {
      query: {
        id: ''
      }
    }
  },
}
```
本项目跨域调用掘金的接口
请自行登录juejin.im, 获取调用接口所需的token值
