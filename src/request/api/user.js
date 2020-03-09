import _ from "lodash";

export default (() => {
  const base = location.origin + "/mall/user/";
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
