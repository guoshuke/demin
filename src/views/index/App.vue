<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar
      v-model="active"
      active-color="#07c160"
      inactive-color="#000"
      v-show="showTabBar"
      class="tabBar"
      route
    >
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/classify" icon="search">
        分类
      </van-tabbar-item>
      <van-tabbar-item replace to="/share" icon="friends-o">
        邀请
      </van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="setting-o">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      active: 0,
      homePages: ["home", "classify", "share", "user"],
      showTabBar: false
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
}
</style>
