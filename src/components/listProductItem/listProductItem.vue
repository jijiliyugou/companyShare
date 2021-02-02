<template>
  <div class="item" @click.stop="toDetails(item)">
    <div class="left">
      <div class="imgBox">
        <el-image
          :src="item.imageUrls && item.imageUrls[0]"
          fit="contain"
        ></el-image>
        <div class="newIcon" v-if="item.isNew"></div>
      </div>
      <div class="priceBox">
        <div class="leftPrice">
          <span class="currency">USD</span>
          <span class="price">{{ item.price }}</span>
        </div>
        <div
          class="myCart"
          @click.stop="handlerShopping(item)"
          v-if="!item.isShopping"
        ></div>
        <div
          class="activeCartIcon"
          @click.stop="handlerShopping(item)"
          v-else
        ></div>
      </div>
    </div>
    <div class="right">
      <div class="productName">
        {{ item.name }}
      </div>
      <div class="itemText">
        {{ productLang.exFactoryArticleNo }}：<span>{{
          item.outFactoryNumber
        }}</span>
      </div>
      <div class="itemText">
        {{ productLang.package }}：<span>{{ item.packMethod }}</span>
      </div>
      <div class="itemText">
        {{ productLang.productSpecification }}：<span
          >{{ item.sampleLenth }} x {{ item.sampleWidth }} x
          {{ item.sampleHeight }} (CM)</span
        >
      </div>
      <div class="itemText">
        {{ productLang.outerBoxSize }}：<span
          >{{ item.outerBoxLenth }} x {{ item.outerBoxWidth }} x
          {{ item.outerBoxHeight }} (CM)</span
        >
      </div>
      <div class="itemText">
        {{ productLang.packageSpecification }}：<span
          >{{ item.innerLenth }} x {{ item.innerWidth }} x
          {{ item.innerheigth }} (CM)</span
        >
      </div>
      <div class="itemText">
        {{ productLang.packingQuantity }}：<span
          >{{ item.innerEn }} / {{ item.outerBoxLo }} (PCS)</span
        >
      </div>
      <div class="itemText">
        {{ productLang.volumeVolume }}：<span
          >{{ item.outerBoxStere }} (CBM) / {{ item.outerBoxFeet }} (cuft)</span
        >
      </div>
      <div class="itemText">
        {{ productLang.grossNetWeight }}：<span
          >{{ item.outerBoxWeight }} / {{ item.outerBoxNetWeight }} (kg)</span
        >
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
  methods: {
    // 加购
    handlerShopping(item) {
      this.$emit("hanldlerShopping", item);
    },
    // 查看详情
    toDetails(item) {
      this.$router.push({
        path: "/productDetails",
        query: { item: JSON.stringify(item) }
      });
    }
  },
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
