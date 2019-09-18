<template>
  <div class="home">
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item
        v-for="(image, index) in images"
        :key="index"
        @click="goGoodsDetail(index)"
      >
        <img v-lazy="image" @load="imgLoad" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { request, api } from "../request";
import _ from "lodash";
import { Toast } from "vant";

export default {
  name: "home",
  components: {},
  data() {
    return {
      swipeHeight: 0,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },
  methods: {
    goGoodsDetail(id) {
      // id 商品的id
      _.isNumber(id)
        ? this.$router.push(`goodsDetail?goodId=${id}`)
        : Toast("商品id未找到");
    },
    imgLoad(e) {
      let height = e.target.clientHeight || e.target.height;
      if (height > this.swipeHeight) {
        this.swipeHeight = height;
      }
    }
  },
  mounted() {
    // request
    //   .get(api.point)
    //   .then(res => {
    //     // console.log(res);
    //   })
    //   .catch(err => {
    //     /* console.log(err);*/
    //   })
    //   .finally(() => {
    //     // console.log("end");
    //     // this.goGoodsDetail(3);
    //   });
  }
};
</script>
<style>
.swipe img {
  width: 100vw;
}
</style>
