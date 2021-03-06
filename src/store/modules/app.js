import {_API_Login} from "@/apis";
import {SET_LOGGED, SET_LOGIN_FAIL, SET_TOKEN} from '@/store/mutation-types'
import G from '@/G'

export default {
  namespaced: true,
  state: {
    token: null,
    isLogin: false,
  },
  mutations: {
    SET_LOGGED(state) {
      state.isLogin = true
    },
    SET_LOGIN_FAIL(state) {
      state.isLogin = false
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    },
  },
  actions: {
    login({commit}, params) {
      return G.$request(_API_Login(params)).then(res => {
        const token = res.token ? res.token : ''
        if (token !== '') {
          commit(SET_TOKEN, token)
          commit(SET_LOGGED)
        } else {
          commit(SET_TOKEN, null)
          commit(SET_LOGIN_FAIL)
        }
      })
    },
  }
}
