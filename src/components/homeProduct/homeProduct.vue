<template>
  <div class="newProductListBox">
    <div class="content">
      <div class="title">
        <span class="titleText">{{ productLang.product }}</span>
        <span class="more"
          >更多
          <i class="icon el-icon-d-arrow-right"></i>
        </span>
      </div>
      <div class="productsBox">
        <div
          :class="{ item: true, isNoMargin: (i + 1) % 4 === 0 }"
          v-for="(item, i) in 8"
          :key="i"
        >
          <el-image
            style="width:281px;height:199px;"
            :src="require('@/assets/images/cheche.png')"
          ></el-image>
          <div class="context">
            <div class="productName">
              4 function R/C excavatorl
            </div>
            <div class="priceBox">
              <div class="left">
                <span>USD</span>
                <span class="price">98.00</span>
              </div>
              <div :class="{ right: true, activeCartIcon: i % 2 === 0 }">
                <div
                  :class="{ cartIconBox: true, activeCartIcon: i % 2 === 0 }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="kong"></div>
        <div class="kong"></div>
        <div class="kong"></div>
        <div class="kong"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    productLang() {
      return this.$t("lang.product");
    }
  }
};
</script>

<style lang="less" scoped>
.newProductListBox {
  margin-top: 20px;
  background-color: #f1f1f1;
  .content {
    max-width: 1240px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    .title {
      padding-bottom: 15px;
      font-size: 24px;
      font-weight: bold;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .titleText {
        padding-left: 20px;
        position: relative;
        &::before {
          position: absolute;
          content: "";
          width: 5px;
          height: 20px;
          background: #ff760e;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      .more {
        width: 90px;
        height: 29px;
        background: #ffffff;
        border: 1px solid #d2d2d2;
        border-radius: 120px;
        font-size: 16px;
        font-weight: 400;
        color: #666666;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          margin-left: 5px;
        }
      }
    }
    .productsBox {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      position: relative;
      .item {
        width: 283px;
        height: 290px;
        background: #ffffff;
        border: 1px solid #d2d2d2;
        border-radius: 5px;
        margin-bottom: 20px;
        &.isNoMargin {
          margin-right: 0;
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
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              .cartIconBox {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 1px solid #ff760e;
                cursor: pointer;
                background: url("~@/assets/images/kongCartIcon.png") no-repeat
                  center;
                background-size: 50% 50%;
                &.activeCartIcon {
                  background: url("~@/assets/images/activeCartIcon.png")
                    no-repeat center;
                  background-size: 50% 50%;
                }
              }
              &.activeCartIcon {
                background-color: #ff760e;
              }
            }
          }
        }
      }
      .kong {
        width: 285px;
      }
    }
  }
}
</style>
