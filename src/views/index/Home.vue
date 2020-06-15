<template>
  <div class="home">
    <div class="fixed_top" :style="{ background: `rgba(0, 0, 0, ${opacity})` }">
      <div class="location" @click="$toast('更多城市入驻中')">
        <van-icon name="aim"/>
        <span>扬州市</span>
        <van-icon name="arrow-down"/>
      </div>
      <form action="/" class="form">
        <van-search
                v-model="value"
                placeholder="请您输入商品名称"
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
        <van-swipe-item v-for="n in data.bannerList" :key="n.id">
          <van-image :src="n.bannerUrl" fit="cover" @load="imgLoad"/>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="newUser home_block" @click="showNew" v-if="!isMini">
      <van-image src="./home/newP.png"/>
    </div>

    <div class="funcBar home_block mb15">
      <van-grid :column-num="5" :border="false">
        <van-grid-item
                v-for="n in data.itemsList"
                :key="n.id"
                @click="
            goGoodsList({
              type: 'parentItemId',
              parentItemId: n.id,
              className: n.itemName
            })
          "
        >
          <van-image :src="n.imageUrl"/>
          <span>{{ n.itemName }}</span>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="superScrabble home_block mb15" v-if="!isMini">
      <van-cell class="custom">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">助力免单</span>
          <span class="custom-title-sub">嗨购时刻 超值抢购</span>
        </template>
        <template slot="default" class="test">
          <!--          <span class="custom-title-right">查看更多</span>-->
        </template>
      </van-cell>
      <ul class="superScrabble_title">
        <li>
          <div class="calc">1</div>
          <span>选择奖励</span>
          <van-icon name="down"/>
        </li>
        <li>
          <div class="calc">2</div>
          <span>邀请好友助力</span>
          <van-icon name="down"/>
        </li>
        <li>
          <div class="calc">3</div>
          <span>团满发货</span>
          <van-icon name="down"/>
        </li>
      </ul>
      <div class="superScrabble_box">
        <ul class="superScrabble_list scrollBar">
          <li v-for="n in data.zeroGoodsList" @click="goHelpFree(n.goodsId)">
            <van-image
                    class="goodsImg"
                    :src="n.goodsSmallUrl || 'https://img.yzcdn.cn/vant/apple-1.jpg'"
            />
            <span class="goodsName">{{ n.goodsName }}</span>
            <span class="red">{{ 0 }} 积分</span>
            <!--            <span class="helpNum">已有100+人成功</span>-->
            <div class="icon">
              <van-image src="./home/style.png" class="icon_img"/>
              爆品 <br/>
              助力
            </div>
            <div class="go">GO</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="newGoods home_block mb15">
      <van-cell
              is-link
              class="custom"
              @click="goGoodsList({ type: 'typeId', typeId: 1 })"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">新品推荐</span>
          <span class="custom-title-sub">第一时间获取好物</span>
        </template>
        <template slot="default" class="test">
          <span class="custom-title-right">查看更多</span>
        </template>
      </van-cell>
      <ul class="newGoods_list scrollBar">
        <li
                v-for="n in data.newGoodsList"
                :key="n.goodsId"
                @click="goGoodsDetail(n.goodsId)"
        >
          <van-image
                  :src="n.goodsSmallUrl || 'https://img.yzcdn.cn/vant/apple-1.jpg'"
          />
          <span class="goodsName">{{ n.goodsName }}</span>
          <span class="red">{{ n.integral }} 积分</span>
        </li>
      </ul>
    </div>

    <div class="hotGoods">
      <div class="hotGoods_Content">
        <van-cell
                class="hotGoods_Content_title"
                @click="goGoodsList({ type: 'typeId', typeId: 2 })"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <span class="custom-title">爆款清单</span>
            <span class="custom-subtitle">好物推荐 生猛来袭</span>
          </template>
          <template slot="default" class="test">
            <div class="custom-title-right">
              <span>查看更多</span>
              <van-icon name="arrow" style="line-height: inherit;"/>
            </div>
          </template>
        </van-cell>
        <ul class="hotGoods_Content_list scrollBar">
          <li
                  v-for="n in data.bomGoodsList"
                  :key="n.goodsId"
                  @click="goGoodsDetail(n.goodsId)"
          >
            <van-image
                    :src="n.goodsSmallUrl || 'https://img.yzcdn.cn/vant/apple-1.jpg'"
            />
            <span class="goodsName">{{ n.goodsName }}</span>
            <span class="red">{{ n.integral }} 积分</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="pointSelect">
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item
                class="point_box"
                @click="goGoodsList({ upLimit: 5000 })"
        >
          <div class="point">
            <span class="pointText">5000积分以下</span>
            <span class="pointSubText pl8">生活好物</span>
          </div>
          <van-image class="bg-image" fit="cover" src="./home/p5000.png"/>
        </van-grid-item>
        <van-grid-item class="rightPoint">
          <van-grid :column-num="1" :gutter="10" class="rightBox">
            <van-grid-item
                    @click="goGoodsList({ upLimit: 10000, downLimit: 5000 })"
            >
              <div class="point">
                <div class="pointText hadLine">5千-1万积分</div>
                <div class="pointSubText pt1rem">只为品质生活</div>
              </div>
              <van-image class="bg-image" fit="cover" src="./home/p10000.png"/>
            </van-grid-item>
            <van-grid-item @click="goGoodsList({ downLimit: 10000 })">
              <div class="point">
                <div class="pointText hadLine">1万积分以上</div>
                <div class="pointSubText pt1rem">只为品质生活</div>
              </div>
              <van-image
                      class="bg-image"
                      fit="cover"
                      src="./home/p10000+.png"
              />
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
        <van-grid-item
                class="canBuyItem"
                v-for="(n, i) in list"
                :key="i"
                @click="goGoodsDetail(n.goodsId)"
        >
          <van-image
                  :src="n.goodsSmallUrl || 'https://img.yzcdn.cn/vant/apple-1.jpg'"
          />
          <div class="canBuyItem_title goodsName">
            {{ n.goodsName }}
          </div>
          <div class="canBuyItem_subTitle">
            <span class="canBuyItem_needPoint">{{ n.integral || 0 }}积分</span>
            <!--            <span class="canBuyItem_num">已兑换99+件</span>-->
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
    <HelpStatus ref="HelpStatus" :details="details" :status="status"/>
  </div>
</template>

<script>
    import {request, api} from "@/request";
    import HelpStatus from "@/components/HelpStatus";
    import store from "./store";
    import _ from "lodash";
    import common from "@/utils/request";
    import {mapState} from "vuex";

    export default {
        name: "home",
        data() {
            return {
                swipeHeight: 0,
                data: {
                    bannerList: [],
                    itemsList: [],
                    zeroGoodsList: [],
                    newGoodsList: [],
                    bomGoodsList: []
                },
                funcList: [
                    {
                        id: 1,
                        itemName: "热门推荐",
                        imageUrl: "./home/icon_1.png"
                    },
                    {
                        id: 2,
                        itemName: "家居日用",
                        imageUrl: "./home/icon_2.png"
                    },
                    {
                        id: 3,
                        itemName: "饮食健康",
                        imageUrl: "./home/icon_3.png"
                    },
                    {
                        id: 4,
                        itemName: "家用电器",
                        imageUrl: "./home/icon_4.png"
                    },
                    {
                        id: 5,
                        itemName: "家纺家饰",
                        imageUrl: "./home/icon_5.png"
                    },
                    {
                        id: 6,
                        itemName: "数码生活",
                        imageUrl: "./home/icon_6.png"
                    },
                    {
                        id: 7,
                        itemName: "母婴亲子",
                        imageUrl: "./home/icon_7.png"
                    },
                    {
                        id: 8,
                        itemName: "箱包手袋",
                        imageUrl: "./home/icon_8.png"
                    },
                    {
                        id: 9,
                        itemName: "个护时尚",
                        imageUrl: "./home/icon_9.png"
                    },
                    {
                        id: 10,
                        itemName: "汽车用品",
                        imageUrl: "./home/icon_10.png"
                    }
                ],
                images: [
                    "https://img.yzcdn.cn/vant/apple-1.jpg",
                    "https://img.yzcdn.cn/vant/apple-2.jpg"
                ],
                loading: false,
                finished: false,
                list: [],
                value: "",
                show: false,
                resData: {currentPage: 0, pageSize: 10},
                details: [],
                isNew: 0,
                opacity: 0.3,
                status: 2
            };
        },
      computed:{
        ...mapState(['isMini'])
      },
        methods: {
            goGoodsDetail(id) {
                // id 商品的id
                _.isNumber(id)
                    ? this.$router.push(`goodsDetail?goodsId=${id}`)
                    : this.$toast("商品id未找到");
            },
            goGoodsList(item) {
                if (item.parentItemId === 0 && item.type == "parentItemId") {
                    this.$toast("敬请期待");
                    return;
                }
                this.$router.push(`goodsList?object=${JSON.stringify(item)}`);
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
                this.resData.currentPage++;
                this.loading = true;
                this.requestList();
            },
            toSearch() {
                this.$router.push(`search`);
            },
            goHelpFree(id) {
                this.$router.push(`free?goodsId=` + id);
            },
            requestHomeData() {
                const me = this;
                request
                    .get(api.allList)
                    .then(res => {
                        console.log(res);
                        let data = {
                            code: 200,
                            message: "Lorem sint",
                            data: {
                                bannerList: [
                                    {
                                        id: 493,
                                        bannerUrl: ""
                                    },
                                    {
                                        id: 703,
                                        bannerUrl: ""
                                    }
                                ],
                                itemsList: [
                                    // {
                                    //     id: 246,
                                    //     itemName: "热门推荐",
                                    //     imageUrl: "./home/icon_1.png"
                                    // }
                                ],
                                zeroGoodsList: [
                                    {
                                        goodsId: 827,
                                        goodsName: "mollit",
                                        goodsSmallUrl: "",
                                        integral: 63
                                    },
                                    {
                                        goodsId: 166,
                                        goodsName: "pariatur",
                                        goodsSmallUrl: "",
                                        integral: 817
                                    },
                                    {
                                        goodsId: 538,
                                        goodsName: "Duis",
                                        goodsSmallUrl: "",
                                        integral: 654
                                    },
                                    {
                                        goodsId: 685,
                                        goodsName: "cillum",
                                        goodsSmallUrl: "",
                                        integral: 109
                                    }
                                ],
                                newGoodsList: [
                                    {
                                        goodsId: 242,
                                        goodsName: "culpa",
                                        goodsSmallUrl: "",
                                        integral: 935
                                    },
                                    {
                                        goodsId: 339,
                                        goodsName: "labore",
                                        goodsSmallUrl: "",
                                        integral: 988
                                    },
                                    {
                                        goodsId: 134,
                                        goodsName: "exerci",
                                        goodsSmallUrl: "",
                                        integral: 648
                                    },
                                    {
                                        goodsId: 942,
                                        goodsName: "consequat",
                                        goodsSmallUrl: "",
                                        integral: 377
                                    },
                                    {
                                        goodsId: 101,
                                        goodsName: "deserunt",
                                        goodsSmallUrl: "",
                                        integral: 986
                                    }
                                ],
                                bomGoodsList: [
                                    {
                                        goodsId: 866,
                                        goodsName: "dolo",
                                        goodsSmallUrl: "",
                                        integral: 806
                                    },
                                    {
                                        goodsId: 134,
                                        goodsName: "adipisicing",
                                        goodsSmallUrl: "",
                                        integral: 763
                                    },
                                    {
                                        goodsId: 689,
                                        goodsName: "sedame",
                                        goodsSmallUrl: "",
                                        integral: 511
                                    },
                                    {
                                        goodsId: 639,
                                        goodsName: "enimanim",
                                        goodsSmallUrl: "",
                                        integral: 407
                                    },
                                    {
                                        goodsId: 613,
                                        goodsName: "nisi in",
                                        goodsSmallUrl: "",
                                        integral: 5945
                                    }
                                ]
                            }
                        };
                        res.data.data.itemsList.forEach(item => {
                            me.funcList.forEach(n => {
                                if (n.itemName == item.itemName) {
                                    item.imageUrl = n.imageUrl;
                                    if (data.data.itemsList.length < 11) {
                                        data.data.itemsList.push(item);
                                    }
                                }
                            });
                        });
                        console.log(data.data.itemsList);
                        // res.data.data.itemsList.unshift({
                        //     id: 246,
                        //     itemName: "热门推荐",
                        //     imageUrl: "./home/icon_1.png"
                        // });
                        // res.data.data.itemsList.length = 10;
                        me.data = res.data.data;
                        me.showPopup();
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                        // console.log("end");
                        // this.goGoodsDetail(3);
                    });
            },
            getSyncIntegral(){
                const me = this;

                request
                    .post(api.SyncIntegral)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                        // console.log("end");
                        // this.goGoodsDetail(3);
                    });
            },
            requestList() {
                const me = this;
                request
                    .post(api.myGoods, this.resData)
                    .then(res => {
                        res = res.data;
                        console.log(res);
                        let data = {
                            code: 200,
                            message: "Lorem sint",
                            data: []
                        };

                        if (res.code != "200") {
                            me.finished = true;
                            console.log("end");
                        } else {
                            me.list = me.list.concat(res.dataList);
                            if (res.totalPage <= res.pageIndex) {
                                me.finished = true;
                            }
                        }
                        // me.data = data.data;
                    })
                    .catch(err => {
                        console.log(err);
                        me.finished = true;
                    })
                    .finally(() => {
                        me.loading = false;
                    });
            },
            showModal() {
                this.details = this.data.zeroGoodsList.slice(0, 2);
                console.log("助力要展示的商品是--------", this.details);
                let parentOpenId = localStorage.getItem("openId");
                if (parentOpenId !== this.loginInfo.openId) {
                    if(!this.isMini){
                      this.$refs.HelpStatus.showModal();
                    }
                }
            },
            showNew(){
                this.status = 7
                this.showModal()
            },
            setOpacity() {
                let me = this;
                window.onscroll = function (n) {
                    me.opacity = window.scrollY / 500 < 0.3 ? window.scrollY / 500 : 0.3;
                    // opacity
                };
            },
            closeModal() {
                console.log("closeModal");
                let me = this;
                setTimeout(() => {
                    if (me.loginInfo.isNew) {
                        me.status = 7;
                        me.showModal();
                    }
                }, 300);
            },
            showPopup() {
                // 0 助力失败  1  助力成功   2 新人
                this.loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
                const pOpenId = common.getQueryString("openId");
                const powerSurfaceId = common.getQueryString("powerSurfaceId");
                const goodsId = common.getQueryString("goodsId");
                const isShare = common.getQueryString("isShare")
                let helpList = localStorage.getItem("helpList") ? JSON.parse(localStorage.getItem("helpList")) : [];
                // alert("弹框检查----------邀请人的id是: " + pOpenId + "-------商品的Id是: " + goodsId + "---------助力单号是: " + powerSurfaceId + "helpList: " + helpList)
                if (_.isNumber(helpList)) {
                    helpList = []
                }
                // 是不是助力
                // 有助力单算是助力   如果是本人就跳到助力单详情页 否则就弹框提示助力成功或者失败  只能提示一次
                // 无助力单算是新人或者老人进行绑定   有

                if (powerSurfaceId && !helpList.includes(powerSurfaceId)) {
                    // 只会在第一次弹框
                    helpList.push(powerSurfaceId)
                    localStorage.setItem("helpList", JSON.stringify(helpList))
                    // 如果是本人则跳到助力单中去
                    if (pOpenId == this.loginInfo.openId && goodsId) {
                        this.goHelpFree(goodsId);
                    } else {
                        if(_.isBoolean(this.loginInfo.flag) ){
                            this.status = this.loginInfo.flag ? 0 : 8
                        }else {
                            this.status = this.loginInfo.flag;
                        }
                        if(helpList.length > 1){
                            // 已经有一个助力 添加第二个助力的时候 提示不是新用户
                            this.status = 1
                        }
                        this.showModal();
                    }
                } else {
                    if (this.loginInfo.isNew == 1) {
                        // 新用户进来之后 就不能助力了
                        this.status = 7;
                        this.showModal();
                        // 新人绑定
                    }
                    if(isShare){
                        store.commit("bindFather");
                    }
                }
            },
        },
        components: {
            HelpStatus
        },
        created() {
            this.setOpacity();
            this.status = 2;
            this.requestHomeData();
            this.getSyncIntegral();
        },
        mounted() {
            this.resData.currentPage = 0
            store.commit("toShare");
          // alert(this.isMini)
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
    z-index: 11;
    width: 100%;
    align-items: center;
    color: #fff;

    .location {
      padding-left: 12px;
      display: flex;
      align-items: center;

      * {
        padding: 0 1px;
      }
    }
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

  .swipe {
    .van-image {
      /*min-height: 50vw;*/
    }

    img {
      width: 100vw;
    }
  }

  .newUser {
    height: 120px;
    display: flex;
    width: 100vw;
    padding: 2rem 1rem;
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
    height: 16.5rem;
    display: flex;

    /deep/ .van-grid-item__content {
      padding: 10px 4px;

      .van-image {
        padding: 1rem;
      }
    }
  }

  .newGoods {
    .newGoods_list {
      height: 16rem;
      padding: 1rem;

      li {
        width: 33.3333vw;
        margin-right: 1rem;
        justify-content: space-evenly;
      }

      li:last-child {
        margin-right: 0;
      }
    }
  }

  .superScrabble {
    margin-bottom: 22px;
    width: 100%;

    .superScrabble_title {
      margin: 0 10px;
      background-color: #fef7ed;
      height: 30px;
      line-height: 30px;
      display: flex;
      flex-direction: row;

      li {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

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
          font-size: 12px;
          color: #b5a37b;
          text-align: center;
        }

        i {
          transform: rotate(-90deg);
          color: #b5a37b;
        }

        &:last-child {
          i {
            visibility: hidden;
          }
        }
      }
    }

    .superScrabble_box {
      width: 100%;
      padding: 1.2rem;
      box-sizing: border-box;

      .superScrabble_list {
        /*height: 18rem;*/
        display: flex;
        flex-direction: row;
        width: 100%;

        li {
          width: 50vw;
          align-items: start;
          height: 100%;
          justify-content: space-evenly;
          border-right: 1px solid #efefef;
          padding: 0 0.6rem;
          position: relative;

          .helpNum {
            font-size: 0.9rem;
            color: #858585;
          }

          .goodsImg {
            height: 13rem;
          }

          .icon {
            position: absolute;
            left: 5px;
            top: 5px;
            width: 3rem;
            height: 3rem;
            z-index: 10;
            color: #fff;
            text-align: center;

            .icon_img {
              position: absolute;
              left: 0;
              top: 0;
              z-index: -1;
            }
          }

          .go {
            position: absolute;
            right: 1rem;
            bottom: 0;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2rem;
            background-color: #f23d3d;
            color: #fff;
            font-size: 1.2rem;
            font-weight: 500;
          }
        }
      }
    }
  }

  .scrollBar {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    white-space: nowrap;
    justify-content: flex-start;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 16rem;
      flex-shrink: 0;
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
        li {
          width: 29%;
          margin-right: 1rem;
          justify-content: space-evenly;
        }
      }
    }
  }

  .pointSelect {
    height: 18rem;

    .point {
      position: absolute;
      z-index: 11;
      left: 16px;
      top: 24px;

      .pointText {
        color: #333;
        font-size: 1.1rem;
        font-weight: 500;
      }

      .pointSubText {
        font-size: 0.8rem;
        font-weight: 300;
        color: #858585;
      }
    }

    /deep/ .van-grid {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      background: transparent;

      .point_box {
        position: relative;
      }

      .rightPoint {
        .van-grid-item__content {
          padding: 0;
        }
      }

      .rightBox {
        padding-left: 0 !important;

        .van-grid-item__content {
          padding: 0;
        }

        .van-grid-item {
          padding-right: 0 !important;
          margin-top: 0 !important;
        }
      }

      .bg-image {
        position: absolute;
        left: 8px;
        top: 16px;
        right: 8px;
        bottom: 16px;
        z-index: 0;
      }
    }
  }

  .divider {
    width: 12rem;
    margin: 0 auto;

    .van-divider {
      color: #333333;
      border-color: #333333;
    }
  }

  .canBuyItem {
    min-height: 18rem;

    .van-image {
      height: 11rem;
    }

    .canBuyItem_title {
      text-align: left;
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
  }

  .mb15 {
    margin-bottom: 15px;
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

  .pl8 {
    padding-left: 8px;
  }

  .pt1rem {
    padding-top: 1rem;
  }

  .hadLine {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 1.8rem;
      width: 2rem;
      height: 3px;
      background-color: #f23d3d;
    }
  }
</style>
