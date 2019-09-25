import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginInfo: {
      openId: "" //正式环境制空
      // openId:'1',//测试环境
      // id:2//测试环境
    }
  },
  getters: {},
  mutations: {
    setLoginInfo(state, playload) {
      state.loginInfo = { ...state.loginInfo, ...playload };
    }
  },
  actions: {}
});
