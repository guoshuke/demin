<template>
  <div class="classify">
    <form action="/" class="form">
      <van-search
        v-model="value"
        placeholder="请您输入商品、品牌名称"
        readonly
        @click="toSearch"
        @cancel="onCancel"
      />
    </form>
    <van-tree-select
      height="calc(100vh - 115px)"
      :items="items"
      :main-active-index.sync="activeIndex"
    >
      <template slot="content">
        <div v-for="(v, i) in items" :key="i" v-if="i == activeIndex">
          <div class="items" v-for="t in v.children">
            <div class="subMenu">
              {{ t.text }}
            </div>
            <van-grid :border="false" :column-num="3">
              <van-grid-item
                v-for="n in t.children"
                :key="n.id"
                @click="goGoodsList({ type: 'itemCatId', itemCatId: n.id })"
              >
                <van-image :src="n.image" class="subMenu_img" />
                <span class="subMenu_sub">{{ n.text }}</span>
              </van-grid-item>
            </van-grid>
            <van-divider class="divider" />
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import _ from "lodash";
import { request, api } from "../../request";
export default {
  name: "Classify",
  data() {
    return {
      activeIndex: 0,
      items: [],
      value: ""
    };
  },
  methods: {
    toSearch() {
      this.$router.push(`search`);
    },
    onCancel() {
      console.log(2);
    },
    getList() {
      request
        .get(api.list)
        .then(res => {
          console.log(res.data);
          // todo 判断code
          // 假设成功
          this.items = _.transform(
            res.data.data,
            (r, n, k) => {
              let temp = {
                text: n.itemName,
                id: n.id,
                children: []
              };
              _.transform(
                n.itemsList,
                (r1, n1, k1) => {
                  let temp1 = {
                    text: n1.itemName,
                    id: n1.id,
                    children: []
                  };
                  _.transform(
                    n1.itemsList,
                    (r2, n2, k2) => {
                      let temp2 = {
                        text: n2.itemName,
                        id: n2.id,
                        image: "https://img.yzcdn.cn/vant/apple-2.jpg"
                      };
                      r2.push(temp2);
                    },
                    temp1.children
                  );
                  r1.push(temp1);
                },
                temp.children
              );
              r.push(temp);
            },
            []
          );
          // this.items = res.data.data;
          console.log(this.items);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          // this.goGoodsDetail(3);
        });
    },
    goGoodsList(item) {
      this.$router.push(`goodsList?object=${JSON.stringify(item)}`);
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped lang="less">
.classify {
  background-color: #f9f9f9;
  /deep/ .van-tree-select__content {
    flex: 3;
    background-color: #f9f9f9;
  }
  .form {
    /deep/ .van-search {
      .van-search__content {
        padding-left: 0;
      }
      background: #f9f9f9 !important;
      padding: 1rem;
      .van-cell {
        border: 1px solid rgba(242, 61, 61, 1);
        border-radius: 0.3rem;
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
  /deep/ .van-tree-select__content {
    padding: 10px;
    padding-top: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  /deep/ .van-sidebar {
    .van-sidebar-item {
      div {
        padding: 3px 10px;
        padding-right: 0 !important;
        border-left: 3px solid transparent;
      }
    }
    .van-sidebar-item--select {
      border-color: #efefef;
      div {
        border-color: #f23d3d;
      }
    }
  }
  .items {
    background-color: #fff;
    padding: 0 1rem;
  }
  .subMenu {
    color: #333333;
    padding: 1rem 0 1rem 0.5rem;
  }
  .subMenu_img {
    margin-bottom: 1rem;
  }
  .subMenu_sub {
    height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: #858585;
  }

  .van-sidebar {
    background-color: #efefef;
    /deep/ .van-sidebar-item {
      background-color: #efefef;
    }
    flex: 1.5;
  }
  .divider {
    color: #858585;
  }
}
</style>
