<template>
  <div class="homeWrap">
    <new-productList
      v-if="homeData.newProducts.length"
      :products="homeData.newProducts"
    />
    <homeProduct
      v-if="homeData.products.length"
      :products="homeData.products"
    />
  </div>
</template>

<script>
import newProductList from "@/components/newProductList/newProductList.vue";
import homeProduct from "@/components/homeProduct/homeProduct.vue";
import { mapState, mapGetters } from "vuex";
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
        if (this.shoppingList) {
          for (const key in data) {
            for (let i = 0; i < data[key].length; i++) {
              for (let j = 0; j < this.shoppingList.length; j++) {
                if (data[key][i].id === this.shoppingList[j].id)
                  data[key][i].isShopping = true;
              }
            }
          }
        }
        this.homeData = data;
      }
    },
    // 获取购物车数据
    async getShoppingCarts() {
      const res = await this.$http.get("/api/WebsiteShare/GetShoppingCarts", {
        params: {
          loginEmail: this.userInfo.loginEmail
        }
      });
      const { code, data, message } = res.data.result;
      if (code === 200) {
        this.$store.commit("replaceShoppingCart", data.shoppingCarts);
        this.$nextTick(() => this.getCompanyShareIndex());
      } else this.$message.error(message);
    }
  },
  created() {
    if (this.userInfo.loginEmail) this.getShoppingCarts();
    document.title = "公司首页";
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters({
      shoppingList: "myShoppingList"
    })
  },
  mounted() {
    if (!this.userInfo.loginEmail) this.getCompanyShareIndex();
  }
};
</script>
<style scoped lang="less">
.homeWrap {
  min-height: calc(100% - 482px) !important;
}
</style>
