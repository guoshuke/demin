<template>
  <div class="loading">
    <van-image src="http://weixin.chinatxyj.com/menu/images/loading.gif" />
  </div>
</template>

<script>
export default {
  name: "LOADING",
  data() {
    return {};
  }
};
</script>
<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2111;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading .van-image {
}
</style>
