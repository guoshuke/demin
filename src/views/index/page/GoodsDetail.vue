<template>
  <div class="goodsDetail">
    <Loading v-show="loading"></Loading>
    <van-nav-bar left-arrow fiexd @click-left="onClickLeft" class="goodsTitle">
    </van-nav-bar>
    <div class="swipeBlock">
      <van-swipe :autoplay="8000" class="swipe">
        <van-swipe-item
          v-for="(image, index) in detail.goodsUrl
            ? detail.goodsUrl.split(',')
            : []"
          :key="index"
        >
          <van-image
            v-lazy="image"
            class="goodsImg"
            @load="imgLoad"
            :src="image"
          />
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
          :class="{ activePay: activeNum == 0 }"
          @click="toggleType(0)"
          v-if="detail.integral != 0"
        >
          {{ detail.integral + "积分" }}
        </li>
        <li
          :class="{ activePay: activeNum == 1 }"
          @click="toggleType(1)"
          v-if="detail.price != 0"
        >
          {{ detail.price + "元" }}
        </li>
        <!--        <li-->
        <!--          :class="{ activePay: activeNum == 3 }"-->
        <!--          @click="toggleType(3)"-->
        <!--          v-if="detail.mixedIntegral != 0"-->
        <!--        >-->
        <!--          {{ detail.mixedIntegral + "积分+" + detail.mixedPrice + "元" }}-->
        <!--        </li>-->
      </ul>
      <div class="num">
        <div class="title">数量</div>
        <van-stepper v-model="num" />
      </div>
      <div class="detailContent">
        <div class="title">商品详情</div>
        <div class="content" v-html="detail.remark"></div>
      </div>

      <van-button
        type="default"
        class="footer"
        @click="goCommitOrder"
        v-if="activeNum || needPoints <= detail.integralTotal"
        >立即兑换
      </van-button>
      <van-button
        type="default"
        class="footer poorPoints"
        v-if="detail.integralTotal < needPoints && !activeNum"
        >积分不足</van-button
      >
    </div>
    <van-popup v-model="showList" position="bottom">
      <CommitOrder
        :detail="detail"
        :payType="activeNum"
        :num="num"
        ref="commitOrder"
        @closePopup="closePopup"
      />
    </van-popup>
  </div>
</template>
<script>
import { request, api } from "@/request";
import store from "../store";
import CommitOrder from "./CommitOrder";
import Loading from "@/components/Loading";
import _ from "lodash";
let back = -1;
export default {
  name: "goodsDetail",
  data() {
    return {
      showList: false,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      loading: false,
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
      activeNum: 0,
      num: 1
    };
  },
  beforeRouteEnter(to, form, next) {
    console.log(to, form);
    if (form.name == "search") {
      debugger;
      back = -2;
    } else {
      back = -1;
    }
    next();
  },
  methods: {
    onClickLeft() {
      debugger;
      history.go(back);
    },
    closePopup() {
      this.showList = false;
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
    },
    goCommitOrder() {
      // let goodsId = this.$route.query.goodsId;
      // let temp = {
      //   0: "integral",
      //   1: "price"
      // };
      // this.$router.push(
      //   `order?goodsId=${goodsId}&num=${this.num}&type=${this.activeNum}`
      // );
        let me = this
        store.dispatch("getPhoneNumber",function () {
            me.showList = true;
            me.$refs.commitOrder && me.$refs.commitOrder.getAddressList(); // 进去后重新获取一下地址
        })

    }
  },
  activated() {
    this.loading = true;
    let goodsId = this.$route.query.goodsId;
    const me = this;
    request
      .get(api.goodsDetail + goodsId)
      .then(res => {
        console.log(res.data);
        if (res.data.code != "200") {
          // todo delete
          if (res.data.code === "501") {
            localStorage.removeItem("loginInfo");
          }
        }
        // 假设成功
        me.detail = res.data.data;
        if (!me.detail.integral) {
          me.activeNum = 1;
        } else {
          me.activeNum = 0;
        }

        store.commit("setBrowseHistory", res.data.data);

        let sendData = {
          goodsInfo: {
              goodsName: me.detail.goodsName,
              goodsSmallUrl:me.detail.goodsSmallUrl
          },
          pathInfo: {
            path: "goodsDetail",
            data: "&goodsId=" + me.detail.goodsId
          }
        };
        store.commit("toShare", sendData);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        me.loading = false;
        // this.goGoodsDetail(3);
      });
  },
  deactivated() {
    this.detail = {};
  },
  computed: {
    needPoints() {
      return (
        (this.detail.integral || 0) * this.num -
        (this.detail.platformReductionIntegral || 0)
      );
    }
  },
  components: {
    CommitOrder,
    Loading
  },

};
</script>
<style lang="less" scoped>
.goodsDetail {
  padding-bottom: 4rem;
  .popup-title {
    width: 100%;
    background-color: #fff !important;
  }
  .goodsTitle {
    position: fixed;
    background-color: transparent;
  }
  .swipeBlock {
    /deep/ .van-swipe__indicator--active {
      width: 1rem;
      border-radius: 1rem;
      background-color: #f23d3d;
    }
    .goodsImg {
      width: 100%;
      min-height: 100vw;
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
      padding: 0 0 1rem 0rem;

      .content {
        color: #858585;
        /deep/ img {
          width: 100%;
        }
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
  .poorPoints {
    background: #efefef;
    color: #858585;
  }
}
</style>
