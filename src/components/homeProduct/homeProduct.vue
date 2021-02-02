<template>
  <div class="newProductListBox">
    <div class="content">
      <div class="title">
        <span class="titleText">{{ productLang.product }}</span>
        <span class="more" @click="toProducts"
          >{{ productLang.more }}
          <i class="icon el-icon-d-arrow-right"></i>
        </span>
      </div>
      <div class="productsBox">
        <gonggeProductItem
          v-for="(item, i) in products"
          :key="i"
          :item="item"
          @hanldlerShopping="hanldlerShopping"
        />
        <div class="kong"></div>
        <div class="kong"></div>
        <div class="kong"></div>
        <div class="kong"></div>
      </div>
    </div>
  </div>
</template>

<script>
import gonggeProductItem from "@/components/gonggeProductItem/gonggeProductItem.vue";
export default {
  components: {
    gonggeProductItem
  },
  props: {
    products: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    // 加购事件
    hanldlerShopping(item) {
      item.isShopping = !item.isShopping;
      if (item.isShopping) {
        item.shoppingCount = 1;
        this.$store.commit("pushShopping", item);
      } else {
        item.shoppingCount = 0;
        this.$store.commit("popShopping", item);
      }
      this.$root.eventHub.$emit("resetCompanyShareIndex");
    },
    // 查看更多
    toProducts() {
      this.$router.push({ path: "/index/product", query: { productType: 1 } });
    }
  },
  computed: {
    productLang() {
      return this.$t("lang.product");
    }
  }
};
</script>

<style lang="less" scoped>
.newProductListBox {
  margin-top: 20px;
  background-color: #f1f1f1;
  .content {
    max-width: 1240px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    .title {
      padding-bottom: 15px;
      font-size: 24px;
      font-weight: bold;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .titleText {
        padding-left: 20px;
        position: relative;
        &::before {
          position: absolute;
          content: "";
          width: 5px;
          height: 20px;
          background: #ff760e;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      .more {
        width: 90px;
        height: 29px;
        background: #ffffff;
        border: 1px solid #d2d2d2;
        border-radius: 120px;
        font-size: 16px;
        font-weight: 400;
        color: #666666;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .icon {
          margin-left: 5px;
        }
      }
    }
    .productsBox {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      position: relative;
      .kong {
        width: 285px;
      }
    }
  }
}
</style>
