import Vue from 'vue'
import Router from 'vue-router'
import articles from '@/components/common/articles'
import followArticle from '@/components/common/followArticle'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: 'home',
      component: articles
    },
    //根目录不应该有query param
    {
      path: '/home',
      component: articles,
    },
    {
      path: '/home/recommend',
      component: articles
    },
    {
      path: '/home/follow',
      component: followArticle
    }
  ]
})
