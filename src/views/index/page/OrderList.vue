<template>
  <div class="orderList">
    <!--    <van-nav-bar-->
    <!--      title="我的兑换"-->
    <!--      fixed-->
    <!--      left-arrow-->
    <!--      @click-left="$router.back(-1)"-->
    <!--    />-->
    <van-tabs
      v-model="active"
      :swipe-threshold="6"
      swipeable
      sticky
      @change="toggleStatus"
    >
      <van-tab
        v-for="(n, i) in statusList"
        :key="i"
        :title="n.title"
        style="height: 100vh"
      >
        <ul class="list">
          <li v-for="(m, l) in list" :key="l">
            <OrderStatus :brief="m"></OrderStatus>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import OrderStatus from "@/components/OrderStatus";
import { request, api } from "@/request";
export default {
  name: "OrderList",
  data() {
    return {
      active: 0,
      statusList: [
        {
          title: "全部",
          type: null
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
      list: [],
      resData: {
        pageSize: 999,
        currentPage: 1,
        orderStatus: null
      },
      loading: false,
      finished: false
    };
  },
  mounted() {
    let type = this.$route.query.type - 0;
      console.log(type);
      debugger
      if (!_.isNaN(type)) {
      this.active = type;
    }
    this.toggleStatus(this.active || null);
  },
  methods: {
    toggleStatus(i) {
      console.log(i);
      this.list = [];
      let types = [null, 0, 1, 2, 3, 4];
      this.resData.currentPage = 1;
      this.questData(types[i]);
    },
    questData(type) {
      let me = this;
      // me.resData.currentPage++;
      me.resData.orderStatus = type;
      _.isNull(type) && delete me.resData.orderStatus;
      this.loading = true;
      request
        .post(api.orderList, me.resData)
        .then(res => {
          console.log(res);
          res = res.data;
          if (res.code != "200") {
            me.finished = true;
            console.log("end");
          } else {
            me.list = res.dataList;
          }
        })
        .catch(err => {
          console.log(err);
          me.finished = true;
        })
        .finally(() => {
          me.loading = false;
        });
    }
  },
  components: {
    OrderStatus
  }
};
</script>

<style scoped lang="less">
.orderList {
  background-color: #efefef;
  .list {
    height: calc(100vh - 46px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
