/*
 * @Created on: 2022-09-29 00:14:39
 * @@LastEditTime: 2022-09-29 00:22:36
 * @@Author: fduxuan
 * 
 * @@Desc: 
 * 
 */
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
  actions: {},
});