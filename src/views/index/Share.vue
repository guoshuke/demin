<template>
  <div class="share">
    <div class="content">
      <van-image src="./share/share_1.png" class="img img1"></van-image>
      <van-image src="./share/share_2.png" class="img img2"></van-image>
      <div class="contentBox">
        <div class="tip">
          ////// 如何获得1000积分 //////
        </div>
        <van-divider class="divider">
          奖励200积分
        </van-divider>
        <div class="bar">好友首次成功兑换一个商品</div>
        <van-divider class="divider">
          奖励800积分
        </van-divider>
        <div class="bar">
          好友每成功兑换商品即可<br />
          获得3%的回馈积分奖励
        </div>
        <van-button class="shareBar" @click="toShare">
          <van-image src="./share/share_3.png" class="img img3"></van-image>
          立即邀请
          <van-image src="./share/share_3.png" class="img img4"></van-image>
        </van-button>
      </div>
      <!--      <van-divider class="divider divider_bottom">-->
      <!--        已邀请好友-->
      <!--      </van-divider>-->
      <!--      <ul class="list">-->
      <!--        <li class="item">-->
      <!--          <van-image src="./share/share_3.png" class="img headImg"></van-image>-->
      <!--          <div class="niceName">Xuewei520</div>-->
      <!--          <div class="point">已贡献500积分</div>-->
      <!--        </li>-->
      <!--      </ul>-->
      <shareModal v-if="showModal" @click="showModal = false"/>
    </div>
  </div>
</template>

<script>
  import shareModal from "@/components/shareModal";
import store from "./store";
export default {
  name: "Share",
  data() {
    return {
      data: null,
        showModal:false
    };
  },
  methods: {
    toShare() {
        debugger
        this.showModal = true
    }
  },
    components:{
        shareModal
    }
};
</script>

<style scoped lang="less">
/*循环翻身*/
@keyframes myAnimate {
  0% {
    top: -0rem;
  }
  50% {
    top: 1rem;
  }
  100% {
    top: -0rem;
  }
}
.share {
  min-height: calc(100vh - 50px);
  background: linear-gradient(to right, #f23d3d, #e9590c);
  .content {
    height: 100%;
    background: url("../../../public/share/share_bg.png") no-repeat center
      center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .img1 {
      width: 20rem;
      margin-top: 2rem;
    }
    .img2 {
      width: 14rem;
    }
    .contentBox {
      width: calc(100% - 2rem);
      box-sizing: border-box;
      margin: 0 1rem;
      color: #333;
      background-color: #fff;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      .tip {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
        margin: 1.2rem;
      }
      .bar {
        background: url("../../../public/share/share_4.png") no-repeat center
          center;
        background-size: 100% 100%;
        width: 18rem;
        height: 4.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 1.2rem;
        &:first-child {
          font-size: 1.4rem;
        }
      }
      .shareBar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 9rem;
        height: 3rem;
        background: linear-gradient(
          180deg,
          rgba(251, 117, 88, 1),
          rgba(244, 51, 42, 1)
        );
        color: #fff;
        border-radius: 1rem;
        font-size: 1.2rem;
        font-weight: 500;
        margin: 2rem 0;
        position: relative;
        .img {
          width: 1rem;
          height: 1rem;
          top: 1rem;
        }
        .img3 {
          position: absolute;
          left: 0.8rem;
          animation: myAnimate 1s infinite linear;
        }
        .img4 {
          position: absolute;
          right: 0.7rem;
          transform: rotateY(180deg);
          animation: myAnimate 1s infinite linear;
        }
      }
    }
    .divider {
      color: #f23d3d;
      border-color: #f23d3d;
      width: 100%;
      padding: 0 5rem;
      box-sizing: border-box;
      font-weight: 500;
      font-size: 1.2rem;
    }
    .divider_bottom {
      color: #fff;
      border-color: #fff;
    }
  }
  .list {
    width: 100%;
    box-sizing: border-box;
    padding: 0 1rem;
    .item {
      display: flex;
      align-items: center;
      width: 100%;
      color: #fff;
      .headImg {
        height: 3.3rem;
        width: 3.3rem;
      }
      .niceName {
        flex: 1;
        margin-left: 1rem;
        font-weight: 400;
        font-size: 1rem;
      }
      .point {
        font-size: 1rem;
        font-weight: 400;
        color: #efefef;
      }
    }
  }
}
</style>
