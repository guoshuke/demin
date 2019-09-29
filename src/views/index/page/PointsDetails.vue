<template>
  <div class="pointsDetails">
    <van-nav-bar title="积分明细" left-arrow @click-left="$router.back(-1)" />
  </div>
</template>

<script>
import { request, api } from "@/request";
export default {
  name: "PointsDetails",
  data() {
    return {
      data: { dataList: [] }
    };
  },
  activated() {
    const self = this;
    this.data.dataList = [];
    request
      .post(api.pointsDetails)
      .then(res => {
        console.log(res.data);
        self.data = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="less">
.pointsDetails {
}
</style>
