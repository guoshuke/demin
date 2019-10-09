import user from "./user";
import items from "./items";
import def from "./default";
import _ from "lodash";

const target = (function() {
  const base = "mall/index/";
  const urls = {
    goodsDetail: "goods/",
    allList: "goods/list",
    myGoods: "myGoods",
    classifyList: "items/goods"
  };
  return _.transform(
    urls,
    (r, v, k) => {
      r[k] = base + v;
    },
    {}
  );
})();

Object.assign(target, user, items, def);

export default target;

// export const apiAddress = p => instance.post('api/v1/users/my_address/address_edit_before', p);
