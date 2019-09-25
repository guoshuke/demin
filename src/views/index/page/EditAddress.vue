<template>
  <div class="editAddress">
    <van-nav-bar
      :title="id ? '编辑地址' : '新增地址'"
      left-arrow
      @click-left="$router.back(-1)"
    />
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
export default {
  name: "editAddress",
  data() {
    return {
      id: null,
      areaList: {},
      searchResult: []
    };
  },
  activated() {
    this.id = this.$route.params.id;
    console.log(this.id);
  },
  methods: {
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>

<style scoped></style>
