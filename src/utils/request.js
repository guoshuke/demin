import axios from "axios";
import Url from "./api";

class Setting extends Url {
  constructor() {
    super();
    this.host = "192.168.1.243:8080"; // 测试环境  //授权所需域名
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
