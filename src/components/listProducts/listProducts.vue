<template>
  <div class="listProducts">
    <listProductItem v-for="(item, i) in 20" :key="i" :item="item" />
    <div class="kong"></div>
  </div>
</template>

<script>
import listProductItem from "@/components/listProductItem/listProductItem.vue";
export default {
  components: {
    listProductItem
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
.listProducts {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .kong {
    width: 587px;
    border: 1px solid transparent;
  }
}
</style>
