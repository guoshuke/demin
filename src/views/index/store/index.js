import Vue from "vue";
import Vuex from "vuex";
import wx from "weixin-js-sdk";
import { request, api } from "@/request";
import common from "@/utils/request";

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
    signature: null,
    hasPhone:false
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
      let f = new FormData();
      f.append("url", window.location.href);
      // debugger
      // f.append("url", 'http://development.chinatxyj.com/#/');
      if (!state.signature) {
        request
          .post(api.getSignature, f)
          .then(res => {
            res = res.data.data
            state.signature = res;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.appId, // 必填，公众号的唯一标识
              timestamp: res.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.noncestr, // 必填，生成签名的随机串
              signature: res.sign, // 必填，签名
              jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"] // 必填，需要使用的JS接口列表
            });
            this.commit("share", data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.commit("share", data);
      }
    },
    share(state, sendData) {
      wx.ready(function() {
        sendData = sendData || { goodsInfo: {}, pathInfo: {} };
        let openId =
            JSON.parse(localStorage.getItem("loginInfo")).openId || "";

        let url = common.host + "/#/" + (sendData.pathInfo.path || "") + "?openId=" + openId;
        if (sendData.pathInfo.data) {
          url = url +  sendData.pathInfo.data;
        }
        console.log("分享的链接是---------",url)

        wx.onMenuShareAppMessage({
          title: sendData.goodsInfo.goodsName || "邀请好友得1000积分", // 分享标题
          desc: "这是得民官方为回馈用户提供的福利，人人都能领积分~~", // 分享描述
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: sendData.goodsInfo.goodsSmallUrl || window.location.origin + "/home/logo.jpg", // 分享图标
          success: function(res) {
          alert("分享成功");
            // 设置成功
            // alert(res);
          },
          cancel(err) {
            alert("分享取消");
          },
          fail(fail) {
            alert(JSON.stringify(fail));
            alert("分享失败");
          },
          complete(data) {}
        });
      });
    },
    bindFather(state) {
      let f = new FormData();
      let pOpenId = localStorage.getItem("pOpenId");
      let openId = JSON.parse(localStorage.getItem("loginInfo")).openId
      if (pOpenId !=  openId && pOpenId) {
        // 不是本人发起的  才能绑定父子级关系    //pOpenId 存在才可以发起
        f.append("openId", pOpenId);
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
  actions: {
    getPhoneNumber(state, cb) {
      // cb && cb()
      request
          .get(api.hasPhone)
          .then(res => {
            console.log(res);
            if (res.data.code != "200") {
              location.href = "http://weixin.chinatxyj.com/menu/login.jsp"
            }else {
              cb && cb()
            }
          })
          .catch(err => {
            console.log(err);
          });
    }
  }
});
