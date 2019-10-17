<template>
  <div class="shareModal" @click="closeShareModal">
    <div class="right">
      <van-image src="./share/shareTip.png" />
    </div>
    <div class="center">
      <van-image src="./share/shareCenter.png" />
    </div>
  </div>
</template>

<script>
    export default {
        name: "shareModal",
        methods:{
            closeShareModal(){
                this.$emit('closeShareModal')
            }
        }
    }
</script>

<style scoped lang="less">
  .shareModal{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vh;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    z-index: 100;
    .right{
      position: fixed;
      width: 9rem;
      right: 1rem;
      top: 1rem;
    }
    .center{
      position: fixed;
      left: 50%;
      margin-left: -6rem;
      margin-top: -6rem;
      top: 50%;
      width: 12rem;
    }
  }
</style>
