import _ from "lodash";

export default (() => {
  const base = "http://share.chinatxyj.com/mall/user/";
  const urls = {
    userInfo: "info"
  };
  return _.transform(
    urls,
    (r, v, k) => {
      r[k] = base + v;
    },
    {}
  );
})();
