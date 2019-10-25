<template>
  <div class="pointsDetails">
    <div class="infoBox">
      <div class="info_up">
        <div class="info_up_title">当前积分</div>
        <div class="info_up_text">{{ pointInfo.totalIntegral || 0 }}</div>
      </div>
      <div class="info_down">
        <div class="info_down_item">
          <div class="info_down_item_title">平台积分</div>
          <div class="info_down_item_text">
            {{ pointInfo.platformIntegral || 0 }}
          </div>
        </div>
        <div class="info_down_item">
          <div class="info_down_item_title">商家积分</div>
          <div class="info_down_item_text">
            {{ pointInfo.mallIntegral || 0 }}
          </div>
        </div>
      </div>
    </div>
    <div class="funcBar">
      <div class="funcBar_items" @click="$router.replace('/share')">赚积分</div>
      <div class="funcBar_items" @click="$router.replace('/')">花积分</div>
    </div>
    <div class="listBox">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
                class="list"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getList"
                v-if="dataList.length"
        >
          <li v-for="(n, i) in dataList" :class="{lastLi:i === dataList.length - 1}">
            <div class="cacl">{{ (n.type ? "" : "-") + n.mallIntegral }}</div>
            <div class="point_info">
              <div class="point_info_title ">
                {{ n.remark }}
              </div>
              <div class="point_info_other">
                {{n.createTime}}
                {{
                !n.type && n.platformIntegral
                ? `(其中消耗平台积分${n.platformIntegral})`
                : ""
                }}
              </div>
            </div>
          </li>
        </van-list>
      </van-pull-refresh>
      <noData :text="'暂无积分记录'" v-if="!dataList.length" />
    </div>

    <shareModal v-if="showModal" @closeShareModal="closeShareModal"/>
  </div>
</template>

<script>
import { request, api } from "@/request";
import noData from "@/components/noData";
import shareModal from "@/components/shareModal";
export default {
  name: "PointsDetails",
  props: ["pointInfo"],
  data() {
    return {
      showPoint: false,
      showModal: false,
      dataList: [],
      resData: {
        pageSize: 9999,
        currentPage: 0
      },
        loading:false,
        finished:false,
        isLoading:false,
    };
  },
  methods: {
      openModal() {
        this.showPoint = true;
        this.onRefresh();
      },
      onRefresh(){
          this.resData.currentPage = 0
          this.finished = false
          this.isLoading = false,
          this.getList()
      },
      getList() {
          this.loading = true
        const me = this;
        this.dataList = [];
        this.resData.currentPage++;
        request
          .post(api.pointsDetails, this.resData)
          .then(res => {
            console.log(res.data);
              me.dataList = res.data.dataList;
              me.loading = false
              me.isLoading = false
              if(res.data.isLastPage){
                  me.finished = true
              }
          })
          .catch(err => {
            console.log(err);
              me.finished = true
              me.loading = false
          })
      },
      closeShareModal(){
        this.showModal = false
      },
  },
  mounted() {
    this.getList();
  },
  components: {
      noData,
      shareModal
  }
};
</script>

<style scoped lang="less">
.pointsDetails {
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  .infoBox {
    background: url("../../../../public/user/point_bg.png") center center
      no-repeat;
    background-size: cover;
    height: 16rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
    .info_up {
      text-align: center;
      .info_up_title {
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      .info_up_text {
        font-size: 2rem;
        font-weight: 600;
      }
    }
    .info_down {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;
      text-align: center;
      font-weight: 400;
      .info_down_item_title {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }
      .info_down_item_text {
        font-size: 1.1rem;
      }
    }
  }
  .funcBar {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 3rem;
    padding: 0.5rem 1rem;
    margin-top: -2rem;
    border-bottom: 1rem solid #efefef;
    .funcBar_items {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      font-size: 1.2rem;
      font-weight: 400;
      color: #333;
      height: 100%;
      &:first-child {
        border-right: 1px solid #efefef;
      }
    }
  }
  .listBox {
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .lastLi{
      &::after {
        height: 0;
      }
    }
    li {
      width: 100%;
      display: flex;
      margin: 1rem 0;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 2.5rem;
        top: -1rem;
        height: 1rem;
        background-color: #f23d3d;
        width: 1px;
      }
      &:after {
        content: "";
        position: absolute;
        left: 2.5rem;
        bottom: -1rem;
        height: 1rem;
        background-color: #f23d3d;
        width: 1px;
      }
      &:first-child {
        &::before {
          height: 0;
        }
      }

      .cacl {
        flex-shrink: 0;
        width: 5rem;
        height: 5rem;
        border-radius: 2.5rem;
        border: 1px solid #f23d3d;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f23d3d;
        font-size: 1rem;
        font-weight: 400;
      }
      .point_info {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .point_info_title {
          color: #333;
          font-weight: 400;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .point_info_other {
          font-size: 0.8rem;
          font-weight: 400;
          color: #858585;
        }
      }
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
</style>
