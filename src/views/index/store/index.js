import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginInfo: {
      openId: "" //正式环境制空
      // openId:'1',//测试环境
      // id:2//测试环境
    },
    browseHistory: [],
    searchHistory: []
  },
  getters: {},
  mutations: {
    setLoginInfo(state, playload) {
      console.log(playload);
      debugger;
      state.loginInfo = playload;
      localStorage.setItem("loginInfo", JSON.stringify(playload));
      debugger;
    },
    setBrowseHistory(state, goods) {
      state.browseHistory = _.filter(
        JSON.parse(localStorage.getItem("browseHistory")) || [],
        n => {
          return n.goodsId != goods.goodsId;
        }
      );
      state.browseHistory.unshift(goods);
      localStorage.setItem(
        "browseHistory",
        JSON.stringify(state.browseHistory)
      );
    }
  },
  actions: {}
});
