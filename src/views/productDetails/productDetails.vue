<template>
  <div class="contentBox">
    <home-top-component />
    <keep-alive>
      <productDetailComponent :item="product" class="productDetailBox" />
    </keep-alive>
    <myFoot class="myFoot" />
  </div>
</template>

<script>
import homeTopComponent from "@/components/homeTopComponent/homeTopComponent.vue";
import myFoot from "@/components/myFoot/myFoot.vue";
import productDetailComponent from "@/components/productDetailComponent/productDetailComponent.vue";
export default {
  components: {
    homeTopComponent,
    productDetailComponent,
    myFoot
  },
  data() {
    return {
      product: {}
    };
  },
  methods: {},
  created() {
    this.product = JSON.parse(this.$route.query.item);
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.contentBox {
  height: 100%;
  .productDetailBox {
    min-height: calc(100% - 343px);
  }
  .myFoot {
    margin-top: 20px;
  }
}
</style>
