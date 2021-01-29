<template>
  <div class="item">
    <div class="left">
      <div class="imgBox">
        <el-image :src="require('@/assets/images/cheche.png')"> </el-image>
        <div class="newIcon"></div>
      </div>
      <div class="priceBox">
        <div class="leftPrice">
          <span class="currency">USD</span>
          <span class="price">17.0</span>
        </div>
        <div class="myCart"></div>
      </div>
    </div>
    <div class="right">
      <div class="productName">
        Camouflage vibrating flint drumgun field cap flint drumgun field cap
      </div>
      <div class="itemText">
        {{ productLang.exFactoryArticleNo }}：<span>1111-284</span>
      </div>
      <div class="itemText">
        {{ productLang.package }}：<span>color box Product</span>
      </div>
      <div class="itemText">
        {{ productLang.productSpecification }}：<span>0 x 0 x 0 (CM)</span>
      </div>
      <div class="itemText">
        {{ productLang.outerBoxSize }}：<span>63 x 45 x 108 (CM)</span>
      </div>
      <div class="itemText">
        {{ productLang.packageSpecification }}：<span>0 x 0 x 0 (CM)</span>
      </div>
      <div class="itemText">
        {{ productLang.packingQuantity }}：<span>2 / 72 (PCS)</span>
      </div>
      <div class="itemText">
        {{ productLang.volumeVolume }}：<span>0.306 (CBM) / 10.8 (cuft)</span>
      </div>
      <div class="itemText">
        {{ productLang.grossNetWeight }}：<span>23 / 25 (kg)</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {
    productLang() {
      return this.$t("lang.product");
    }
  }
};
</script>
<style scoped lang="less">
@import "./listProductItem.less";
</style>
