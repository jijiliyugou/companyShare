<template>
  <div class="thumbnailProducts">
    <gonggeProductItem v-for="item in 8" :key="item" :item="item" />
    <div class="kong"></div>
    <div class="kong"></div>
    <div class="kong"></div>
  </div>
</template>

<script>
import gonggeProductItem from "@/components/gonggeProductItem/gonggeProductItem.vue";
export default {
  components: {
    gonggeProductItem
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
.thumbnailProducts {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    width: 283px;
    height: 290px;
    background: #ffffff;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .kong {
    width: 283px;
    border: 1px solid transparent;
  }
}
</style>
