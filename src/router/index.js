import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/page/home'
import boiling from '@/components/page/boilingPoint'
import articles from '@/components/articles/articles'
import followArticles from '@/components/followArticles/followArticles'
import boilingArticle from '@/components/boilingArticles/boilingArticles'
import followBoiling from '@/components/followBoiling/followBoiling'

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
          component: followArticles
        }, {
          path: ':path',
          component: articles
        },
      ]
    }, {
      path: '/boiling',
      component: boiling,
      children:[{
        path:'',
        redirect:'recommend',
      },{
        path:'follow',
        component:followBoiling
      },{
        path:':id',
        component:boilingArticle
      }]
    }
  ]
})
