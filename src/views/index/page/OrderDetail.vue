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
    <div class="footer">
      <van-button class="cancel" @click="show = true">取消订单</van-button>
      <van-button class="toPay">立即支付</van-button>
    </div>
    <van-popup v-model="show" class="dialog">
      <div class="dialog_box">
        <div class="dialog_title">取消订单</div>
        <div class="dialog_content">确定要取消订单吗</div>
        <div class="dialog_footer footer">
          <van-button class="cancel" @click="deleteOrder">确定</van-button>
          <van-button class="toPay" @click="show = false">取消</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { request, api } from "@/request";
import _ from "lodash";
import utils from "@/utils";
export default {
  name: "OrderDetail",
  data() {
    return {
      show: false,
      detail: {}
    };
  },
  methods: {
    deleteOrder() {
      this.$toast("删除提示  然后返回到列表页面并刷新");
    },
    getOrderDetail() {
      const me = this;
      let orderId = this.$route.query.orderId;
      if (!orderId) {
        return;
      }
      request
        .get(api.orderDetail + orderId)
        .then(res => {
          if (res.data.code == "200") {
            // 因为组件要他们的格式  所以转换一次
            console.log(res);
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    }
  },

  activated() {
    this.getOrderDetail();
  }
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
  .footer {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background-color: #efefef;
    button {
      width: 7rem;
      height: 2.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.1rem;
      border-radius: 1.2rem;
      margin-right: 1rem;
      line-height: 2.6rem;
    }
    .cancel {
      border: 1px solid #333;
    }
    .toPay {
      color: #fff;
      background: linear-gradient(
        263deg,
        rgba(242, 61, 61, 1),
        rgba(233, 107, 79, 1)
      );
    }
  }
  .dialog {
    width: 19rem;
    border-radius: 1rem;
    overflow: hidden;
    .dialog_title {
      margin-top: 2rem;
      color: #f23d3d;
      font-size: 1.2rem;
      font-weight: 500;
      text-align: center;
    }
    .dialog_content {
      padding: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 1rem;
    }
    .dialog_footer {
      position: relative;
      width: 100%;
      background-color: #fff;
      justify-content: space-evenly;
      margin-bottom: 1.2rem;
      button {
        margin-right: 0;
      }
    }
  }
}
</style>
