<template>
  <div class="address">
    <van-nav-bar title="地址列表" left-arrow @click-left="$router.back(-1)" />
    <van-address-list
      v-model="activeId"
      :list="list"
      :switchable="false"
      @add="onAdd"
      @edit="onEdit"
    />
    <van-popup v-model="showEdit" position="bottom">
      <van-nav-bar
        :title="isEdit ? '编辑地址' : '新增地址'"
        left-arrow
        @click-left="showEdit = false"
      />
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-delete
        show-set-default
        @save="onSave"
        @delete="onDelete"
        :style="{ height: '100vh' }"
      />
    </van-popup>
  </div>
</template>

<script>
import areaList from "@/utils/areaList";
import { request, api } from "@/request";
import _ from "lodash";
import utils from "@/utils";
export default {
  name: "Address",
  data() {
    return {
      areaList,
      activeId: null,
      list: [],
      showEdit: false,
      isEdit: false,
      addressInfo: {}
    };
  },

  methods: {
    onAdd() {
      this.isEdit = false;
      this.showEdit = true;
      this.addressInfo = {};
    },

    onEdit(item, index) {
      this.isEdit = true;
      this.showEdit = true;
      console.log(item);
      item.areaCode = item.areaCode + "";
      item.addressDetail = _.drop(item.address.split(" ")).join(" ");
      this.addressInfo = item;
    },
    onSave(info) {
      let me = this;
      let sendData = {
        address: info.addressDetail,
        userName: info.name,
        phone: info.tel,
        isDefault: Number(info.isDefault),
        areaCode: info.areaCode - 0
      };
      if (info.id) {
        sendData.id = info.id;
      }
      request
        .post(api.addAddress, sendData)
        .then(res => {
          if (res.data.code == "200") {
            // 因为组件要他们的格式  所以转换一次
            me.getAddressList(info);
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          me.showEdit = false;
        });
    },
    onDelete(info) {
      let me = this;
      console.log(info);
      if (info.id) {
        request
          .get(api.deleteAddress + info.id)
          .then(res => {
            if (res.data.code == "200") {
              me.getAddressList();
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {});
      }
      this.showEdit = false;
    },
    getAddressList() {
      const me = this;
      request
        .get(api.addressList)
        .then(res => {
          if (res.data.code == "200") {
            // 因为组件要他们的格式  所以转换一次
            me.list = _.transform(
              res.data.data,
              (r, n) => {
                let obj = {
                  id: n.id,
                  address: n.address,
                  name: n.userName,
                  tel: n.phone,
                  areaCode: n.areaCode,
                  isDefault: !!n.isDefault
                };
                obj.address =
                  utils.getAddress(obj.areaCode) + " " + obj.address;
                r.push(obj);
                if (n.isDefault) {
                  me.activeId = obj.id;
                }
              },
              []
            );
          } else {
            me.list = [];
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    }
  },
  mounted() {
    this.getAddressList();

  }
};
</script>

<style scoped lang="less">
.address {
  /*/deep/ .van-radio__icon {*/
  /*  display: none;*/
  /*}*/
  .van-address-list__add {
    z-index: 10;
  }
}
</style>
