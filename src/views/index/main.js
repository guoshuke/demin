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
import common from "../../utils/request";
import { request, api } from "@/request";

Vue.use(VueLazyload);

Vue.use(Vant);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  console.log("router", to, from, next);
  // 微信公众号appid-开发-基本配置中获取
  const appId = "wx50dd97a40ea2adf9";
  // 获取code后再次跳转路径 window.location.href；例：www.baido.com/#/Home
  const toPath = common.host;
  // 核心步骤，获取code
  const hrefUrl =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    appId +
    "&redirect_uri=" +
    encodeURIComponent(toPath) +
    "&response_type=code&scope=snsapi_userinfo&state=dcabe11a-751f-490f-9dcc-606881c6fcdb#wechat_redirect";
  //从地址栏获取code
  const code = common.getQueryString("code");
  console.log(code);
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  /* 判断该路由是否需要登录权限 */
  if (to.matched.some(record => record.meta.requireAuth)) {
    let t = JSON.parse(localStorage.getItem("loginInfo"));
    let openId = _.isObject(t) ? t.openId : "";
    alert("openId:------" + openId);
    if (openId) {
      console.log("openId: " + store.state.loginInfo.openId);
      // isLogin(); //是否登录 正式环境
      next(); //test环境
    } else {
      //openId不存在
      if (code) {
        alert("code:------" + code);
        //根据code获取openId
        request.post(api.oauth, { code }).then(function(res) {
          console.log("getOpenId:" + res);
          if (res && res.status == 200) {
            if (res.data.data) {
              res.data.data.openId = res.data.data.openid;
              store.commit("setLoginInfo", res.data.data);
              next();
            } else {
              alert(JSON.stringify(res.data.data || {}));
            }
            //commit同步，dispatch 异步

            // isLogin(); //是否登录
          } else {
            console.log("请求失败");
            // Vue.$toast(res.data ? res.data.message : "请求失败！");
          }
        });
      } else {
        //获取code
        debugger;
        window.location.replace(hrefUrl);
      }
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
