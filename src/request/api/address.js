import _ from "lodash";

export default (() => {
  const base = "http://share.chinatxyj.com/mall/address/";
  const urls = {
    addressList: "list",
    addAddress: "add",
    deleteAddress: "del/"
  };
  return _.transform(
    urls,
    (r, v, k) => {
      r[k] = base + v;
    },
    {}
  );
})();
