<template>
  <div class="paySuccess">
    <van-nav-bar title="兑换成功" left-arrow @click-left="$router.back(-2)" />
    <div class="icon">
      <van-image src="./user/success.png"></van-image>
      <span>兑换成功</span>
    </div>
    <div class="title">
      兑换成功 我们的工作人员将会在七个工作日内将货物发出请耐心等待
    </div>
    <div class="funcBar">
      <van-button type="default" class="share">邀请好友赚积分</van-button>
      <van-button type="danger" class="goOrderDetail" @click="goOrderDetail"
        >查看订单</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PaySuccess",
  methods: {
    goOrderDetail() {
      let orderId = this.$route.query.orderId;
      this.$router.push("orderDetail?orderId=" + orderId);
    }
  }
};
</script>

<style scoped lang="less">
.paySuccess {
  .icon {
    height: 21rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .van-image {
      height: 8rem;
      width: 8rem;
    }
    span {
      color: #333;
      font-size: 1.6rem;
      font-weight: 500;
      margin-top: 1.2rem;
    }
  }
  .title {
    font-size: 1.1rem;
    color: #333;
    font-weight: 400;
    padding: 1rem;
    padding-bottom: 5rem;
  }
  .funcBar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    button {
      width: 10rem;
    }
  }
}
</style>
