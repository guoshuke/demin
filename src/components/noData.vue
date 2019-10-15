<template>
  <div :class="noDataClass + ' noData'">
    <van-image src="./user/noData.png" />
    <div class="noDataText">
      {{ text || "暂无积分数据" }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["text", "noDataClass"],
  name: "noData",
  data() {
    return {};
  }
};
</script>
<style scoped lang="less">
.noData {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20rem;
  .van-image {
    width: 8rem;
  }
  .noDataText {
    color: #858585;
    font-size: 1.1rem;
    font-weight: 400;
    margin-top: 1rem;
  }
}
</style>
