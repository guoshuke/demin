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
      height="90vh"
      :items="items"
      :main-active-index.sync="activeIndex"
    >
      <template slot="content">
        <div v-for="(v, i) in items" :key="i" v-if="i == activeIndex">
          <div v-for="t in v.children">
            <div class="subMenu">
              {{ t.text }}
            </div>
            <van-grid :border="false" :column-num="3">
              <van-grid-item v-for="n in t.children" :key="n.id" to="goodsList">
                <van-image :src="n.image" />
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
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped lang="less">
.classify {
  /deep/ .van-tree-select__content {
    flex: 3;
  }
  .form {
    /deep/ .van-search {
      background: linear-gradient(90deg, #f23d3d, #f26e6e) !important;
      .van-cell {
        padding: 5px 8px 5px 0;
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
  }
  .subMenu {
    color: #333333;
    padding: 1rem 0 1rem 0.5rem;
  }
  .subMenu_sub {
    margin-top: 1rem;
    height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: #858585;
  }

  .van-sidebar {
    border-right: 1px solid #858585;
  }
  .divider {
    color: #858585;
  }
}
</style>
