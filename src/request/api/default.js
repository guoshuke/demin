import _ from "lodash";

export default (() => {
  const base = "/";
  const urls = {
    pointRules: "integralDescription/list",
    pointsDetails: "integralDetail/list"
  };
  return _.transform(
    urls,
    (r, v, k) => {
      r[k] = base + v;
    },
    {}
  );
})();
