<template>
  <div class="goodsList">
    <div class="list_title">
      <span
        class="list_types first_type"
        v-for="n in typeList"
        :key="n.type"
        :class="{ active: active == n.type }"
        @click="toSelect(n)"
      >
        <span>{{ n.title }}</span>
        <span class="list_types_icon" v-if="n.canSort">
          <van-icon v-if="active != n.type || status" name="arrow-up" />
          <van-icon v-if="active != n.type || !status" name="arrow-down" />
        </span>
      </span>
    </div>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        class="list"
      >
        <van-grid :column-num="2">
          <van-grid-item
            class="canBuyItem"
            v-for="n in list"
            :key="n.goodsId"
            @click="goGoodsDetail(n.goodsId)"
          >
            <van-image :src="n.goodsSmallUrl" />
            <div class="canBuyItem_title goodsName">
              {{ n.goodsName }}
            </div>
            <div class="canBuyItem_subTitle">
              <span class="canBuyItem_needPoint"
                >{{ n.integral || 0 }}积分</span
              >
              <!--              <span class="canBuyItem_num">已兑换88件</span>-->
            </div>
          </van-grid-item>
        </van-grid>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { request, api } from "@/request";
let p = ""
import store from "../store"
import _ from "lodash";
export default {
  name: "GoodsList",
  data() {
    return {
      list: [],
      loading: false,
      loadMore: false,
      finished: false,
      active: 1,
      status: 1,
      resData: {
        currentPage: 1,
        pageSize: 10
      },
      typeList: [
        {
          title: "推荐",
          type: 1,
          canSort: true
        },
        {
          title: "积分排序",
          type: 2,
          canSort: true
        },
        {
          title: "我能兑换",
          type: 3,
          canSort: false
        }
      ]
    };
  },
  methods: {
    toSelect(n) {
      let temp = this.active;
      if (n.type == this.active) {
        this.status = !this.status;
      } else {
        this.active = n.type;
        this.status = 1;
      }
      if (n.canSort || temp !== n.type) {
        console.log("----------");
        this.loadMore = true;
        this.resData.currentPage = 0;
        this.list = [];
        this.finished = false;
        this.onLoad();
        //
      }
    },
    onRefresh() {
      console.log("onRefresh");
      this.resData.currentPage = 0;
      this.list = [];
      this.finished = false;
      this.onLoad();
    },
    questData() {
      let me = this;
      let sendData = _.cloneDeep(me.resData);
      sendData.type = this.active;
      if (sendData.type == 1) {
        sendData.recommendOrder = Number(!this.status);
      } else if (sendData.type == 2) {
        sendData.integralOrder = Number(!this.status);
      }
      console.log("end3", me.loading);
      this.loading = true;
      request
        .post(api.classifyList, sendData)
        .then(res => {
          console.log(res);
          res = res.data;
          if (res.code != "200") {
            me.finished = true;
            console.log("end");
          } else {
            me.list = me.list.concat(res.dataList);
            if (res.pageIndex > res.totalPage) {
              me.finished = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
          me.finished = true;
        })
        .finally(() => {
          me.loading = false;
        });
    },
    onLoad() {
      // 异步更新数据
      this.loadMore = true;
      this.finished = false;
      this.resData.currentPage++;
      this.questData();
    },
    goGoodsDetail(id) {
      // id 商品的id
      _.isNumber(id)
        ? this.$router.push(`goodsDetail?goodsId=${id}`)
        : this.$toast("商品id未找到");
    }
  },
    beforeRouteEnter(to,form,next){
        console.log(to, form, next);
        p = form.name
        debugger
      next()
    },
    activated(){
      debugger
        if(p != "goodsDetail"){
            console.log("this-----",this, p);
            this.onRefresh()
        }
    },
  mounted() {
      this.resData = {
      currentPage: 0,
      pageSize: 10
    };
    try {
      let t = JSON.parse(this.$route.query.object);
        document.title = t.className || '积分商城'
        delete t.className;
      console.log(t);
      if (t.type) {
        this.resData[t.type] = t[t.type];
      } else {
        Object.assign(this.resData, t);
      }
      this.resData.type = 1;
      this.list = [];
      this.onLoad();
    } catch (e) {
      this.$toast("链接不合法");
    }
  }
};
</script>

<style scoped lang="less">
.goodsList {
  font-size: 1rem;
  color: #333;
  .list_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 4rem;
    border-bottom: 1px solid #efefef;
    font-weight: 400;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 10;
    box-sizing: border-box;
    .list_types {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      padding: 0.5rem;
      .list_types_icon {
        display: flex;
        flex-direction: column;
        padding-left: 0.5rem;
        font-size: 0.6rem;
      }
    }
    .active::after {
      content: "";
      width: 100%;
      position: absolute;
      height: 2px;
      background: linear-gradient(90deg, #f23d3d, #efefef);
      left: 0;
      bottom: -0.3rem;
    }
  }
  .list {
    padding: 0 1rem;
    /*height: 150vh;*/
    margin-top: 4rem;
    .van-image {
      height: 11rem;
    }
    .canBuyItem {
      /deep/ .van-grid-item__content {
        min-height: 18rem;
        justify-content: space-evenly;
      }
    }
    .canBuyItem_title {
      font-size: 1rem;
      color: #333;
      margin: 0.6rem 0;
      width: 100%;
    }
    .canBuyItem_subTitle {
      display: flex;
      align-items: center;
      width: 100%;
      .canBuyItem_needPoint {
        color: #f23d3d;
        font-size: 0.9rem;
        flex: 1;
      }
      .canBuyItem_num {
        font-size: 0.8rem;
        color: #858585;
      }
    }
    .goodsName {
      width: 100%;
      color: #333;
      font-size: 1.1rem;
      font-weight: 500;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
