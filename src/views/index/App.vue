<template>
  <div id="app">
<!--    <keep-alive include="user">-->
<!--     -->
<!--    </keep-alive>-->
    <keep-alive>
      <router-view class="box" v-if="$route.meta.keepAlive"></router-view>
      <!--这里是会被缓存的组件-->
    </keep-alive>
    <router-view class="box" v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar
      v-model="active"
      active-color="#F23D3D"
      inactive-color="#000"
      v-show="showTabBar"
      class="tabBar"
      route
    >
      <van-tabbar-item to="/" icon="home-o"
        >首页
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? './home/home.png' : './home/home_normal.png'"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/classify" icon="search">
        分类
        <img
          slot="icon"
          slot-scope="props"
          :src="
            props.active ? './home/classify.png' : './home/classify_normal.png'
          "
        />
      </van-tabbar-item>
      <van-tabbar-item to="/share" icon="friends-o">
        邀请
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? './home/share.png' : './home/share_normal.png'"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/user" icon="setting-o">
        我的
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? './home/user.png' : './home/user_normal.png'"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
    import common from "@/utils/request";
    import wx from "weixin-js-sdk"
export default {
  name: "App",
  data() {
    return {
      active: 0,
      homePages: ["home", "classify", "share", "user"],
      showTabBar: false,
      cachedViews: [""]
    };
  },
  watch: {
    "$route.name": function(newVal) {
          this.showTabBar = this.homePages.includes(newVal);
      }
  },
  mounted() {
    this.showTabBar = this.homePages.includes(this.$route.name);
  },
  created() {
      let loading = document.getElementById("loadingGif");
      loading && document.body.removeChild(loading);
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
#app .van-nav-bar .van-icon {
  color: #333;
}
.box {
  padding-bottom: 50px;
}
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  vertical-align: top;
  border: none;
}

.clearf:after,
.clearf:before {
  content: "";
  display: block;
  clear: both;
}
.tabBar {
  border-top: 1px solid #eeeeee;
  z-index: 12 !important;
}

/* 公共的样式先放在这 */
.red {
  color: #f23d3d;
}
.fs14 {
  font-size: 1rem;
}
</style>
