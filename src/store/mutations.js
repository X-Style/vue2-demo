import * as types from './mutation-types'

const mutations = {
  [types.SET_DELETE_COUNT](state) {
    state.deleteCount += 1
  }
}

export default mutations
