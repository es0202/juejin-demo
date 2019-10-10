import {CHANGE_CATEGORIES} from './mutation-types.js'
export default {
  changeCategory({
    commit,
    state
  }, id) {
    commit(CHANGE_CATEGORIES, id)
  }
}
