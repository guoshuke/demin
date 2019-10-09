import _ from "lodash";

export default (() => {
  const base = "mall/";
  const urls = {
    pointRules: "integralDescription/list",
    pointsDetails: "integralDetail/list",
    oauth: "oauth/redirect/url"
  };
  return _.transform(
    urls,
    (r, v, k) => {
      r[k] = base + v;
    },
    {}
  );
})();
