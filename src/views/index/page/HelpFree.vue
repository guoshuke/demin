<template>
  <div class="helpFree">
    <van-nav-bar title="助力免单" left-arrow @click-left="$router.back(-1)" />
    <div class="content">
      <div class="tipSetup">
        <span>选择奖励</span>
        <van-icon name="down" class="icon_right" />
        <span>邀请好友助力</span>
        <van-icon name="down" class="icon_right" />
        <span>团满发货</span>
      </div>
      <van-card
        price="0积分"
        :origin-price="detail.integral + '积分'"
        :thumb="detail.goodsSmallUrl"
      >
        <div slot="title" class="goodsTitle">
          <span class="goodsTitleText">{{ detail.goodsName }}</span>
        </div>
        <div slot="tags">
          <van-tag type="danger">好友助力</van-tag>
          <van-tag plain type="danger" class="needTag"
            >需要{{ detail.assistanceCount || 0 }}人</van-tag
          >
        </div>
        <div slot="price" class="price">
          0积分
        </div>
        <div slot="origin-price" class="origin-price">
          {{ detail.integral }}积分
        </div>
      </van-card>
      <div class="failed" v-if="detail.helperStatus == 2">
        <van-image src="./user/failed.png" />
      </div>
      <div class="calc">
        <div class="calc_left"></div>
        <div class="calc_right"></div>
      </div>

      <div class="invite" v-if="detail.helperStatus == 0">
        再邀请
        <span style="color: #f23d3d;"
          >{{
            detail.assistanceCount - detail.powerHelperDTOList.length
          }}位</span
        >好友助力，立即免费获得该商品
      </div>
      <div
        class="invite"
        v-if="detail.helperStatus == 1 || detail.helperStatus == 3"
      >
        助力成功，点击去兑换即可领取0元奖品
      </div>
      <div class="invite" v-if="detail.helperStatus == 2">
        点击再次发起可以重新获得0积分兑换机会
      </div>

      <div class="goInvite">
        <van-button
          v-if="detail.helperStatus == 0"
          class="goInviteButton"
          @click="showModal = true"
          >去邀请</van-button
        >
        <van-button
          v-if="detail.helperStatus == 1"
          class="goInviteButton"
          @click="goCommitOrder"
          >去兑换</van-button
        >
        <van-button
          v-if="detail.helperStatus == 2"
          class="goInviteButton"
          @click="reSend"
          >再次发起</van-button
        >
        <van-button v-if="detail.helperStatus == 3" class="goInviteButton gray"
          >已兑换</van-button
        >
      </div>

      <div class="countDown" v-if="detail.helperStatus == 0">
        <van-count-down :time="time">
          <template v-slot="timeData">
            <span class="item">
              {{
                timeData.hours - 0 < 10 ? "0" + timeData.hours : timeData.hours
              }}
            </span>
            :
            <span class="item">
              {{
                timeData.minutes - 0 < 10
                  ? "0" + timeData.minutes
                  : timeData.minutes
              }}
            </span>
            :
            <span class="item">
              {{
                timeData.seconds - 0 < 10
                  ? "0" + timeData.seconds
                  : timeData.seconds
              }}
            </span>
            <span style="font-family:Source Han Sans CN;">后失效</span>
          </template>
        </van-count-down>
      </div>

      <div class="countDown" v-if="detail.helperStatus == 3">
        <span class="item helpOver">当前助力已结束</span>
      </div>

      <div class="helpPerson">
        <van-grid :column-num="4" :border="false">
          <van-grid-item
            v-for="(p, i) in detail.assistanceCount"
            :key="i"
            :class="{
              hasHeadUrl:
                detail.powerHelperDTOList[i] &&
                detail.powerHelperDTOList[i].headImg
            }"
          >
            <van-image
              :src="
                (detail.powerHelperDTOList[i] &&
                  detail.powerHelperDTOList[i].headImg) ||
                  ''
              "
              round
              width="4.5rem"
              height="4.5rem"
            >
              <template v-slot:error>
                <van-icon name="question-o" size="28" />
              </template>
            </van-image>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="eventRules">
      活动规则
    </div>
    <div class="eventRulesDetail">
      1.邀请好友助力即可获得奖励 <br />
      2.仅限新注册用户帮忙助力 <br />
      3.在规定的时间内完成活动，奖励即刻到账 <br />
      4.每个新注册用户仅可助力一次 <br />
      5.所有人都可以发起无数次助力
    </div>
    <van-popup v-model="showList" position="bottom">
      <CommitOrder
        :detail="detail"
        :payType="0"
        :num="1"
        :isFree="true"
        ref="commitOrder"
        @closePopup="closePopup"
      />
    </van-popup>
    <shareModal v-if="showModal" @closeShareModal="closeShareModal" />
  </div>
</template>

<script>
import HelpStatus from "@/components/HelpStatus";
import shareModal from "@/components/shareModal";
import CommitOrder from "./CommitOrder";
import { request, api } from "@/request";
import store from "../store";
export default {
  name: "HelpFree",
  data() {
    return {
      time: 1000 * 60 * 60 * 24,
      detail: {
        powerHelperDTOList: []
      },
      showList: false,
      showModal: false
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    reSend() {
        let me = this
        let id = this.$route.query.goodsId;
        request
            .get(api.reHelper + id + "/1").then(res => {
            console.log(res);
            if (res.data.code == "200") {
                me.detail = res.data.data;
                me.detail.platformIntegral = Math.floor(res.data.data.platformIntegral / 10) * 10
                me.time =
                    new Date(me.detail.invalidTime.replace(/-/g, "/")) - new Date();
                // me.detail.helperStatus // 0 助理中  1 助力完成   2 助力失败   3 兑换完成
                if (me.time < 0) {
                    me.time = 0;
                }

                let sendData = {
                    goodsInfo: {
                        goodsName: me.detail.goodsName,
                        goodsSmallUrl: me.detail.goodsSmallUrl
                    },
                    pathInfo: {
                        path: "",
                        data: "&powerSurfaceId=" + me.detail.powerSurfaceId + "&goodsId=" + me.detail.goodsId
                    }
                };
                store.commit("toShare", sendData);
            }
        }).catch(err => {

        })
    },
    getDetail(t) {
      let id = this.$route.query.goodsId;
      let me = this;
      t = t || "/1";
      // 0  已发起过助力助力  不能发起助力
      // 1  没有发起过助力   可以发起助力

      request
        .get(api.HelperGoods + id + t)
        .then(res => {
          if (res.data.code == "200") {
            //
            console.log(res);
            // 解决删除数据库时   重新获取
            if (!res.data.data.powerSurfaceId) {
              me.reSend();
            }
            me.detail = res.data.data;
              me.detail.platformIntegral = Math.floor(res.data.data.platformIntegral / 10) * 10
            me.time =
              new Date(me.detail.invalidTime.replace(/-/g, "/")) - new Date();
            // me.detail.helperStatus // 0 助理中  1 助力完成   2 助力失败   3 兑换完成
            if (me.time < 0) {
              me.time = 0;
            }

            let sendData = {
              goodsInfo: {
                goodsName: me.detail.goodsName,
                goodsSmallUrl: me.detail.goodsSmallUrl
              },
              pathInfo: {
                path: "",
                data: "&powerSurfaceId=" + me.detail.powerSurfaceId + "&goodsId=" + me.detail.goodsId
              }
            };
            store.commit("toShare", sendData);
          } else {
            // 订单可能不存在  所以重新发起
            me.reSend();
            // me.$toast(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});

      //mall/{goods}
    },
    closePopup() {
      this.showList = false;
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
      let me = this;
      store.dispatch("getPhoneNumber", function() {
        me.showList = true;
        me.$refs.commitOrder && me.$refs.commitOrder.getAddressList(); // 进去后重新获取一下地址
      });
    },
    closeShareModal() {
      this.showModal = false;
    }
  },
  mounted() {
      let id = this.$route.query.goodsId;
      let t = "/1";
      let helpArray = JSON.parse(localStorage.getItem("helpArray") || "[]");
      console.log(helpArray);
      if (helpArray.includes(id)) {
          t = "/0";
      } else {
          helpArray.push(id);
          localStorage.setItem("helpArray", JSON.stringify(helpArray));
      }
      this.getDetail(t);
  },
  activated() {

  },
  components: {
    HelpStatus,
    CommitOrder,
    shareModal
  }
};
</script>

<style scoped lang="less">
.helpFree {
  background-color: rgba(242, 61, 61, 0.2);
  height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    background-color: #fff;
    min-height: 32.5rem;
    margin: 1.5rem 1rem;
    box-shadow: 0 -0.5rem 1rem 0 rgba(242, 61, 61, 0.2);
    border-radius: 0.6rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .tipSetup {
      background-color: #fceef2;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f23d3d;
      font-size: 0.9rem;
    }
    /deep/ .van-card {
      background-color: #ffffff;
    }
    .goodsTitle {
      margin-bottom: 1rem;
    }
    .goodsTitleText {
      font-weight: 500;
      color: #333;
      font-size: 1.1rem;
    }
    .needTag {
      background-color: #fcf2f2;
      &:after {
        border: 0;
      }
    }
    .price {
      color: #f23d3d;
      font-size: 1.1rem;
    }
    .origin-price {
      color: #858585;
      text-decoration: line-through;
    }
    .calc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 -0.75rem;
      div {
        width: 1.5rem;
        height: 1.5rem;
        background-color: rgba(242, 61, 61, 0.2);
        border-radius: 1rem;
      }
    }
    .invite {
      color: #333;
      font-size: 1.1rem;
      text-align: center;
      font-weight: 500;
      margin-top: 1.5rem;
    }
    .goInvite {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      .goInviteButton {
        width: 15rem;
        height: 3.5rem;
        background: linear-gradient(
          263deg,
          rgba(242, 61, 61, 1),
          rgba(233, 90, 59, 1),
          rgba(242, 61, 61, 1),
          rgba(233, 107, 79, 1)
        );
        border-radius: 3rem;
        color: #fff;
        font-weight: bold;
        font-size: 1.1rem;
      }
      .gray {
        background: #858585;
      }
    }

    .countDown {
      font-family: FuturaBT-Medium;
      font-weight: bold;
      text-align: center;
      margin-top: 1.2rem;
      .item {
        display: inline-block;
        width: 22px;
        margin-right: 5px;
        color: #333;
        font-size: 12px;
        text-align: center;
        background-color: #e4e4ee;
      }
      .helpOver {
        background-color: #fff;
        width: auto;
      }
    }

    .helpPerson {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex: 1;
      /deep/ .van-grid {
        width: 100%;
        flex-wrap: nowrap;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
      /deep/ .van-grid-item {
        &:after,
        &:before {
          content: "";
          height: 3px;
          background-color: #efefef;
          width: calc((100% - 4.5rem - 8px) / 2 + 4px);
          position: absolute;
          top: 50%;
          border-radius: 2px;
        }
        &:after {
          right: 0;
        }
        &:before {
          left: 0;
        }
      }

      .hasHeadUrl {
        &:before,
        &:after {
          background-color: #f23d3d !important;
        }
      }

      /deep/ .van-grid-item:first-child {
        &:before {
          width: 0;
        }
      }
      /deep/ .van-grid-item:last-child {
        &:after {
          width: 0;
        }
      }
    }

    .failed {
      position: absolute;
      right: 2rem;
      top: 9rem;
      width: 8rem;
      height: 9rem;
      z-index: 10;
    }
  }

  .eventRules {
    text-align: center;
    font-weight: bold;
    color: #333;
    font-size: 1.2rem;
    padding: 0.5rem 0 1rem 0;
  }
  .eventRulesDetail {
    min-height: 10rem;
    width: 100%;
    padding: 2rem 3rem;
    color: #858585;
    background-color: #fff;
    border-radius: 1rem 1rem 0 0;
    box-sizing: border-box;
  }

  /deep/ .van-nav-bar .van-icon {
    color: #333;
  }
  /deep/ .van-card__bottom {
    margin-top: 0.5rem;
  }

  .icon_right {
    transform: rotate(270deg);
    margin: 0 2rem 0 1rem;
  }
}
</style>
