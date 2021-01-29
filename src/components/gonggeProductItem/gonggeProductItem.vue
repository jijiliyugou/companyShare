<template>
  <div class="item" @click.stop="toDetails">
    <div class="itemImg">
      <el-image
        style="width:281px;height:199px;"
        :src="require('@/assets/images/cheche.png')"
      ></el-image>
      <div class="newIconBox"></div>
    </div>
    <div class="context">
      <div class="productName">
        4 function R/C excavatorl
      </div>
      <div class="priceBox">
        <div class="left">
          <span>USD</span>
          <span class="price">98.00</span>
        </div>
        <div class="right">
          <div class="cartIconBox kongCartIcon" v-if="item % 2"></div>
          <div class="cartIconBox activeCartIcon" v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    toDetails() {
      this.$router.push("/productDetails");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.item {
  width: 283px;
  height: 290px;
  background: #ffffff;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
  .itemImg {
    position: relative;
    .newIconBox {
      position: absolute;
      width: 40px;
      height: 40px;
      left: 0;
      top: 0;
      background: url("~@/assets/images/newIcon.png") no-repeat center;
      background-size: 100% 100%;
    }
  }
  .context {
    height: 90px;
    padding: 0 18px;
    box-sizing: border-box;
    .productName {
      font-size: 16px;
      color: #000;
      margin-top: 18px;
    }
    .priceBox {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        color: #666666;
        font-size: 14px;
        .price {
          font-size: 20px;
          font-weight: bold;
          color: #ff760e;
          margin-left: 10px;
        }
      }
      .right {
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        .cartIconBox {
          width: 36px;
          height: 36px;
          cursor: pointer;
          &.kongCartIcon {
            background: url("~@/assets/images/kongCartIcon.png") no-repeat
              center;
            background-size: 100% 100%;
          }
          &.activeCartIcon {
            background: url("~@/assets/images/activeCartIcon.png") no-repeat
              center;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
