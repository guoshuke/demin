<template>
  <div class="orderStatus">
    <div
      class="public"
      :class="{ unpaid: brief.type === 0 }"
      @click="goOrderDetail(brief)"
    >
      <van-card thumb="https://img.yzcdn.cn/vant/t-thirt.jpg" class="goodsInfo">
        <div slot="title" class="goodsTitle">
          <span class="goodsTitleText">积分兑换</span>
        </div>
        <div slot="desc" class="goodsTitle">
          <span class="goodsTitleText descText">奥金湘核桃油100ml玻璃瓶装</span>
        </div>

        <div
          slot="price"
          class="price"
          @click="toPay(brief)"
          v-if="brief.type === 0 || brief.type === 1 || brief.type === 2"
        >
          {{ status[brief.type] }}
        </div>
        <div slot="num" class="time">
          2019-09-17 16:51:15
        </div>
      </van-card>
      <div class="stamp" v-if="brief.type === 3 || brief.type === 4">
        <van-image
          src="../user/finish_stamp.png"
          width="5rem"
          height="5rem"
        ></van-image>
      </div>
      <div class="logistics" v-if="brief.type === 2">
        <div class="logistics_title">物流信息</div>
        <div class="logistics_company">快递公司：中通快递</div>
        <div class="logistics_order">
          <div class="logistics_order_number">快递单号：7637 8375 8787 589</div>
          <div class="copy">复制</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { brief: { default: { type: null } } },
  name: "OrderStatus",
  data() {
    return {
      status: {
        0: "未付款",
        1: "未发货",
        2: "已发货",
        3: "已成功",
        4: "已取消"
      }
    };
  },
  methods: {
    toPay(brief) {
      if (brief.type == 0) {
        alert("支付");
      }
    },
    goOrderDetail(brief) {
      this.$router.push("orderDetail", { brief });
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
