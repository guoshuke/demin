<template>
  <div class="orderList">
    <!--    <van-nav-bar-->
    <!--      title="我的兑换"-->
    <!--      fixed-->
    <!--      left-arrow-->
    <!--      @click-left="$router.back(-1)"-->
    <!--    />-->
    <van-tabs v-model="active" :swipe-threshold="6" swipeable sticky>
      <van-tab
        v-for="(n, i) in statusList"
        :key="i"
        :title="n.title"
        style="height: 100vh"
      >
        <ul class="list">
          <li v-for="(m, l) in list" :key="l">
            <OrderStatus :brief="n"></OrderStatus>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import OrderStatus from "@/components/OrderStatus";
export default {
  name: "OrderList",
  data() {
    return {
      active: 1,
      statusList: [
        {
          title: "全部",
          type: -1
        },
        {
          title: "待付款",
          type: 0
        },
        {
          title: "待发货",
          type: 1
        },
        {
          title: "已发货",
          type: 2
        },
        {
          title: "已完成",
          type: 3
        },
        {
          title: "已取消",
          type: 4
        }
      ],
      list: [{ orderStatus: 1 }]
    };
  },
  deactivated() {
    console.log(this.$route);
  },
  components: {
    OrderStatus
  }
};
</script>

<style scoped lang="less">
.orderList {
  background-color: #efefef;
}
</style>
