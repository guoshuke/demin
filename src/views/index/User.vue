<template>
  <div class="user">
    <div class="myRedeem">
      <div class="myList">
        <div class="listTitle">我的兑换</div>
        <div class="listTitle_sub">查看更多</div>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User"
};
</script>

<style scoped lang="less">
.user {
  .myRedeem {
    .myList {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #efefef;
      height: 2.5rem;
      padding: 0 2rem;
      .listTitle {
        flex: 1;
      }
    }
  }
}
</style>
