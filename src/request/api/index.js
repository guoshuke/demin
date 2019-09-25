import user from "./user";
import items from "./items";
import _ from "lodash";

const target = (function() {
  const base = "index/";
  const urls = {
    goodsDetail: "goods/"
  };
  return _.transform(
    urls,
    (r, v, k) => {
      r[k] = base + v;
    },
    {}
  );
})();

Object.assign(target, user, items);

export default target;

// export const apiAddress = p => instance.post('api/v1/users/my_address/address_edit_before', p);
