<template>
  <div class="home">
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" @load="imgLoad"/>
      </van-swipe-item>
    </van-swipe>
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      swipeHeight:0,
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  methods: {
    imgLoad(e){
      let height = e.target.clientHeight || e.target.height
      console.log(height);
      if(height > this.swipeHeight) {
        this.swipeHeight = height;
      }
    }
  }
}
</script>
<style>
  .swipe img {
    width: 100vw;
  }
</style>
