import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "../index/store";
import Vant from "vant";
import VueLazyload from "vue-lazyload";

import "vant/lib/index.css";
import common from "@/utils/request";

Vue.use(VueLazyload);

Vue.use(Vant);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // 微信公众号appid-开发-基本配置中获取
  const appId = common.appId;
  // 获取code后再次跳转路径 window.location.href；例：www.baido.com/#/Home
  const toPath = common.host + "/#" + to.path;
  // 核心步骤，获取code
  const hrefUrl =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    appId +
    "&redirect_uri=" +
    encodeURIComponent(toPath) +
    "&response_type=code&scope=snsapi_base&state=dcabe11a-751f-490f-9dcc-606881c6fcdb#wechat_redirect";
  //从地址栏获取code
  const code = common.getQueryString("code");
  const isLogin = () => {
    //是否登录
    axios
      .post(common.api + "/wet/due/checkIsBind", {
        openId: store.state.loginInfo.openId
      })
      .then(function(res) {
        if (res.data && res.data.code == 200) {
          //已登录
          store.commit("setLoginInfo", { ...res.data.data }); //存登陆信息
          next();
        } else {
          //未登录
          next({
            path: "/Register"
          });
        }
      });
  };

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  /* 判断该路由是否需要登录权限 */
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.loginInfo.openId) {
      isLogin(); //是否登录 正式环境
      // next() //test环境
    } else {
      //openId不存在
      if (code) {
        //根据code获取openId
        axios
          .post(common.api + "/wet/chat/getOpenId", { code: code })
          .then(function(res) {
            if (res.data && res.data.code == 200) {
              //commit同步，dispatch 异步
              store.commit("setLoginInfo", { openId: res.data.data.openid });
              isLogin(); //是否登录
            } else {
              Toast(res.data ? res.data.message : "请求失败！");
            }
          });
      } else {
        //获取code
        window.location.replace(hrefUrl);
      }
    }
  } else {
    next();
  }
});

console.log("我执行了");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
