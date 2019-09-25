<template>
  <div class="user">
    <div class="myRedeem">
      <div class="myList ">
        <div class="listTitle">我的兑换</div>
        <div class="listTitle_sub">查看更多</div>
        <van-icon name="arrow" class="listTitle_sub" />
      </div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item
          v-for="value in 3"
          :key="value"
          icon="photo-o"
          text="文字"
        />
      </van-grid>
    </div>

    <div class="myList">
      <div class="listTitle">推广大R合作</div>
      <div class="listTitle_sub">QQ:635857660</div>
    </div>
    <div class="myList" @click="$router.push(`address`)">
      <div class="listTitle">我的收货地址</div>
      <van-icon name="arrow" class="listTitle_sub" />
    </div>
    <div class="myList">
      <div class="listTitle">我的助力</div>
      <van-icon name="arrow" class="listTitle_sub" />
    </div>
    <div class="myList" @click="showList = true">
      <div class="listTitle">我的优惠券</div>
      <div class="listTitle_sub">2张可用</div>
      <van-icon name="arrow" class="listTitle_sub" />
    </div>
    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom" class="coupon">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
        :show-exchange-bar="false"
        close-button-text="返回"
      />
    </van-popup>
  </div>
</template>

<script>
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元"
};
export default {
  name: "User",
  data() {
    return {
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon]
    };
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    }
  }
};
</script>

<style scoped lang="less">
.user {
  background-color: #efefef;
  height: 100vh;
  .myRedeem {
    margin-bottom: 1.2rem;
    .myList {
      height: 2.5rem;
    }
  }
  .myList {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
    height: 3.5rem;
    padding: 0 2rem;
    background-color: #fff;
    .listTitle {
      flex: 1;
      font-size: 1.1rem;
      color: #333;
      font-weight: 400;
    }
    .listTitle_sub {
      color: #858585;
      font-size: 0.9rem;
    }
    /deep/ .van-icon {
      margin-left: 3px;
    }
  }
  .coupon {
    /deep/ .van-coupon-list {
      height: 100vh;
    }
  }
}
</style>
