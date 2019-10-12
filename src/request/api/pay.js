import _ from "lodash";

export default (() => {
  const base = "mall/pay/";
  const urls = {
    submitOrder: "order/insert",
    orderList: "exchange/list",
    orderDetail: "order/detail/",
    cancelOrder: "update/status",
    pay: "create"
  };
  return _.transform(
    urls,
    (r, v, k) => {
      r[k] = base + v;
    },
    {}
  );
})();
