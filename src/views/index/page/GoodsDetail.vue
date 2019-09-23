<template>
  <div class="goodsDetail">
    <van-nav-bar left-arrow @click-left="onClickLeft"> </van-nav-bar>
    <div class="swipeBlock">
      <van-swipe :autoplay="8000" class="swipe">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image v-lazy="image" @load="imgLoad" :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="goodsContent">
      <div class="title">【现场兑换】智能扫地机器人 大红色</div>
      <div class="sub_title">
        <span>当前积分：0</span>
        <span>剩余库存：397</span>
      </div>
      <div class="title payWay">支付方式</div>
      <ul class="sub_title">
        <li
          v-for="t in types"
          :key="t.id"
          :class="{ activePay: activeNum == t.type }"
          @click="activeNum = t.type"
        >
          {{ t.title }}
        </li>
      </ul>
      <div class="num">
        <div class="title">数量</div>
        <van-stepper v-model="num" />
      </div>
      <div class="detailContent">
        <div class="title">商品详情</div>
        <div class="content">
          本款智能扫地机器人为一款智能扫地机器人，适合家居使
          用，又称自动打扫机、智能吸尘、机器人吸尘器等，是智
          能家用电器的一种，能凭借一定的人工智能，自动在房间
          内完成地板清理工作。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "goodsDetail",
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      activeNum: 1,
      num: 1,
      types: [
        {
          title: "150积分",
          type: 1
        },
        {
          title: "99元",
          type: 2
        },
        {
          title: "50积分+70元",
          type: 3
        }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    imgLoad(e) {
      let height = e.target.clientHeight || e.target.height;
      if (height > this.swipeHeight) {
        this.swipeHeight = height;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.goodsDetail {
  /deep/ .van-nav-bar {
    position: fixed;
    background-color: transparent;
  }
  .swipeBlock {
    /deep/ .van-swipe__indicator--active {
      width: 1rem;
      border-radius: 1rem;
      background-color: #f23d3d;
    }
  }
  .goodsContent {
    background: #fff;
    box-shadow: 0rem -0.5rem 1rem 0rem rgba(4, 0, 0, 0.04);
    border-radius: 2rem 2rem 0 0;
    margin-top: 1rem;
    padding: 1rem;
    .title {
      color: #333;
      font-size: 1.2rem;
      font-weight: 600;
      padding: 0.6rem 0;
    }
    .sub_title {
      padding: 0 0.6rem;
      display: flex;
      align-items: center;
      span {
        color: #858585;
        font-size: 0.9rem;
        padding-right: 1rem;
        font-weight: 400;
      }
      li {
        min-width: 5rem;
        border-radius: 1rem;
        text-align: center;
        display: flex;
        align-items: center;
        color: #333;
        background-color: #efefef;
        justify-content: center;
        margin-right: 1rem;
        padding: 0.3rem 1rem;
        box-sizing: border-box;
      }
      .activePay {
        color: #f23d3d;
        background-color: #f2c1c1;
        border: 1px solid #f23d3d;
      }
    }
    .payWay {
      font-weight: 500;
      padding: 0.6rem;
    }
    .num {
      padding: 2rem 0.6rem;
      display: flex;
      align-items: center;
      .title {
        flex: 1;
      }
    }
    .detailContent {
      padding: 0 0.6rem 1rem 0.6rem;
      .content {
        color: #858585;
      }
    }
  }
}
</style>
