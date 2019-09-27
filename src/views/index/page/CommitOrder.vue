<template>
  <div class="order">
    <van-nav-bar title="订单填写" left-arrow @click-left="$router.back(-1)" />
    <!-- 联系人卡片 -->
    <div class="address">
      <div
        class="noAddress"
        @click="showList = true"
        v-if="!currentContact.name"
      >
        +新增收货地址
      </div>
    </div>

    <van-popup v-model="showList" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>

    <van-card
      price="150积分"
      num="1"
      thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
      class="goodsInfo"
    >
      <div slot="title" class="goodsTitle">
        <span class="goodsTitleText">厨房厨具三件套 淡蓝色 不锈钢厨具锅具</span>
      </div>
      <div slot="price" class="price">
        0积分
      </div>
    </van-card>

    <div class="myList payWay">
      <div class="listTitle">配送方式</div>
      <div class="listTitle_sub">快递费货到付款</div>
    </div>
    <div class="myList">
      <div class="listTitle">商品金额</div>
      <div class="listTitle_sub">150积分</div>
      <!--      <van-icon name="arrow" class="listTitle_sub" />-->
    </div>
    <div class="myList">
      <div class="listTitle">平台积分立减</div>
      <div class="listTitle_sub">150积分</div>
      <van-icon name="arrow" class="listTitle_sub" />
    </div>
    <div class="myList">
      <div class="listTitle">商家积分立减</div>
      <div class="listTitle_sub">-50积分</div>
    </div>

    <div class="myList submitOrder">
      <div class="listTitle">实际支付：￥0</div>
      <van-button class="submitRedeem">立即兑换</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      showList: false,
      showEdit: false,
      chosenContactId: null,
      editingContact: {},
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ]
    };
  },
  computed: {
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    },

    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }
  },

  methods: {
    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;
      this.showEdit = true;
      this.editingContact = item;
    },

    // 选中联系人
    onSelect() {
      this.showList = false;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;

      if (this.isEdit) {
        this.list = this.list.map(item => (item.id === info.id ? info : item));
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    }
  }
};
</script>

<style scoped lang="less">
.order {
  min-height: 100vh;
  /deep/ .van-popup--bottom {
    height: 100vh;
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
