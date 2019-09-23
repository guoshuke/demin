<template>
  <div class="home">
    <div class="fixed_top">
      <div class="location" @click="show = true">
        <van-icon name="aim" />
        扬州市
        <van-icon name="arrow-down" />
      </div>
      <form action="/" class="form">
        <van-search
          v-model="value"
          placeholder="请您输入商品、品牌名称"
          readonly
          @click="toSearch"
        />
      </form>
      <van-popup v-model="show" position="top" :style="{ height: '100%' }">
        <van-nav-bar
          title="当前城市-扬州"
          left-text="返回"
          left-arrow
          @click-left="show = false"
        >
        </van-nav-bar>
      </van-popup>
    </div>

    <div class="home_block">
      <van-swipe :autoplay="3000" class="swipe">
        <van-swipe-item
          v-for="(image, index) in images"
          :key="index"
          @click="goGoodsDetail(index)"
        >
          <img v-lazy="image" @load="imgLoad" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--    <div class="newUser home_block">-->
    <!--      <img v-lazy="images[0]" />-->
    <!--    </div>-->

    <div class="funcBar home_block mb15">
      <van-grid :column-num="5" :border="false">
        <van-grid-item v-for="value in 10" :key="value">
          <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          <span>文字</span>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="newGoods home_block mb15">
      <van-cell is-link class="custom">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">新品推荐</span>
          <span class="custom-title-sub">第一时间获取好物</span>
        </template>
        <template slot="default" class="test">
          <span class="custom-title-right">查看更多</span>
        </template>
      </van-cell>
      <van-grid :column-num="3" class="newGoods_list">
        <van-grid-item
          v-for="value in 3"
          :key="value"
          icon="photo-o"
          text="文字"
        />
      </van-grid>
    </div>

    <div class="superScrabble home_block mb15">
      <van-cell is-link class="custom">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">超值拼团</span>
          <span class="custom-title-sub">嗨购时刻 超值抢购</span>
        </template>
        <template slot="default" class="test">
          <span class="custom-title-right">查看更多</span>
        </template>
      </van-cell>
      <ul class="superScrabble_title">
        <li>
          <div class="calc">1</div>
          <span>开团</span>
        </li>
      </ul>
      <van-grid :column-num="2" :border="false" class="superScrabble_list">
        <van-grid-item
          v-for="value in 2"
          :key="value"
          icon="photo-o"
          text="文字"
        />
      </van-grid>
    </div>

    <div class="hotGoods">
      <div class="hotGoods_Content">
        <van-cell class="hotGoods_Content_title">
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <span class="custom-title">爆款清单</span>
            <span class="custom-subtitle">好物推荐 生猛来袭</span>
          </template>
          <template slot="default" class="test">
            <div class="custom-title-right">
              <span>查看更多</span>
              <van-icon name="arrow" style="line-height: inherit;" />
            </div>
          </template>
        </van-cell>
        <ul class="hotGoods_Content_list">
          <li v-for="value in 10" :key="value">
            <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            <span>文字</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="pointSelect">
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item>
          5000分以下
        </van-grid-item>
        <van-grid-item>
          <van-grid :column-num="1" :gutter="10">
            <van-grid-item>
              5000-10000分
            </van-grid-item>
            <van-grid-item>
              10000分以上
            </van-grid-item>
          </van-grid>
        </van-grid-item>
      </van-grid>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="iCanBuy"
    >
      <div class="divider">
        <van-divider>我能兑换</van-divider>
      </div>
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item class="canBuyItem" v-for="(n, i) in list" :key="i">
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
  </div>
</template>

<script>
import { request, api } from "../../request";
import _ from "lodash";
import { Toast } from "vant";

export default {
  name: "home",
  components: {},
  data() {
    return {
      swipeHeight: 0,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      loading: false,
      finished: false,
      list: [],
      value: "",
      show: false
    };
  },
  methods: {
    goGoodsDetail(id) {
      // id 商品的id
      _.isNumber(id)
        ? this.$router.push(`goodsDetail?goodId=${id}`)
        : Toast("商品id未找到");
    },
    imgLoad(e) {
      let height = e.target.clientHeight || e.target.height;
      if (height > this.swipeHeight) {
        this.swipeHeight = height;
      }
    },
    onLoad() {
      const self = this;
      console.log("onLoad");
      this.loading = true;
      setTimeout(() => {
        if (self.list.length < 100) {
          for (let i = 0; i < 10; i++) {
            self.list.push({});
          }
        } else {
          self.finished = true;
        }
        self.loading = false;
      }, 300);
    },
    toSearch() {
      this.$router.push(`search`);
    }
  },
  mounted() {
    // request
    //   .get(api.point)
    //   .then(res => {
    //     // console.log(res);
    //   })
    //   .catch(err => {
    //     /* console.log(err);*/
    //   })
    //   .finally(() => {
    //     // console.log("end");
    //     // this.goGoodsDetail(3);
    //   });
  }
};
</script>
<style lang="less" scoped>
.home {
  padding-bottom: 50px;
  background-color: #efefef;
  .home_block {
    background-color: #fff;
  }
}

.fixed_top {
  display: flex;
  position: fixed;
  z-index: 10;
  width: 100%;
  align-items: center;
  color: #fff;
}
.form {
  flex: 1;
  /deep/ .van-search {
    background: transparent !important;
    .van-cell {
      padding: 5px 8px 5px 0;
      font-size: 0.9rem;
      justify-content: center;
      .van-cell__value {
        flex: initial;
      }
      input {
        width: 45vw;
      }
    }
  }
}

.swipe img {
  width: 100vw;
}
.newUser {
  height: 100px;
  display: flex;
  width: 100vw;
  padding: 2rem 3rem;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.custom {
  /deep/ .van-cell__value {
    flex: initial;
  }
}
.custom-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}
.custom-title-sub {
  font-size: 1.1rem;
  color: #858585;
  padding-left: 13px;
}
.custom-title-right {
  font-size: 13px;
  color: #858585;
}
.funcBar {
  height: 260px;
  display: flex;
}
.superScrabble {
  margin: 0 10px 22px 10px;
}
.newGoods {
  .newGoods_list {
    height: 250px;
  }
}
.superScrabble {
  .superScrabble_title {
    margin: 0 10px;
    background-color: #fef7ed;
    height: 30px;
    line-height: 30px;
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 32px;
      .calc {
        width: 18px;
        height: 18px;
        border-radius: 18px;
        overflow: hidden;
        background-color: #fde4c5;
        color: #b5a37b;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      span {
        margin-left: 7px;
        font-size: 13px;
        color: #b5a37b;
      }
    }
  }
  .superScrabble_list {
    height: 270px;
    display: flex;
    flex-direction: row;
  }
}

.hotGoods {
  width: 100%;
  height: 303px;
  background: linear-gradient(180deg, #ffffff, #efefef);
  padding: 13px 10px 18px 10px;
  box-sizing: border-box;
  .hotGoods_Content {
    background-color: #fff;
    height: 100%;
    .hotGoods_Content_title {
      height: 48px;
      background: linear-gradient(90deg, #f23d3d, #f26e6e);
      border-radius: 1rem 1rem 0 0;
      .custom-title {
        color: #fff;
        margin-right: 10px;
      }
      .custom-subtitle {
        color: #fff;
      }
      .custom-title-right {
        color: #f23d3d;
        font-size: 0.8rem;
        padding: 0 5px 0 10px;
        border-radius: 2rem;
        background-color: #fff;
        display: flex;
        align-items: center;
      }
      /deep/ .van-cell__value {
        flex: initial;
      }
    }

    .hotGoods_Content_list {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      display: flex;
      white-space: nowrap;
      justify-content: space-between;
      li {
        height: 16rem;
        flex-shrink: 0;
        width: 29%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 1rem;
        justify-content: center;
      }
      li:last-child {
        margin-right: 0;
      }
    }
  }
}

.divider {
  width: 12rem;
  margin: 0 auto;
  .van-divider {
    margin-top: 0;
    color: #333333;
    border-color: #333333;
  }
}

.canBuyItem {
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

.mb15 {
  margin-bottom: 15px;
}
</style>
