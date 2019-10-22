import axios from "axios";
import Url from "./api";

class Setting extends Url {
  constructor() {
    super();
    // this.host = "http://development.chinatxyj.com"; // 测试环境
      this.host = "http://jf.chinatxyj.com"; // 线上环境  //授权所需域名
      // this.appId = "wx50dd97a40ea2adf9"     // 测试环境
      this.appId = "wxfc44234f195910e9"     // 线上环境  //授权所需域名

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
