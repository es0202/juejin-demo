import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/page/home'
import boiling from '@/components/page/boilingPoint'
import articles from '@/components/common/articles'
import followArticle from '@/components/common/followArticle'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: 'home'
    },
    //根目录不应该有query param
    {
      path: '/home',
      component: home,
      children: [{
          path: '',
          component: articles
        },
        {
          //嵌套路由不能带 / ,仅路径名
          path: 'recommend',
          component: articles
        }, {
          path: 'follow',
          component: followArticle
        }, {
          path: ':path',
          component: articles
        },
      ]
    }, {
      path: '/boiling',
      component: boiling
    }
  ]
})
