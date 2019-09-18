import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Classify from "./views/Classify.vue";
import Share from "./views/Share.vue";
import User from "./views/User.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/classify",
      name: "classify",
      component: Classify
    },
    {
      path: "/share",
      name: "share",
      component: Share
    },
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/goodsDetail",
      name: "goodsDetail",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/GoodsDetail.vue")
    }
  ]
});
