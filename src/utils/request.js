import axios from "axios";
import Url from "./api";

class Setting extends Url {
  constructor() {
    super();
    // this.host = "http://development.chinatxyj.com"; // 测试环境  old
    // this.appId = "wx50dd97a40ea2adf9"; // 测试环境 old

    // this.host = "http://jf.chinatxyj.com"; // 线上环境  //授权所需域名  old
    // this.appId = "wxfc44234f195910e9"; // 线上环境  //授权所需域名   old

    console.log(process.env.NODE_ENV);
    this.host = process.env.NODE_ENV === 'production' ? "http://share.chinatxyj.com/jf_mall" : "http://development.chinatxyj.com/jf_mall/"
    this.appId = process.env.NODE_ENV === 'production'? "wxfc44234f195910e9" : "wx50dd97a40ea2adf9"

    // this.host = "http://development.chinatxyj.com/jf_mall/"; // 测试环境
    // this.appId = "wx50dd97a40ea2adf9"; // 测试环境

      // this.host = "http://share.chinatxyj.com/jf_mall"; // 线上环境  //授权所需域名
      // this.appId = "wxfc44234f195910e9"; // 线上环境  //授权所需域名

    // host: '127.1.1.1:8080',   // 本地环境
  }
  getQueryString = name => {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.href
        ) || [, ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  };
}
export default new Setting();
