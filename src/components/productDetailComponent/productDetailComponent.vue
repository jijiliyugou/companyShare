<template>
  <div class="productDetailWrap">
    <div class="detailBox">
      <div class="left">
        <magnifierComponent
          :middleImgWidth="541"
          :middleImgHeight="395"
          :thumbnailHeight="55"
          :thumbnailWidth="78"
          :thumbnailCount="5"
        />
      </div>
      <div class="right">
        <div class="context">
          <div class="productName">
            Camouflage vibrating flint drumgun field cap flint drumgun field cap
          </div>
          <div class="itemText">
            {{ productLang.price }}：
            <span class="priceBox">USD<span class="price">17.0</span></span>
          </div>
          <div class="itemText">
            {{ productLang.exFactoryArticleNo }}：<span>1111-284 Camou</span>
          </div>
          <div class="itemText">
            {{ productLang.package }}：<span>color box Product</span>
          </div>
          <div class="itemText">
            {{ productLang.productSpecification }}：<span>0 x 0 x 0 (CM)</span>
          </div>
          <div class="itemText">
            {{ productLang.outerBoxSize }}：<span>63 x 45 x 108 (CM)</span>
          </div>
          <div class="itemText">
            {{ productLang.packageSpecification }}：<span>0 x 0 x 0 (CM)</span>
          </div>
          <div class="itemText">
            {{ productLang.packingQuantity }}：<span>2 / 72 (PCS)</span>
          </div>
          <div class="itemText">
            {{ productLang.volumeVolume }}：<span
              >0.306 (CBM) / 10.8 (cuft)</span
            >
          </div>
          <div class="itemText">
            {{ productLang.grossNetWeight }}：<span>23 / 25 (kg)</span>
          </div>
        </div>
        <div class="myCartBox">
          <div class="myCart">
            <i class="myCartIcon"></i>
            {{ productLang.addToCart }}
          </div>
        </div>
      </div>
    </div>
    <relatedProducts />
  </div>
</template>

<script>
import magnifierComponent from "@/components/magnifierComponent/magnifierComponent.vue";
import relatedProducts from "@/components/relatedProducts/relatedProducts.vue";
export default {
  components: {
    magnifierComponent,
    relatedProducts
  },
  data() {
    return {};
  },
  methods: {},
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
@deep: ~">>>";
.productDetailWrap {
  .detailBox {
    width: 1240px;
    height: 552px;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    .left,
    .right {
      width: 50%;
      box-sizing: border-box;
    }
    .right {
      padding: 40px 0;
      color: #333333;
      .context {
        height: 395px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-right: 20px;
        box-sizing: border-box;
        .productName {
          // word-break: break-all;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 2; /* 这里是超出几行省略 */
          // overflow: hidden;
          font-size: 24px;
          font-weight: bold;
        }
        .itemText {
          // white-space: nowrap;
          // overflow: hidden;
          // text-overflow: ellipsis;
          font-size: 16px;
          font-weight: 400;
          .priceBox {
            color: #ff760e;
            .price {
              font-size: 36px;
              font-weight: bold;
            }
          }
        }
      }
      .myCartBox {
        height: 55px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        .myCart {
          width: 170px;
          height: 40px;
          background-color: #ff760e;
          cursor: pointer;
          border-radius: 5px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          .myCartIcon {
            margin-right: 15px;
            width: 18px;
            height: 18px;
            background: url("~@/assets/images/cartIcon.png") no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
    }
    .left {
      padding: 40px;
    }
  }
}
</style>
