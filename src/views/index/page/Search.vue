<template>
  <div class="search">
    <form action="/" class="form" @click="onCancel">
      <van-icon name="arrow-left" />
      <van-search
        v-model="value"
        placeholder="请您输入商品、品牌名称"
        show-action
        @click="toSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="content">
      <div class="historyS">
        <div class="historyTitle">历史搜索</div>
        <div class="tags">
          <van-tag round>标签</van-tag>
          <van-tag round type="primary">标签</van-tag>
          <van-tag round type="success">标签</van-tag>
          <van-tag round type="danger">标签</van-tag>
          <van-tag round type="warning">标签</van-tag>
        </div>
      </div>
      <div class="historyB">
        <div class="historyTitle">历史浏览</div>
        <van-grid :column-num="2">
          <van-grid-item
            class="canBuyItem"
            v-for="n in browseHistory"
            :key="n.goodsId"
            @click="goGoodsDetail(n.goodsId)"
          >
            <van-image :src="'https://img.yzcdn.cn/vant/apple-1.jpg'" />
            <div class="canBuyItem_title">
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
      list: []
    };
  },
  computed: {
    ...mapState(["browseHistory", "searchHistory"])
  },
  methods: {
    toSearch() {},
    onCancel() {
      this.$router.back(-1);
    }
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
    border-bottom: 1px solid #ababab;
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
        .van-tag {
          margin-right: 10px;
        }
      }
    }
    .historyB {
      .canBuyItem {
        .van-grid-item__content {
          height: 18rem;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
      }
      .canBuyItem_subTitle {
        width: 100%;
        color: #f23d3d;
      }
    }
  }
}
</style>
