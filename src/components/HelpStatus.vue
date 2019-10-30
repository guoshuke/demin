<template>
  <div class="helpStatus">
    <van-popup
      :close-on-click-overlay="false"
      v-model="show"
      round
      closeable
      @closed="closeModal"
      close-icon="add-o"
      close-icon-position="bottom-left"
    >
      <div class="helpStatus_content">
        <!--        123-&#45;&#45;&#45;&#45; {{ status }}-->
        <div class="title">{{ popupText.title }}</div>
        <div class="sub_title">{{ popupText.subTitle }}</div>
        <div class="content">
          <li v-for="detail in details">
            <van-card
              price="0积分"
              :origin-price="detail.integral + '积分'"
              :thumb="detail.goodsSmallUrl"
            >
              <div slot="title" class="goodsTitle">
                <span class="goodsTitleText">{{ detail.goodsName }}</span>
              </div>
              <div slot="tags">
                <van-tag type="danger">好友助力</van-tag>
                <!--                <van-tag plain type="danger" class="needTag"-->
                <!--                  >需要{{ detail.assistanceCount || 0 }}人</van-tag-->
                <!--                >-->
              </div>
              <div slot="price" class="price">
                0积分
              </div>
              <div slot="origin-price" class="origin-price">
                {{ detail.integral }}积分
              </div>
            </van-card>
            <div class="goFree">
              <van-button
                class="goInviteButton"
                @click="goHelpFree(detail.goodsId)"
                >立即参与</van-button
              >
            </div>
          </li>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["status", "details"],
  name: "HelpStatus",
  computed: {
    popupText() {
      return this.data[this.status];
    }
  },
  data() {
    return {
      show: false,
      data: [
        {
          title: "助力失败",
          subTitle: "您可以发起助力免费拿哦"
        },
        {
          title: "助力成功",
          subTitle: "恭喜您助力成功，发起助力，您也可以免费拿哦"
        },
        {
          title: "新人大礼快来领取",
          subTitle: "免费助力拿拿商品"
        }
      ]
    };
  },
  methods: {
    showModal() {
      console.log(this.status);
      this.show = true;
    },
    closeModal() {
      let me = this;
      let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      // 获取用户信息
      debugger;
      if (this.status == 0 || this.status == 1) {
        loginInfo.flag = false;
        localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
        me.$parent.closeModal();
      } else if (this.status == 2) {
        loginInfo.isNew = 0; // 变成   老人
        localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
      }
    },
    goHelpFree(id) {
      this.$router.push(`free?goodsId=` + id);
    }
  }
};
</script>

<style scoped lang="less">
.helpStatus {
  .helpStatus_content {
    width: 92vw;
    background-color: #f23d3d;
    display: flex;
    flex-direction: column;
  }
  /deep/ .van-popup__close-icon {
    top: initial;
    bottom: 0.9rem;
    left: 50%;
    margin-left: -24px;
    font-size: 2.4rem;
    transform: rotate(45deg);
    color: #fde4c5;
  }
  .title {
    font-size: 1.5rem;
    padding-top: 1rem;
    text-align: center;
    color: #fde4c5;
  }
  .sub_title {
    font-size: 1rem;
    margin: 0.8rem 0;
    text-align: center;
    color: #fde4c5;
  }
  .content {
    background-color: #fff;
    flex: 1;
    margin: 0 1rem 4rem 1rem;
    border-radius: 1rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1rem 0.5rem;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .goFree {
      .goInviteButton {
        width: 6rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: linear-gradient(
          263deg,
          rgba(242, 61, 61, 1),
          rgba(233, 90, 59, 1),
          rgba(242, 61, 61, 1),
          rgba(233, 107, 79, 1)
        );
        border-radius: 2rem;
        color: #fff;
        font-weight: bold;
        font-size: 1.1rem;
        padding: 0 10px;
      }
    }
    /deep/ .van-card {
      background-color: #ffffff;
      padding: 15px 2px;
    }

    .goodsTitle {
      margin-bottom: 1rem;
    }
    .goodsTitleText {
      font-weight: 500;
      color: #333;
      font-size: 1.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .needTag {
      background-color: #fcf2f2;
      &:after {
        border: 0;
      }
    }
    .price {
      color: #f23d3d;
      font-size: 1.1rem;
    }
    .origin-price {
      color: #858585;
      text-decoration: line-through;
    }
    /deep/ .van-card__thumb {
      width: 75px;
      height: 75px;
    }
  }
}
</style>
