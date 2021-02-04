<template>
  <div class="item" @click.stop="toDetails(item)">
    <div class="itemImg">
      <el-image
        style="width:281px;height:199px;"
        fit="contain"
        :src="item.imageUrls && item.imageUrls[0]"
      ></el-image>
      <div class="newIconBox" v-if="item.isNew"></div>
    </div>
    <div class="context">
      <div class="productName">
        <span>{{ globalLang === "zh-CN" ? item.name : item.ename }}</span>
      </div>
      <div class="priceBox">
        <div class="left">
          <span>USD</span>
          <span class="price">{{ item.price }}</span>
        </div>
        <div class="right">
          <div
            class="cartIconBox kongCartIcon"
            @click.stop="handlerShopping(item)"
            v-if="!item.isShopping"
          ></div>
          <div
            class="cartIconBox activeCartIcon"
            @click.stop="handlerShopping(item)"
            v-else
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    // 加购
    handlerShopping(item) {
      item.isShopping = !item.isShopping;
      if (item.isShopping) {
        item.shoppingCount = 1;
        this.$store.commit("pushShopping", item);
        this.$message.closeAll();
        this.$message.success("加购成功");
      } else {
        item.shoppingCount = 0;
        this.$message.closeAll();
        this.$store.commit("popShopping", item);
        this.$message.warning("取消成功");
      }
      this.$forceUpdate();
    },
    // 查看详情
    toDetails(item) {
      this.$router.push({
        path: "/productDetails",
        query: { item: JSON.stringify(item) }
      });
      this.$root.eventHub.$emit("resetProductDetail");
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState(["globalLang"])
  }
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
