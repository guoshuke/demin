<template>
  <div class="orderStatus">
    <div
      class="public"
      :class="{ unpaid: brief.orderStatus == 0 }"
      @click="goOrderDetail(brief)"
    >
      <van-card :thumb="brief.imageUrl" class="goodsInfo">
        <div slot="title" class="goodsTitle">
          <span class="goodsTitleText">{{
            brief.payType ? "现金支付" : "积分兑换"
          }}</span>
        </div>
        <div slot="desc" class="goodsTitle">
          <span class="goodsTitleText descText">{{ brief.goodsName }}</span>
        </div>

        <div
          slot="price"
          class="price"
          @click="toPay(brief)"
          v-if="
            brief.orderStatus == 0 ||
              brief.orderStatus == 1 ||
              brief.orderStatus == 2
          "
        >
          {{ status[brief.orderStatus] }}
        </div>
        <div slot="num" class="time">
          {{ brief.createTime }}
        </div>
      </van-card>
      <div
        class="stamp"
        v-if="brief.orderStatus == 3 || brief.orderStatus == 4"
      >
        <van-image
          :src="
            brief.orderStatus == 3
              ? './user/finish_stamp.png'
              : './user/cancel_stamp.png'
          "
          width="5rem"
          height="5rem"
        ></van-image>
      </div>
      <div class="logistics" v-if="brief.orderStatus == 2">
        <div class="logistics_title">物流信息</div>
        <div class="logistics_company">快递公司：{{ brief.expressName }}</div>
        <div class="logistics_order">
          <div class="logistics_order_number">
            快递单号：{{ brief.expressNumber }}
          </div>
          <span @click.stop="doCopy(brief.expressNumber)" class="copy">
            复制
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["brief"],
  name: "OrderStatus",
  data() {
    return {
      status: {
        0: "未付款",
        5: "待发货",
        2: "已发货",
        3: "已完成",
        4: "已取消"
      }
    };
  },
  methods: {
    toPay(brief) {
      if (brief.orderStatus == 0) {
        // alert("支付");
        // return;
      }
    },
    goOrderDetail(brief) {
      this.$router.push("orderDetail?orderId=" + brief.orderId);
    },
    doCopy(text) {
      let me = this;
      this.$copyText(text).then(
        function(e) {
          me.$toast("复制成功");
        },
        function(e) {
          me.$toast("复制失败");
        }
      );
    },
      stopBubble(e){
        e.cancelBubble = true;
        e.preventDefault && e.preventDefault();
      }
  }
};
</script>

<style scoped lang="less">
.orderStatus {
  .public {
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
    .stamp {
      position: absolute;
      right: 6px;
      top: 1rem;
      z-index: 1000;
    }
  }
  & > div {
    margin: 1rem;
    .goodsInfo {
      background-color: #fff;
      height: 8rem;
      /deep/ .van-card__content {
        justify-content: space-around;
      }

      /deep/ .van-card__price {
        color: #333;
        font-size: 1.1rem;
        float: right;
      }

      /deep/ .van-card__num {
        float: left;
        color: #858585;
        font-size: 1rem;
      }
      .goodsTitle {
        /*margin-bottom: 1rem;*/
      }
      .goodsTitleText {
        font-weight: 500;
        color: #333;
        font-size: 1.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .descText {
        font-size: 1rem;
      }
    }
  }
  .unpaid {
    .price {
      color: #f23d3d;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        height: 2px;
        width: 100%;
        bottom: -3px;
        left: 0;
        background-color: #f23d3d;
      }
    }
  }
  .logistics {
    display: flex;
    height: 6rem;
    flex-direction: column;
    justify-content: space-around;
    background-color: #fff;
    position: relative;
    padding: 0.5rem 0;
    &::before {
      content: "";
      position: absolute;
      height: 1px;
      top: 0;
      left: 16px;
      background-color: #efefef;
      width: calc(100% - 32px);
    }
    & > div {
      padding: 0px 16px;
    }
    .logistics_title {
      color: #333;
      font-size: 1rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 8px;
        top: 0;
        height: 100%;
        width: 2px;
        background-color: #f23d3d;
      }
    }
    .logistics_company,
    .logistics_order {
      color: #858585;
      font-weight: 400;
      font-size: 0.9rem;
    }
    .logistics_order {
      display: flex;
      align-items: center;
      padding-bottom: 0.5rem;
      .logistics_order_number {
        flex: 1;
      }
      .copy {
        color: #f23d3d;
      }
    }
  }
}
</style>
