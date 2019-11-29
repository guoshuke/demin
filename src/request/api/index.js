import user from "./user";
import items from "./items";
import def from "./default";
import address from "./address";
import pay from "./pay";
import _ from "lodash";

const target = (function() {
  const base = "http://share.chinatxyj.com/mall/index/";
  const urls = {
    goodsDetail: "goods/",
    allList: "goods/list",
    myGoods: "myGoods",
    classifyList: "items/goods",
    getSignature: "getSignature",
    SyncIntegral: "SyncIntegral"
  };
  return _.transform(
    urls,
    (r, v, k) => {
      r[k] = base + v;
    },
    {}
  );
})();

Object.assign(target, user, items, def, address, pay);

export default target;

// export const apiAddress = p => instance.post('api/v1/users/my_address/address_edit_before', p);
