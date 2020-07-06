import _ from "lodash";

export default (() => {
  const base = location.origin + "/mall/";
  const urls = {
    pointRules: "integralDescription/list",
    pointsDetails: "integralDetail/list",
    oauth: "oauth/redirect/url",
    point: "UserAccount",
    bindFather: "set/distribution",
    HelperGoods: "Helper/add/",
    HelperList: "Helper/getHelperList",
    updateHelperStatus: "Helper/updateStatu/",
    reHelper:'Helper/newAdd/',
    // getlogistics:'logistics/getlogistics/', //后面接 选择的区域code 和商品的id
    getlogistics:'pay/getPriceByProvinceId/', //后面接 商品id 和省code
};
  return _.transform(
    urls,
    (r, v, k) => {
      r[k] = base + v;
    },
    {}
  );
})();
