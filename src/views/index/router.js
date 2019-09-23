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
      path: "/search",
      name: "search",
      component: () => import("./page/Search.vue")
    },
    {
      path: "/goodsDetail",
      name: "goodsDetail",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./page/GoodsDetail.vue")
    }
  ]
});
