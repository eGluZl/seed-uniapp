export default {
  namespaced: true,
  state: {
    userInfo: null
  },
  mutations: {
    SAVE_USER_INFO(state, payload) {
      state.userInfo = payload
    }
  }
}
