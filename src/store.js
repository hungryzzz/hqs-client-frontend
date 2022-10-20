/*
 * @Created on: 2022-09-29 00:14:39
 * @LastEditTime: 2022-10-20 22:35:07
 * @@Author: fduxuan
 * 
 * @@Desc: 
 * 
 */
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: ""
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setUser(state, user){
      state.user = user  // 用户名
    }
  },
  actions: {},
});