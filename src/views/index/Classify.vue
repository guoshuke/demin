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
              <van-grid-item v-for="n in t.children" :key="n.text">
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
export default {
  name: "Classify",
  data() {
    return {
      activeIndex: 0,
      items: [
        {
          text: "分组 1",
          children: [
            {
              text: "分组 1_1",
              children: [
                {
                  text: "分组 1_1_1",
                  image: "https://img.yzcdn.cn/vant/apple-1.jpg"
                },
                {
                  text: "分组 1_1_2",
                  image: "https://img.yzcdn.cn/vant/apple-1.jpg"
                },
                {
                  text: "分组 1_1_3",
                  image: "https://img.yzcdn.cn/vant/apple-1.jpg"
                }
              ]
            }
          ]
        },
        {
          text: "分组 2",
          children: [
            {
              text: "分组 2_1",
              children: [
                {
                  text: "分组 2_1_1",
                  image: "https://img.yzcdn.cn/vant/apple-2.jpg"
                },
                {
                  text: "分组 2_1_2",
                  image: "https://img.yzcdn.cn/vant/apple-2.jpg"
                },
                {
                  text: "分组 2_1_3",
                  image: "https://img.yzcdn.cn/vant/apple-2.jpg"
                }
              ]
            }
          ]
        }
      ],
      value: ""
    };
  },
  methods: {
    toSearch() {
      this.$router.push(`search`);
    },
    onCancel() {
      console.log(2);
    }
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
