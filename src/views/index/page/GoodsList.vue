<template>
  <div class="goodsList">
    <van-nav-bar
      title="分类名称"
      left-arrow
      fixed
      @click-left="$router.back(-1)"
    />
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
            v-for="(n, i) in list"
            :key="i"
            @click="goGoodsDetail(i)"
          >
            <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            <div class="canBuyItem_title">
              KONKIA康佳电水壶1L大容量 家庭用电热水壶防干烧宿舍…
            </div>
            <div class="canBuyItem_subTitle">
              <span class="canBuyItem_needPoint">1500积分</span>
              <span class="canBuyItem_num">已兑换88件</span>
            </div>
          </van-grid-item>
        </van-grid>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
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
      currentPage: 1,
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
          title: "我的兑换",
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
        this.currentPage = 0;
        this.list = [];
        this.finished = false;
        this.onLoad();
        //
      }
    },
    onRefresh() {
      this.loading = true;
      this.currentPage = 1;
      this.list = [];
      this.finished = false;
      this.onLoad();
    },
    questData() {
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        this.loadMore = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      console.log("load执行了");
      this.loadMore = true;
      this.currentPage++;
      this.questData();
    },
    goGoodsDetail(id) {
      // id 商品的id
      _.isNumber(id)
        ? this.$router.push(`goodsDetail?goodId=${id}`)
        : this.$toast("商品id未找到");
    }
  },
  activated() {
    this.onLoad();
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
    top: 46px;
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
    margin-top: calc(46px + 4rem);
    .van-image {
      height: 11rem;
    }
    .canBuyItem_title {
      font-size: 1rem;
      color: #333;
      padding: 0.6rem 0;
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
  }
}
</style>
