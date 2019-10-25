import Vue from "vue";
import Router from "vue-router";
import Home from "./Home.vue";
import Classify from "./Classify.vue";
import Share from "./Share.vue";
import User from "./User.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      meta: { title: "积分惠民商城"},
      component: Home
    },
    {
      path: "/classify",
      name: "classify",
      meta: { title: "分类列表" },
      component: Classify
    },
    {
      path: "/share",
      name: "share",
      meta: { title: "邀请有奖" },
      component: Share
    },
    {
      path: "/user",
      name: "user",
      component: User,
      meta: { requireAuth: true, title: "我的" }
    },
    {
      path: "/search",
      name: "search",
      meta: { title: "查询" },
      component: () => import("./page/Search.vue")
    },
    {
      path: "/address",
      name: "address",
      meta: { title: "地址管理" },
      component: () => import("./page/Address.vue")
    },
    {
      path: "/editAddress",
      name: "editAddress",
      meta: { title: "编辑地址" },
      component: () => import("./page/EditAddress.vue")
    },
    {
      path: "/free",
      name: "free",
      meta: { title: "助力免单" },
      component: () => import("./page/HelpFree.vue")
    },
    {
      path: "/order",
      name: "order",
      component: () => import("./page/CommitOrder.vue")
    },
    {
      path: "/paySuccess",
      name: "paySuccess",
      meta: { title: "支付成功" },
      component: () => import("./page/PaySuccess.vue")
    },
    {
      path: "/orderList",
      name: "orderList",
      meta: { title: "订单列表", keepAlive:true },
      component: () => import("./page/OrderList.vue")
    },
    {
      path: "/orderDetail",
      name: "orderDetail",
      component: () => import("./page/OrderDetail.vue")
    },
    {
      path: "/pointsDetail",
      name: "pointsDetail",
      meta: { title: "订单详情" },
      component: () => import("./page/PointsDetails.vue")
    },
    {
      path: "/goodsList",
      name: "goodsList",
      meta: { keepAlive:true },
      component: () => import("./page/GoodsList.vue")
    },
    {
      path: "/goodsDetail",
      name: "goodsDetail",
      meta: { requireAuth: true,  title: "商品详情" },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./page/GoodsDetail.vue")
    }
  ]
});
