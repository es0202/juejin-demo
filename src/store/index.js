import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state={
  categoryId:null //区分 推荐标签的categoryId'' 设为null
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
