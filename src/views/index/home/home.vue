<template>
  <div class="homeWrap">
    <new-productList :products="homeData.newProducts" />
    <homeProduct :products="homeData.products" />
  </div>
</template>

<script>
import newProductList from "@/components/newProductList/newProductList.vue";
import homeProduct from "@/components/homeProduct/homeProduct.vue";
import { mapState } from "vuex";
export default {
  components: {
    newProductList,
    homeProduct
  },
  data() {
    return {
      homeData: {
        newProducts: [],
        products: []
      }
    };
  },
  methods: {
    // 获取首页数据
    async getCompanyShareIndex() {
      const res = await this.$http.get(
        "/api/WebsiteShare/GetCompanyShareIndex"
      );
      const { data, code } = res.data.result;
      if (code === 200) {
        for (const key in data) {
          for (let i = 0; i < data[key].length; i++) {
            for (let j = 0; j < this.shoppingList.length; j++) {
              if (data[key][i].id === this.shoppingList[j].id)
                data[key][i].isShopping = true;
            }
          }
        }

        this.homeData = data;
      }
    },
    // 取消监听根组件方法
    offRootMethod() {
      this.$root.eventHub.$off("resetCompanyShareIndex");
    }
  },
  created() {
    document.title = "公司首页";
    this.getCompanyShareIndex();
    this.$root.eventHub.$on("resetCompanyShareIndex", () => {
      this.getCompanyShareIndex();
    });
  },
  computed: {
    ...mapState(["shoppingList"])
  },
  mounted() {},
  beforeDestroy() {
    this.offRootMethod();
  }
};
</script>
<style scoped lang="less">
.homeWrap {
  min-height: calc(100% - 482px) !important;
}
</style>
