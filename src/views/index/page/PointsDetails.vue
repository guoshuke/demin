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
      <div class="funcBar_items">赚积分</div>
      <div class="funcBar_items">花积分</div>
    </div>
    <div class="listBox">
      <ul class="list" v-if="dataList.length">
        <li v-for="n in dataList">
          <div class="cacl">{{ (n.type ? "" : "-") + n.mallIntegral }}</div>
          <div class="point_info">
            <div class="point_info_title">
              {{ n.remark }}
            </div>
            <div class="point_info_other">
              2019-09-17 15:00:00
              {{
                !n.type && n.platformIntegral
                  ? `(其中消耗平台积分${n.platformIntegral})`
                  : ""
              }}
            </div>
          </div>
        </li>
      </ul>
      <noData :text="'暂无积分记录'" v-if="!dataList.length" />
    </div>
  </div>
</template>

<script>
import { request, api } from "@/request";
import noData from "@/components/noData";
export default {
  name: "PointsDetails",
  props: ["pointInfo"],
  data() {
    return {
      showPoint: false,
      dataList: [],
      resData: {
        pageSize: 10,
        currentPage: 0
      }
    };
  },
  methods: {
    openModal() {
      this.showPoint = true;
      this.getList();
    },
    getList() {
      const self = this;
      this.dataList = [];
      this.resData.currentPage++;

      request
        .post(api.pointsDetails, this.resData)
        .then(res => {
          console.log(res.data);
          self.dataList = res.data.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getList();
  },
  components: {
    noData
  }
};
</script>

<style scoped lang="less">
.pointsDetails {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
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
    .list {
      width: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    li {
      width: 100%;
      display: flex;
      margin: 1.5rem 0;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 2rem;
        top: -1.8rem;
        height: 1.8rem;
        background-color: #f23d3d;
        width: 1px;
      }
      &:after {
        content: "";
        position: absolute;
        left: 2rem;
        bottom: -1.4rem;
        height: 2rem;
        background-color: #f23d3d;
        width: 1px;
      }
      &:first-child {
        margin-top: 1rem;
        &::before {
          height: 0;
        }
      }
      &:last-child {
        margin-bottom: 1rem;
        &::after {
          height: 0;
        }
      }

      .cacl {
        width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        border: 1px solid #f23d3d;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f23d3d;
        font-size: 1rem;
        font-weight: 400;
      }
      .point_info {
        margin-left: 2rem;
        display: flex;
        flex-direction: column;
        width: calc(100vw - 8rem);
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
}
</style>
