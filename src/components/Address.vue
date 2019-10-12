<template>
  <div class="address">
    <!--    地址管理-->
    <van-popup v-model="showAddress" position="bottom">
      <van-nav-bar
        title="选择地址"
        left-arrow
        @click-left="showAddress = false"
      />
      <van-address-list
        v-model="editingContactId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>
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
      />
    </van-popup>
  </div>
</template>

<script>
import areaList from "@/utils/areaList";
import { request, api } from "@/request";
export default {
  name: "Address",
  data() {
    return {
      areaList,
      showAddress: false,
      showEdit: false,
      isEdit: false,
      addressInfo: {},
      list: []
    };
  },

  methods: {
    // 添加地址
    onAdd() {
      this.isEdit = false;
      this.showEdit = true;
      this.addressInfo = {};
    },

    // 编辑地址
    onEdit(item, i) {
      this.isEdit = true;
      this.showEdit = true;
      item.addressDetail = item.address;
      this.addressInfo = item;
      console.log(item);
      console.log(i);
      debugger;
    },

    // 选中地址
    onSelect(n) {
      debugger;
      this.showList = false;
      this.editingContact = n;
      this.editingContactId = n.id;
    },

    // 保存地址
    onSave(info) {
      const me = this;
      this.showEdit = false;
      this.showList = false;
      info.address = info.addressDetail;

      if (info.id) {
        this.list = this.list.map(item => {
          return item.id === info.id ? info : item;
        });
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
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
            me.getAddressList();
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },

    // 删除地址
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
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
                  areaCode: n.areaCode
                };
                r.push(obj);
                if (n.isDefault) {
                  me.editingContact = obj;
                  me.editingContactId = obj.id;
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
  }
};
</script>

<style scoped lang="less">
.address {
  /*/deep/ .van-radio__icon {*/
  /*  display: none;*/
  /*}*/
}
</style>
