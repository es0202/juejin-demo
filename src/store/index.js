import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  categoryId: null, //区分 推荐标签的categoryId'' 设为null
  logined: false, //默认未登录
  userinfo: {} //重新渲染容易清除登录状态
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
