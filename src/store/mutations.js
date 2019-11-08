import {
  CHANGE_CATEGORIES,
  SAVE_USERINFO
} from './mutation-types'

export default {
  [CHANGE_CATEGORIES](state, id) {
    state.categoryId = id
  },
  [SAVE_USERINFO](state, userinfo) {
    state.userinfo = userinfo
    state.logined = true
  }
}
