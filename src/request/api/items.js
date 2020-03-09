import _ from "lodash";

export default (() => {
  const base = location.origin + "/mall/items/";
  const urls = {
    list: "list"
  };
  return _.transform(
    urls,
    (r, v, k) => {
      r[k] = base + v;
    },
    {}
  );
})();
