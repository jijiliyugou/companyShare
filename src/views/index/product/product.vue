<template>
  <div class="productWrap">
    <div class="productList">
      <div class="filterBar">
        <div class="left">
          <div class="dateBox">
            <span>Data</span>
          </div>
          <div class="priceBox">Price</div>
        </div>
        <div class="right">
          <div class="checkView">thumbnail</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.productWrap {
  width: 100%;
  .productList {
    margin: 0 auto;
    width: 1240px;
    margin-top: 20px;
    .filterBar {
      width: 100%;
      height: 47px;
      background: #f5f5f5;
      border: 1px solid #e9e9e9;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;
      .left,
      .right {
        flex: 1;
        display: flex;
        .priceBox {
          margin-left: 40px;
        }
      }
      .right {
        justify-content: flex-end;
      }
    }
  }
}
</style>
