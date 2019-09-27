import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/page/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    //根目录不应该有query
    {
      path:'/home',
      name:'home',
      component:home
    }
  ]
})
