import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import VueLazyload from "vue-lazyload";
import VueClipboard from "vue-clipboard2";

VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);

import "vant/lib/index.css";
import common from "@/utils/request";
import { request, api } from "@/request";
debugger;
Vue.use(VueLazyload);

Vue.use(Vant);
Vue.config.productionTip = false;

store.commit("toShare");

router.beforeEach((to, from, next) => {
  console.log("router", to, from, next);
  // 微信公众号appid-开发-基本配置中获取
  const appId = common.appId;
  // 获取code后再次跳转路径 window.location.href；例：www.baido.com/#/Home
  const toPath = common.host + "/#" + to.path;
  // 核心步骤，获取code
  let needAuth = to.matched.some(record => record.meta.requireAuth);
  // let base_code = needAuth ? "snsapi_userinfo" : "snsapi_base";
  // 多次获取code  会触发48001
  let base_code = "snsapi_userinfo";
  const hrefUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
    toPath
  )}&response_type=code&scope=${base_code}&state=dcabe11a-751f-490f-9dcc-606881c6fcdb#wechat_redirect`;

  //从地址栏获取code
  const code = common.getQueryString("code");

  const pOpenId = common.getQueryString("openId");
  let path = localStorage.getItem("path");
  // path 只会记录一次
  if (!path) {
    path = location.href;
    localStorage.setItem("path", path);
  }

  const powerSurfaceId = common.getQueryString("powerSurfaceId");
  const goodsId = common.getQueryString("goodsId");

  console.log("pOpenId" + pOpenId);
  if (powerSurfaceId) {
    localStorage.setItem("powerSurfaceId", powerSurfaceId);
  }
  if (goodsId) {
    localStorage.setItem("goodsId", goodsId);
  }
  if (pOpenId) {
    localStorage.setItem("pOpenId", pOpenId);
  }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 如果链接里有code  那就是获取授权进来的  重定向
  if (code) {
    getToken({ code, toPath });
  } else {
    let t = JSON.parse(localStorage.getItem("loginInfo"));
    let loginInfo = _.isObject(t) ? t : {};

    if ((needAuth && !loginInfo.nickname) || !loginInfo.openId) {
      // 没有授权
      window.location.replace(hrefUrl);
    } else {
      next();
    }
  }

  /* 判断该路由是否需要登录权限 */
});

function getToken(data) {
  // next   code
  let sendData = { code: data.code };
  let powerSurfaceId = localStorage.getItem("powerSurfaceId");
  let pOpenId = localStorage.getItem("pOpenId");
  if (powerSurfaceId) {
    sendData.powerSurfaceId = powerSurfaceId;
  }
  if (pOpenId) {
    sendData.openId = pOpenId;
  }
  // 先清除 openId
  localStorage.removeItem("loginInfo");
  // 获取openId
  request.post(api.oauth, sendData).then(function(res) {
    if (res && res.status == 200) {
      if (res.data.data) {
        res.data.data.openid = res.data.data.openid + "_demin";
        res.data.data.openId = res.data.data.openid;
        store.commit("setLoginInfo", res.data.data);
        window.location.replace(localStorage.getItem("path"));
      } else {
        alert(res.data.message);
      }
      //commit同步，dispatch 异步

      // isLogin(); //是否登录
    } else {
      alert("网络链接有误");
      // Vue.$toast(res.data ? res.data.message : "请求失败！");
    }
  });
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
