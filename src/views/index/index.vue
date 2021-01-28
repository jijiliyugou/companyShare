<template>
  <div class="contentBox">
    <home-top-component />
    <advanced-search />
    <router-view class="myRouterView"></router-view>
    <myFoot class="myFoot" />
  </div>
</template>

<script>
import homeTopComponent from "@/components/homeTopComponent/homeTopComponent.vue";
import advancedSearch from "@/components/advancedSearch/advancedSearch.vue";
import myFoot from "@/components/myFoot/myFoot.vue";
export default {
  components: {
    homeTopComponent,
    advancedSearch,
    myFoot
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {
    homeLang() {
      return this.$t("lang.home");
    }
  }
};
</script>
<style scoped lang="less">
.contentBox {
  height: 100%;
  .myRouterView {
    min-height: calc(100% - 482px);
  }
  .myFoot {
    margin-top: 20px;
  }
}
</style>
