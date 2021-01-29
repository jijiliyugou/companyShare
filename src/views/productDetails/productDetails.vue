<template>
  <div class="contentBox">
    <home-top-component />
    <productDetailComponent class="productDetailBox" />
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
    return {};
  },
  methods: {},
  created() {},
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
