<template>
  <div class="order">
    <van-nav-bar title="订单填写" left-arrow @click-left="closePopup" />
    <!-- 联系人卡片 -->
    <div class="address">
      <div class="noAddress" @click="showList = true">
        <span v-if="!editingContact.hasOwnProperty('id')">+新增收货地址</span>
        <div v-if="editingContact.hasOwnProperty('id')" class="hasAddress">
          <div class="addressInfo">
            <div class="nameAndTel">
              <div class="addressName">{{ editingContact.name }}</div>
              <div class="tel">{{ editingContact.tel }}</div>
            </div>
            <div class="addressDetail">{{ editingContact.address }}</div>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <van-popup v-model="showList" position="bottom">
      <van-nav-bar title="选择地址" left-arrow @click-left="showList = false" />
      <van-address-list
        v-model="editingContactId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>
    <van-popup v-model="showEdit" position="bottom">
      <van-nav-bar
        :title="isEdit ? '编辑地址' : '新增地址'"
        left-arrow
        @click-left="showEdit = false"
      />
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-set-default
        @save="onSave"
      />
    </van-popup>

    <van-card
      :num="num"
      :thumb="detail.goodsSmallUrl || `https://img.yzcdn.cn/vant/t-thirt.jpg`"
      class="goodsInfo"
    >
      <div slot="title" class="goodsTitle">
        <span class="goodsTitleText">{{ detail.goodsName }}</span>
      </div>
      <div slot="price" class="price">
        {{ type ? detail.price + "元" : detail.integral + "积分" }}
      </div>
    </van-card>

    <div class="myList payWay">
      <div class="listTitle">配送方式</div>
      <div class="listTitle_sub">快递费货到付款</div>
    </div>
    <div class="myList" v-if="type == 1">
      <div class="listTitle">支付方式</div>
      <div class="listTitle_sub wePay">
        <van-image src="./user/wepay.png" alt="" />微信支付
      </div>
      <!--      <van-icon name="arrow" class="listTitle_sub" />-->
    </div>
    <div class="myList">
      <div class="listTitle">商品金额</div>
      <div class="listTitle_sub">
        {{ type ? detail.price + "元" : detail.integral + "积分" }}
      </div>
      <!--      <van-icon name="arrow" class="listTitle_sub" />-->
    </div>
    <div class="myList" v-if="type == 0">
      <div class="listTitle">平台积分立减</div>
      <div class="listTitle_sub">{{ detail.platformIntegral }}积分</div>
      <!--      <van-icon name="arrow" class="listTitle_sub" />-->
    </div>
    <div class="myList" v-if="type == 0">
      <div class="listTitle">商家积分立减</div>
      <div class="listTitle_sub">
        -{{ detail.platformReductionIntegral }}积分
      </div>
    </div>

    <div class="myList submitOrder">
      <div class="listTitle">
        实际支付：
        {{
          type
            ? "￥" + detail.price
            : detail.integral -
              detail.platformReductionIntegral -
              detail.platformIntegral +
              "积分"
        }}
      </div>
      <van-button class="submitRedeem" @click="submitOrder"
        >立即兑换</van-button
      >
    </div>
  </div>
</template>

<script>
import { request, api } from "@/request";
import areaList from "@/utils/areaList";
import _ from "lodash";
import utils from "@/utils";
export default {
  props: ["detail", "num", "type"],
  name: "Order",
  data() {
    return {
      showList: false,
      showEdit: false,
      chosenContactId: null,
      isEdit: false,
      editingContact: {},
      addressInfo: {},
      editingContactId: null,
      areaList,
      list: []
    };
  },
  computed: {
    needPoints() {
      return (
        this.detail.integralTotal +
        this.detail.platformReductionIntegral +
        this.detail.platformIntegral
      );
    },
    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }
  },

  methods: {
    // 添加地址
    onAdd() {
      this.isEdit = false;
      this.showEdit = true;
      this.addressInfo = {};
    },

    // 编辑地址
    onEdit(item, i) {
      this.isEdit = true;
      this.showEdit = true;
      item.areaCode = item.areaCode + "";
      item.addressDetail = _.drop(item.address.split(" ")).join(" ");
      this.addressInfo = item;
      console.log(item);
      console.log(i);
      debugger;
    },

    // 选中地址
    onSelect(n) {
      this.showList = false;
      this.editingContact = n;
      this.editingContactId = n.id;
    },

    // 保存地址
    onSave(info) {
      const me = this;
      this.showEdit = false;
      this.showList = false;
      info.address = info.addressDetail;

      if (info.id) {
        this.list = this.list.map(item => {
          return item.id === info.id ? info : item;
        });
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
      let sendData = {
        address: info.addressDetail,
        userName: info.name,
        phone: info.tel,
        isDefault: Number(info.isDefault),
        areaCode: info.areaCode - 0
      };
      if (info.id) {
        sendData.id = info.id;
      }
      request
        .post(api.addAddress, sendData)
        .then(res => {
          if (res.data.code == "200") {
            // 因为组件要他们的格式  所以转换一次
            me.getAddressList(info);
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },

    closePopup() {
      this.$emit("closePopup");
    },

    getAddressList(info) {
      const me = this;
      request
        .get(api.addressList)
        .then(res => {
          if (res.data.code == "200") {
            // 因为组件要他们的格式  所以转换一次
            me.list = _.transform(
              res.data.data,
              (r, n) => {
                let obj = {
                  id: n.id,
                  address: n.address,
                  name: n.userName,
                  tel: n.phone,
                  areaCode: n.areaCode,
                  isDefault: !!n.isDefault
                };
                obj.address =
                  utils.getAddress(obj.areaCode) + " " + obj.address;
                r.push(obj);
                if (n.isDefault) {
                  me.editingContact = obj;
                  me.editingContactId = obj.id;
                }
              },
              []
            );
          } else {
            me.list = [];
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          if (info) {
            info.address =
              info.province + info.city + info.county + " " + info.address;
            me.editingContact = info;
            debugger;
          }
        });
    },
    submitOrder() {
      let sendData = {
        goodsId: this.detail.goodsId,
        goodsName: this.detail.goodsName,
        imageUrl: this.detail.goodsUrl,
        platformIntegral: this.detail.platformIntegral,
        mallIntegral: this.detail.platformReductionIntegral,
        price: this.detail.price,
        goodsIntegral: this.detail.integral,
        address: this.editingContact.address,
        userName: this.editingContact.name,
        phone: this.editingContact.tel,
        payType: this.type - 0
      };
      _.each(this.list, n => {
        if (this.editingContact.id == n.id) {
          sendData.address = utils.getAddress(n.areaCode) + sendData.address;
        }
      });
      console.log(sendData);
      const me = this;
      if (!sendData.address) {
        this.$toast("请选择地址");
        return;
      }
      request
        .post(api.submitOrder, sendData)
        .then(res => {
          if (res.data.code == "200") {
            // 因为组件要他们的格式  所以转换一次
            console.log(res);
            if (sendData.payType) {
              //todo  如果选择金钱支付则发起支付
              me.$router.push("paySuccess?orderId=" + res.data.data);
            } else {
              me.$router.push("paySuccess?orderId=" + res.data.data);
            }
          } else {
            this.$toast(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    }
  },
  mounted() {
    this.getAddressList();
  }
};
</script>

<style scoped lang="less">
.order {
  min-height: 100vh;
  /deep/ .van-popup--bottom {
    height: 100vh;
  }
  .van-nav-bar {
    width: 100%;
    top: 0;
    background-color: #fff !important;
  }
  .address {
    background-color: #fff;
    position: relative;
    border-bottom: 1rem solid #efefef;
    .noAddress {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 5rem;
      font-size: 1.1rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(133, 133, 133, 1);
      &::before,
      &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: -webkit-repeating-linear-gradient(
          135deg,
          #ff6c6c 0,
          #ff6c6c 20%,
          transparent 0,
          transparent 25%,
          #1989fa 0,
          #1989fa 45%,
          transparent 0,
          transparent 50%
        );
        background: repeating-linear-gradient(
          -45deg,
          #ff6c6c 0,
          #ff6c6c 20%,
          transparent 0,
          transparent 25%,
          #1989fa 0,
          #1989fa 45%,
          transparent 0,
          transparent 50%
        );
        background-size: 80px;
        content: "";
      }

      &::before {
        bottom: initial;
        top: 0;
      }

      .hasAddress {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 0 1rem;
        .addressInfo {
          display: flex;
          flex-direction: column;
          flex: 1;
          height: 100%;
          justify-content: space-evenly;
          margin-left: 1rem;
          .nameAndTel {
            display: flex;
            align-items: center;
            color: #333;
            font-size: 1.1rem;
            font-weight: 400;
            .addressName {
              margin-right: 3rem;
            }
            .addressTel {
              color: #858585;
              font-size: 1rem;
            }
          }
        }
        .van-icon {
          font-size: 1.5rem;
          color: #858585;
        }
      }
    }
  }

  .goodsInfo {
    background-color: #fff;
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
      color: #f23d3d;
      font-size: 0.9rem;
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
    /deep/ .van-icon {
      color: #f23d3d;
      margin-left: 3px;
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

  .submitOrder {
    height: 5rem;
    border-top: 1rem solid #efefef;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    box-sizing: border-box;
    .listTitle {
      font-weight: 500;
    }
    .submitRedeem {
      width: 6rem;
      height: 2.5rem;
      line-height: 2.5rem;
      background: linear-gradient(
        263deg,
        rgba(242, 61, 61, 1),
        rgba(233, 107, 79, 1)
      );
      border-radius: 2rem;
      color: #fff;
      font-weight: bold;
      font-size: 1.1rem;
      padding: 0 10px;
    }
  }
}
</style>
