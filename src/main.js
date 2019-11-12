// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lodash from 'lodash'
import store from './store/index'
import {Select,Button} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//按需引入
Vue.use(Select);
Vue.use(Button)
Vue.config.productionTip = false
Vue.prototype.lodash = lodash
//全局使用lodash 无需每个组件中Import

router.beforeEach((to, from, next) => {
  //全局钩子,每个路由都执行
  console.log('1')
  next()
})

/* eslint-disable no-new */
window.vm=new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
