import Vue from "vue";
import Vuex from "vuex";
import wx from "weixin-js-sdk";
import { request, api } from "@/request";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginInfo: {
      openId: "" //正式环境制空
      // openId:'1',//测试环境
      // id:2//测试环境
    },
    browseHistory: [],
    searchHistory: [],
    signature: null
  },
  getters: {},
  mutations: {
    setLoginInfo(state, playload) {
      console.log(playload);
      state.loginInfo = playload;
      localStorage.setItem("loginInfo", JSON.stringify(playload));
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
    },
    toShare(state, data) {
      // 接收对象
      let me = this;
      let f = new FormData();
      f.append("url", window.location.href);
      if (!state.signature) {
        request
          .post(api.getSignature, f)
          .then(res => {
            state.signature = res.data.data;
            state.signature.sendData = data;
            this.commit("share", data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        state.signature.sendData = data;
        this.commit("share", state.signature);
      }
    },
    share(state, res) {
      let me = this;
      if (res) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.noncestr, // 必填，生成签名的随机串
          signature: res.sign, // 必填，签名
          jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"] // 必填，需要使用的JS接口列表
        });
        wx.ready(function() {
          console.log(wx);
          let sendData = res.sendData || { goodsInfo: {}, pathInfo: {} };
          let openId =
            JSON.parse(localStorage.getItem("loginInfo")).openId || "";

          let url = `http://development.chinatxyj.com/#/${
            sendData.pathInfo.path
          }?openId=${openId}`;
          if (sendData.pathInfo.data) {
            url += sendData.pathInfo.data;
          }

          wx.onMenuShareAppMessage({
            title: sendData.goodsInfo.goodsName || "积分送不停", // 分享标题
            desc: "这是得民官方为回馈用户提供的福利，人人都能领积分~~", // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: sendData.goodsInfo.goodsSmallUrl, // 分享图标
            success: function(res) {
              me.$toast("分享成功");
              // 设置成功
              // alert(res);
            },
            cancel(err) {
              me.$toast("分享取消");
            },
            fail(fail) {
              console.log(fail);
              me.$toast("分享失败");
            },
            complete(data) {}
          });
        });
      }
    },
    bindFather(state) {
      let me = this;
      let f = new FormData();
      let pOpenId = localStorage.getItem("pOpenId");
      if (pOpenId) {
        f.append("openId", window.location.href);
        localStorage.removeItem("pOpenId");
        request
          .post(api.bindFather, f)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  actions: {}
});
