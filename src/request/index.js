/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from "axios";
import router from "../views/index/router";
import store from "../views/index/store/index";
import Api from "./api";
import _ from "lodash";
import common from "@/utils/request";
import { Toast } from "vant";

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 1500,
    forbidClick: false
  });
};
export const api = Api;

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  const appId = common.appId;
  // 获取code后再次跳转路径 window.location.href；例：www.baido.com/#/Home
  const toPath = common.host;
  // 核心步骤，获取code
  // let base_code = needAuth ? "snsapi_userinfo" : "snsapi_base";
  // 多次获取code  会触发48001
  let base_code = "snsapi_userinfo";
  const hrefUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
    toPath
  )}&response_type=code&scope=${base_code}&state=0#wechat_redirect`;
  localStorage.removeItem("helpList")
  let path = location.href;
  localStorage.setItem("path", path);
  const pOpenId = common.getQueryString("openId");
  const powerSurfaceId = common.getQueryString("powerSurfaceId");
  const goodsId = common.getQueryString("goodsId");
  if (powerSurfaceId) {
    localStorage.setItem("powerSurfaceId", powerSurfaceId);
  }else {
    localStorage.removeItem("powerSurfaceId")
  }
  if (goodsId) {
    localStorage.setItem("goodsId", goodsId);
  }else {
    localStorage.removeItem("goodsId")
  }
  if (pOpenId) {
    localStorage.setItem("pOpenId", pOpenId);
  }else {
    localStorage.removeItem("pOpenId")
  }

  window.location.replace(hrefUrl);
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip("登录过期，请重新登录");
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip("请求的资源不存在");
      break;
    default:
    // console.log(other);
  }
};

// 创建axios实例
axios.defaults.withCredentials = true; // 代理 cookie不能直接代理  需要这个定义
export let request = axios.create({
  // timeout: 1000 * 12,
  withCredentials: true
});
// 设置post请求头
request.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
request.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    let obj = JSON.parse(localStorage.getItem("loginInfo"));
    console.log("获取到的用户信息是", obj);
    // openid 正确地 ocz_9s85KT-EWnDBUKXBe3AisXw0
    const token = _.isObject(obj) ? obj.openId : "";
    token && (config.headers.openId = token);
    // 有token  或者是请求授权的时候才能发起请求
    if (token || api.oauth === config.url) {
      return config;
    }
  },
  error => Promise.error(error)
);

// 响应拦截器
request.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      console.log("res =>>", res);
      let errorArr = ["600"];
      // 绑定父级  不需要提示
      let noTipArr = ["mall/set/distribution",]
      if (res.data.code != "200" && !noTipArr.includes(res.config.url) && res.config.url.indexOf("mall/Helper") < 0 ) {
        tip(res.data.message);
      }
      if (errorArr.includes(res.data.code)) {
        toLogin();
      } else {
        return Promise.resolve(res);
      }
    } else {
      return Promise.reject(res);
    }
  },
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        store.commit("changeNetwork", false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

// let JsonRequest = _.cloneDeep(request);
//
// // 设置post请求头
// JsonRequest.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

export default { request };
