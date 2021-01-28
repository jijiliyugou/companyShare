<template>
  <div class="homeWrap">
    <new-productList />
    <homeProduct />
  </div>
</template>

<script>
import newProductList from "@/components/newProductList/newProductList.vue";
import homeProduct from "@/components/homeProduct/homeProduct.vue";
export default {
  components: {
    newProductList,
    homeProduct
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less"></style>
