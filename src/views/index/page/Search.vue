<template>
  <div class="search">
    <form action="/" class="form">
      <van-icon name="arrow-left" @click="onCancel" />
      <van-search
        v-model="value"
        placeholder="请您输入商品名称"
        show-action
        @search="toSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="content">
      <div class="historyS" v-if="searchHistory.length">
        <div class="historyTitle">历史搜索</div>
        <div class="tags">
          <van-tag
            round
            v-for="n in searchHistory.slice(0, 10)"
            :key="n"
            @click="goGoodsList({ selectName: n,className:n })"
            >{{ n }}</van-tag
          >
        </div>
      </div>
      <div class="historyB" v-if="browseHistory.length">
        <div class="historyTitle">历史浏览</div>
        <van-grid :column-num="2">
          <van-grid-item
            class="canBuyItem"
            v-for="n in browseHistory.slice(0, 10)"
            :key="n.goodsId"
            @click="goGoodsDetail(n.goodsId)"
          >
            <van-image :src="n.goodsSmallUrl" />
            <span class="goodsName">
              {{ n.goodsName }}
            </span>
            <div class="canBuyItem_subTitle">
              <span class="canBuyItem_needPoint"
                >{{ n.integral || 0 }}积分</span
              >
              <!--              <span class="canBuyItem_num">已兑换88件</span>-->
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      value: "",
      list: [],
      browseHistory: [],
      searchHistory: []
    };
  },
  computed: {
    // ...mapState(["browseHistory", "searchHistory"])
  },
  methods: {
    toSearch() {
      let searchHistory = this.searchHistory;
      if (_.trim(this.value)) {
        if (searchHistory.includes(this.value)) {
          searchHistory = _.transform(
            searchHistory,
            (r, n) => {
              if (n != this.value) {
                r.push(n);
              }
            },
            []
          );
        }
        searchHistory.unshift(this.value);
        console.log(searchHistory);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }
      this.goGoodsList({ selectName: this.value,className: this.value });
    },
    onCancel() {
      this.$router.back(-1);
    },
    goGoodsDetail(id) {
      // id 商品的id
      _.isNumber(id - 0)
        ? this.$router.push(`goodsDetail?goodsId=${id}`)
        : this.$toast("商品id未找到");
    },
    goGoodsList(obj) {
      this.$router.push(`goodsList?object=${JSON.stringify(obj)}`);
    }
  },
  activated() {
    this.browseHistory =
      JSON.parse(localStorage.getItem("browseHistory")) || [];
    this.searchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
  }
};
</script>
<style lang="less">
.search {
  .form {
    position: fixed;
    width: 100vw;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #f9f9f9;
    margin-bottom: 0.5rem;
    .van-search {
      width: 100%;
    }
    .van-search__content {
      border: 1px solid #f23d3d;
      /*border-image: linear-gradient(#f23d3d, #f26e6e);*/
      border-radius: 0.3rem;
    }
  }
  .content {
    padding-top: 55px;
    padding: 55px 1rem 0 1rem;
    .historyTitle {
      color: #333;
      font-size: 1.2rem;
      font-weight: 500;
      margin: 1rem 0;
    }
    .historyS {
      border-bottom: 1px solid #efefef;
      .tags {
        display: flex;
        margin-bottom: 1rem;
        width: 100%;
        flex-wrap: wrap;
        .van-tag {
          margin-right: 10px;
          font-size: 1rem;
          padding: 3px 10px;
          margin-bottom: 1rem;
        }
      }
    }
    .historyB {
      .canBuyItem {
        .van-grid-item__content {
          min-height: 18rem;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
      }
      .canBuyItem_subTitle {
        width: 100%;
        color: #f23d3d;
      }
      .goodsName {
        width: 100%;
        color: #333;
        font-size: 1.1rem;
        font-weight: 500;
        overflow: hidden;
        white-space: normal;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
