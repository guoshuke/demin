<template>
  <div class="user">
    <div class="user_box">
      <van-image src="./user/bg.png"></van-image>
      <div class="user_info">
        <van-image
          round
          fit="cover"
          width="4.5rem"
          height="4.5rem"
          :src="loginInfo.headImg"
        />
        <span class="nick_name">{{ loginInfo.nickname + (pointInfo.userId ? "_" + pointInfo.userId : "") }}</span>
      </div>
      <div class="point">
        <div class="point_title">当前积分</div>
        <div class="point_num">{{ pointInfo.totalIntegral || 0 }}</div>
        <div>(含平台积分{{ pointInfo.platformIntegral || 0 }}分)</div>
        <div class="funcBar">
          <van-button type="default" size="small" @click="showPoint">
            积分明细
          </van-button>
          <van-button
            type="default"
            size="small"
            @click="pointRules_show = true"
          >
            积分规则
          </van-button>
        </div>
      </div>
    </div>
    <div class="myRedeem">
      <div class="myList" @click="$router.push(`orderList`)">
        <div class="listTitle">我的兑换</div>
        <div class="listTitle_sub">查看更多</div>
        <van-icon name="arrow" class="listTitle_sub" />
      </div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item
          v-for="(n, i) in redeemTypes"
          :key="i"
          @click="$router.push(`orderList?type= ${n.type}`)"
        >
          <van-image width="3rem" height="3rem" :src="n.url" />
          <span class="status">{{ n.status }}</span>
        </van-grid-item>
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
      <div class="listTitle">版本号</div>
      <div class="listTitle_sub">v2.0.0</div>
    </div>
    <!--    <div class="myList">-->
    <!--      <div class="listTitle">我的助力</div>-->
    <!--      <van-icon name="arrow" class="listTitle_sub" />-->
    <!--    </div>-->
    <!--    积分规则-->
    <van-popup
      v-model="pointRules_show"
      closeable
      position="bottom"
    >
      <van-nav-bar title="积分规则" @click-left="$router.back(-1)" />
      <div class="pointRules_pop">
        <!--        v-html="pointRules"-->
        <iframe
          width="100%"
          height="100%"
          src="http://weixin.chinatxyj.com/menu/integral_rule.html"
        ></iframe>
      </div>
    </van-popup>
    <!--    积分明细-->
    <van-popup
      v-model="showPointList"
      position="bottom"
      class="PointListPopup"
      :style="{ height: '100vh' }"
    >
      <van-nav-bar
        title="积分明细"
        left-arrow
        @click-left="showPointList = false"
      />
      <PointList
        class="PointList"
        ref="pointList"
        :pointInfo="pointInfo"
      ></PointList>
    </van-popup>
  </div>
</template>

<script>
import { request, api } from "@/request";
import PointList from "./page/PointsDetails";
import store from "./store"
export default {
  name: "User",
  data() {
    return {
      pointRules_show: false,
      showList: false,
      chosenCoupon: -1,
      redeemTypes: [
        {
          type: 1,
          url: "./user/waitPay.png",
          status: "未付款"
        },
        {
          type: 2,
          url: "./user/waitDelivery.png",
          status: "待发货"
        },
        {
          type: 4,
          url: "./user/finish.png",
          status: "已完成"
        }
        // 此type 不是订单的orderStatus
      ],
      pointRules: "",
      showAddress: false,
      showPointList: false,
      pointInfo: {},
      loginInfo: JSON.parse(localStorage.getItem("loginInfo"))
    };
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    showPoint() {
      this.$refs.pointList && this.$refs.pointList.openModal();
      this.showPointList = true;
    },
    getPoint() {
      let me = this;
      request
        .post(api.point)
        .then(res => {
          me.pointInfo = res.data.data;
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    const self = this;
    console.log(api);
    request
      .get(api.pointRules)
      .then(res => {
        console.log(res.data);
        self.pointRules = res.data.data.integralDescription;
      })
      .catch(err => {
        console.log(err);
      });
      this.getPoint();
      store.commit("toShare")
  },
  activated() {
  },
  components: {
    PointList
  }
};
</script>

<style scoped lang="less">
.user {
  background-color: #efefef;
  height: 100vh;
  .user_box {
    padding-bottom: 4rem;
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: 15.5rem;
    .user_info {
      position: absolute;
      left: 1rem;
      top: 1rem;
      width: 100%;
      display: flex;
      align-items: center;
      .nick_name {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 500;
        margin-left: 1rem;
      }
    }
    .point {
      background-color: #fff;
      height: 10.5rem;
      position: absolute;
      top: 8rem;
      left: 1rem;
      width: calc(100% - 2rem);
      border-radius: 1rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      & > div:last-child {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
      }
      .point_title {
        font-size: 1.2rem;
        color: #333;
      }

      .point_num {
        color: #f23d3d;
        font-size: 1.6rem;
        font-weight: 400;
      }
    }
    .funcBar {
      height: 3.5rem;
      button {
        width: 7rem;
        height: 2.6rem;
        font-size: 1.1rem;
        /*&:last-child {*/
        /*  background-color: #f23d3d;*/
        /*}*/
      }
    }
  }
  .myRedeem {
    margin-bottom: 1.2rem;
    .myList {
      height: 2.5rem;
    }
    .status {
      color: #333;
      font-weight: 400;
      margin-top: 1rem;
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
  .pointRules_pop {
    padding: 1rem;
    height: calc(100vh - 74px);
    iframe{
      border: 0;
    }
  }
  .PointListPopup{
    display: flex;
    flex-direction: column;
  }
}
</style>
