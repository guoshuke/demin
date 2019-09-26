<template>
  <div class="orderDetail">
    <van-nav-bar title="订单详情" left-arrow @click-left="$router.back(-1)" />
    <div class="content">
      <div class="payStatusBar">
        <div class="payStatus">
          待支付
        </div>
        <div class="payMoney">实际支付：<span>￥99</span></div>
      </div>
      <div class="address">
        <div class="address_icon"></div>
        <div class="address_info">
          <div class="address_info_title">
            <span>收货人：张雪薇</span>
            158 xxxx 7258
          </div>
          <div class="address_info_detail">
            江苏省苏州市苏站路X号娄江新村1栋604
          </div>
        </div>
      </div>
      <van-card
        num="1"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
        class="goodsInfo"
      >
        <div slot="title" class="goodsTitle">
          <span class="goodsTitleText"
            >厨房厨具三件套 淡蓝色 不锈钢厨具锅具</span
          >
        </div>
        <div slot="price" class="price">
          150积分
        </div>
      </van-card>
      <div class="myList payWay">
        <div class="listTitle">配送方式</div>
        <div class="listTitle_sub">快递费货到付款</div>
      </div>
      <div class="myList">
        <div class="listTitle">支付方式</div>
        <div class="listTitle_sub">微信支付</div>
        <!--      <van-icon name="arrow" class="listTitle_sub" />-->
      </div>
      <div class="myList">
        <div class="listTitle">商品金额</div>
        <div class="listTitle_sub">150积分</div>
        <!--      <van-icon name="arrow" class="listTitle_sub" />-->
      </div>
      <div class="myList">
        <div class="listTitle">平台积分立减</div>
        <div class="listTitle_sub red">150积分</div>
      </div>
      <div class="myList">
        <div class="listTitle">商家积分立减</div>
        <div class="listTitle_sub red">-50积分</div>
      </div>
      <div class="myList hasLine">
        <div class="listTitle">实际支付</div>
        <div class="listTitle_sub">￥99</div>
      </div>
      <div class="orderInfo">
        <div class="myList">
          <div class="listTitle">订单编号</div>
          <div class="listTitle_sub">112532842374923903858</div>
        </div>
        <div class="myList">
          <div class="listTitle">创建时间</div>
          <div class="listTitle_sub">2019-09-08 11:12:09</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetail"
};
</script>

<style scoped lang="less">
.orderDetail {
  background-color: #efefef;
  .content {
    padding-bottom: 4rem;
  }
  .payStatusBar {
    background-color: #f23d3d;
    height: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    color: #fff;
    .payStatus {
      font-size: 1.2rem;
    }
    .payMoney {
      font-size: 0.9rem;
      span {
        font-size: 1.1rem;
      }
    }
  }
  .address {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1rem;
    height: 6rem;
    background-color: #fff;
    .address_icon {
      width: 4rem;
    }
    .address_info {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100%;
      color: #333333;
      font-size: 1.1rem;
      font-weight: 500;
      flex: 1;
      .address_info_title {
        display: flex;
        span {
          flex: 1;
        }
      }
      .address_info_detail {
        color: #858585;
        font-weight: normal;
        font-size: 1rem;
      }
    }
  }
  .goodsInfo {
    background-color: #fff;
    margin-top: 1rem;
    /deep/ .van-card__content {
      justify-content: center;
    }
    /deep/ .van-card__price {
      color: #f23d3d;
      font-size: 1.1rem;
      float: right;
    }
    /deep/ .van-card__num {
      float: left;
      padding-left: 1rem;
    }
    .goodsTitle {
      margin-bottom: 1rem;
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
  }
  .myList {
    display: flex;
    align-items: center;
    height: 3.5rem;
    padding: 0 1.5rem;
    background-color: #fff;
    .listTitle {
      flex: 1;
      font-size: 1.1rem;
      color: #333;
      font-weight: 400;
    }
    .listTitle_sub {
      color: #333;
      font-size: 1rem;
      font-weight: 400;
    }
    .red {
      color: #f23d3d;
    }
    /deep/ .van-icon {
      color: #f23d3d;
      margin-left: 3px;
    }
  }
  .hasLine {
    border-top: 1px solid #efefef;
    .listTitle {
      color: #858585;
    }
    .listTitle_sub {
      font-size: 1.1rem;
    }
  }
  .orderInfo {
    margin-top: 1rem;
    border-bottom: 1rem solid #efefef;
    .myList {
      height: 2rem;
      * {
        color: #858585;
      }
    }
  }
  .payWay {
    border-bottom: 1rem solid #efefef;
    border-top: 1rem solid #efefef;
    .listTitle_sub {
      color: #858585;
      font-size: 1.1rem;
    }
  }
}
</style>
