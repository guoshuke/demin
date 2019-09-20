<template>
  <div class="home">
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

    <div class="newUser home_block">
      <img v-lazy="images[0]" />
    </div>

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
        <div class="hotGoods_Content_title"></div>
        <div class="hotGoods_Content_list"></div>
      </div>
    </div>

    <div class="pointSelect"></div>

    <div class="iCanBuy"></div>
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
      ]
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
  font-size: 21px;
  font-weight: 600;
  color: #333;
}
.custom-title-sub {
  font-size: 15px;
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
    }
  }
}

.mb15 {
  margin-bottom: 15px;
}
</style>
