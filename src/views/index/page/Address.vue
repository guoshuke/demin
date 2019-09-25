<template>
  <div class="address">
    <van-nav-bar title="地址列表" left-arrow @click-left="$router.back(-1)" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
export default {
  name: "Address",
  data() {
    return {
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

  methods: {
    onAdd() {
      this.$router.push("editAddress");
    },

    onEdit(item, index) {
      let obj = {
        name: `editAddress`,
        params: {
          id: index + 1
        }
      };
      this.$router.push(obj);
    }
  }
};
</script>

<style scoped lang="less">
.address {
  /deep/ .van-radio__icon {
    display: none;
  }
}
</style>
