<template>
  <div class="goodsDetail">
    <van-nav-bar left-arrow @click-left="onClickLeft"> </van-nav-bar>
    <div class="swipeBlock">
      <van-swipe :autoplay="8000" class="swipe">
        <van-swipe-item
          v-for="(image, index) in detail.goodsUrl.split(',')"
          :key="index"
        >
          <van-image v-lazy="image" @load="imgLoad" :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="goodsContent">
      <div class="title">
        {{ detail.goodsName }}
      </div>
      <div class="sub_title">
        <span>已兑换：{{ detail.goodsAmount - detail.goodsStock }}</span>
        <span>剩余库存：{{ detail.goodsStock }}</span>
      </div>
      <div class="title payWay">支付方式</div>
      <ul class="sub_title">
        <li
          :class="{ activePay: activeNum == 1 }"
          @click="toggleType(1)"
          v-if="detail.integral != 0"
        >
          {{ detail.integral + "积分" }}
        </li>
        <li
          :class="{ activePay: activeNum == 2 }"
          @click="toggleType(2)"
          v-if="detail.price != 0"
        >
          {{ detail.price + "元" }}
        </li>
        <li
          :class="{ activePay: activeNum == 3 }"
          @click="toggleType(3)"
          v-if="detail.mixedIntegral != 0"
        >
          {{ detail.mixedIntegral + "积分+" + detail.mixedPrice + "元" }}
        </li>
      </ul>
      <div class="num">
        <div class="title">数量</div>
        <van-stepper v-model="num" />
      </div>
      <div class="detailContent">
        <div class="title">商品详情</div>
        <div class="content">{{ detail.remark }}</div>
      </div>

      <van-button type="default" class="footer" to="order">立即兑换</van-button>
    </div>
  </div>
</template>
<script>
import { request, api } from "@/request";
export default {
  name: "goodsDetail",
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      detail: {
        goodsId: 0,
        goodsName: "",
        goodsSmallUrl: "",
        goodsUrl: "",
        goodsAmount: 0,
        goodsStock: 0,
        integral: 0,
        price: 0,
        mixedIntegral: 0,
        mixedPrice: 0,
        remark: "",
        integralTotal: 0
      },
      activeNum: 1,
      num: 1
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
    },
    toggleType(num) {
      this.activeNum = num;
      this.num = 1;
    }
  },
  activated() {
    let goodsId = 1;
    request
      .get(api.goodsDetail + goodsId)
      .then(res => {
        console.log(res.data);
        // todo 判断code
        // 假设成功
        let resData = {
          goodsId: 92598,
          goodsName: "【现场兑换】智能扫地机器人 大红色",
          goodsSmallUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          goodsUrl:
            "https://img.yzcdn.cn/vant/apple-1.jpg,https://img.yzcdn.cn/vant/apple-2.jpg",
          goodsAmount: 999,
          goodsStock: 365,
          integral: 150,
          price: 99,
          mixedIntegral: 50,
          mixedPrice: 70,
          remark:
            "本款智能扫地机器人为一款智能扫地机器人，适合家居使\n" +
            "          用，又称自动打扫机、智能吸尘、机器人吸尘器等，是智\n" +
            "          能家用电器的一种，能凭借一定的人工智能，自动在房间\n" +
            "          内完成地板清理工作。",
          integralTotal: 60
        };
        this.detail = resData;

        console.log(this.detail);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        // this.goGoodsDetail(3);
      });
  }
};
</script>
<style lang="less" scoped>
.goodsDetail {
  padding-bottom: 4rem;
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

  .footer {
    display: flex;
    position: fixed;
    height: 4rem;
    width: 100vw;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.2rem;
    background: linear-gradient(
      -87deg,
      rgba(242, 61, 61, 1),
      rgba(233, 90, 59, 1)
    );
  }
}
</style>
