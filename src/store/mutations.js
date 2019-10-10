import {CHANGE_CATEGORIES} from './mutation-types'

export default {
  [CHANGE_CATEGORIES](state, id) {
    state.categoryId = id
  }
}
