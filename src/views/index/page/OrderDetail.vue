<template>
  <div class="orderDetail">
    <div class="content">
      <div class="payStatusBar">
        <div class="payStatus">
          {{ status[detail.orderStatus] }}
        </div>
        <div class="payMoney">
          实际支付：<span>{{detail.payType == 0 ? (detail.goodsIntegral - detail.platformIntegral / 10) + "积分" : "￥ " + (detail.price) }}</span>
        </div>
      </div>
      <div class="address">
        <div class="address_icon"><span class="iconfont icon-dizhi"  /></div>
        <div class="address_info">
          <div class="address_info_title">
            <span>收货人：{{ detail.userName }}</span>
            {{ detail.phone }}
          </div>
          <div class="address_info_detail">
            {{ detail.address }}
          </div>
        </div>
      </div>
      <van-card :num="detail.buyNumber" :thumb="detail.imageUrl" class="goodsInfo">
        <div slot="title" class="goodsTitle">
          <span class="goodsTitleText">{{ detail.goodsName }}</span>
        </div>
        <div slot="price" class="price">{{detail.payType == 0 ? (detail.goodsIntegral / detail.buyNumber) + "积分" : "￥ " + (detail.price  / detail.buyNumber)}}</div>
      </van-card>
      <div class="myList payWay">
        <div class="listTitle">配送方式</div>
        <div class="listTitle_sub">快递费货到付款</div>
      </div>
      <div class="myList">
        <div class="listTitle">支付方式</div>
        <div class="listTitle_sub wePay">
          <van-image src="./user/wepay.png" alt="" /> {{detail.payType == 0 ? "积分支付" : "微信支付"}}
        </div>
        <!--      <van-icon name="arrow" class="listTitle_sub" />-->
      </div>
      <div class="myList">
        <div class="listTitle">商品金额</div>
        <div class="listTitle_sub">{{detail.payType == 0 ? (detail.goodsIntegral) + "积分" : "￥ " + (detail.price || 0)}}</div>
        <!--      <van-icon name="arrow" class="listTitle_sub" />-->
      </div>
            <div class="myList">
              <div class="listTitle">平台积分立减</div>
              <div class="listTitle_sub red">{{detail.payType == 0 ? detail.platformIntegral ? (detail.platformIntegral + "积分抵扣" + (detail.platformIntegral / 10) + "商家积分") : "无抵扣" : "0积分"}}</div>
            </div>
            <div class="myList">
              <div class="listTitle">商家积分立减</div>
              <div class="listTitle_sub red">{{detail.payType == 0 ? detail.mallIntegral: "0"}}积分</div>
            </div>
      <div class="myList hasLine">
        <div class="listTitle">实际支付</div>
        <div class="listTitle_sub">{{ detail.payType == 0 ? detail.mallIntegral + "积分" : "￥ " + (detail.price || 0)}}</div>
      </div>
      <div class="orderInfo">
        <div class="myList">
          <div class="listTitle">订单编号</div>
          <div class="listTitle_sub">{{ detail.orderId }}</div>
        </div>
        <div class="myList">
          <div class="listTitle">创建时间</div>
          <div class="listTitle_sub">{{ detail.createTime }}</div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="detail.orderStatus == 0">
      <van-button class="cancel" @click="show = true">取消订单</van-button>
      <van-button class="toPay" @click="pay">立即支付</van-button>
    </div>
    <van-popup v-model="show" class="dialog">
      <div class="dialog_box">
        <div class="dialog_title">取消订单</div>
        <div class="dialog_content">确定要取消订单吗</div>
        <div class="dialog_footer footer">
          <van-button class="cancel" @click="cancelOrder">确定</van-button>
          <van-button class="toPay" @click="show = false">取消</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { request, api } from "@/request";
import wx from "weixin-js-sdk"
import _ from "lodash";
import utils from "@/utils";
export default {
  name: "OrderDetail",
  data() {
    return {
      show: false,
      detail: {
        address: "",
        createTime: "",
        goodsId: 0,
        goodsIntegral: 0,
        goodsName: "",
        id: 0,
        imageUrl: "",
        mallIntegral: 0,
        orderId: "",
        orderStatus: 0,
        payType: 0,
        phone: "",
        platformIntegral: 0,
        price: 0,
        storeId: "",
        updateTime: "",
        userId: 0,
        userName: ""
      },
      loading: false,
      status: {
        0: "待付款",
        1: "待发货",
        2: "已发货",
        3: "已完成",
        4: "已取消"
      }
    };
  },
  methods: {
    cancelOrder() {
      const me = this;
      let orderId = this.$route.query.orderId;
      if (!orderId) {
        this.$toast("获取订单信息失败");
        return;
      }
      request
        .post(api.cancelOrder, { orderId, orderStatus: 4, buyNumber: me.detail.buyNumber })
        .then(res => {
          if (res.data.code == "200") {
            // 因为组件要他们的格式  所以转换一次
            me.$toast("取消成功");
            me.$router.back(-1);
          } else {
            me.$toast(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    getOrderDetail() {
      const me = this;
      let orderId = this.$route.query.orderId;
      if (!orderId) {
        this.$toast("获取订单信息失败");
        return;
      }
      request
        .get(api.orderDetail + orderId)
        .then(res => {
          if (res.data.code == "200") {
            // 因为组件要他们的格式  所以转换一次
            me.detail = res.data.data;
            console.log(res);
          } else {
            me.$toast(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
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
    pay() {
        let me = this;
      let data = this.detail;
      let sendData = {
        orderId: data.orderId,
        goodsName: data.goodsName,
        goodsIntegral: data.goodsIntegral,
        payType: data.payType,
        platformIntegral: data.platformIntegral,
        mallIntegral: data.mallIntegral,
        price: data.price
      };
        if(!sendData.price){
            sendData.payType = 0;
        }
      this.loading = true;
      request
        .post(api.pay, sendData)
        .then(res => {
          console.log(res);
          let payConfig = res.data.data;

          payConfig.package = "prepay_id=" + payConfig.prepayId;
          payConfig.paySign = payConfig.sign;
          payConfig.nonceStr = payConfig.noncestr;
          payConfig.success = function(res) {
            console.log(res);
              me.$notify("支付成功");
              me.$router.push("paySuccess?orderId=" + me.detail.orderId);
          };
            payConfig.cancel = function(res) {
                me.$notify("取消支付");
            };
            // 支付失败回调函数
            payConfig.fail=function (res) {
                me.$notify('支付失败~')
            }
          console.log(payConfig);
            if(sendData.price)

          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: payConfig.appId, // 必填，公众号的唯一标识
            timestamp: payConfig.timestamp, // 必填，生成签名的时间戳
            nonceStr: payConfig.nonceStr, // 必填，生成签名的随机串
            signature: payConfig.signature, // 必填，签名，见附录1
            jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.chooseWXPay(payConfig);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });

      // me.$router.push("paySuccess?orderId=" + res.data.data);
    }
  },

  mounted() {
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
      text-align: center;
      .iconfont{
        font-size: 1.8rem;
      }
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
  .wePay {
    color: #333;
    font-size: 1rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    .van-image {
      width: 1.5rem;
      padding-right: 0.3rem;
    }
  }
}
</style>
