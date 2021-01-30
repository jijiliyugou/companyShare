<template>
  <div class="productWrap">
    <div class="productList">
      <div class="filterBar">
        <div class="left">
          <div class="dateBox" @click="isShowDate = !isShowDate">
            <span>{{ productLang.data }}</span>
            <span style="margin-left:10px;">
              <i class="el-icon-arrow-down" v-show="isShowDate"></i>
              <i class="el-icon-arrow-up" v-show="!isShowDate"></i>
            </span>
          </div>
          <div class="priceBox" @click="isShowPrice = !isShowPrice">
            <span>{{ productLang.price }}</span>
            <span style="margin-left:10px;">
              <i class="el-icon-arrow-down" v-show="isShowPrice"></i>
              <i class="el-icon-arrow-up" v-show="!isShowPrice"></i>
            </span>
          </div>
        </div>
        <div class="right">
          <div class="checkView">
            <div
              :class="{
                thumbnail: true,
                active: isThumbnail === 'thumbnailProducts'
              }"
              @click="isThumbnail = 'thumbnailProducts'"
            >
              <i class="iconfont icon-split-screen-compare"></i>
              <span class="text">{{ productLang.thumbnail }}</span>
            </div>
            <div
              :class="{ list: true, active: isThumbnail === 'listProducts' }"
              @click="isThumbnail = 'listProducts'"
            >
              <i class="iconfont icon-liebiao"></i>
              <span class="text">{{ productLang.list }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 产品列表 -->
      <div class="productListWrap">
        <div class="number">
          {{ productLang.numberOfProducts }}
          <span style="margin-left:10px;color:#FF760E;">912864</span>
        </div>
        <!-- 产品列表 -->
        <component :is="isThumbnail"></component>
      </div>
    </div>
    <!-- 分页 -->
    <center class="paginationWrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="totalCount"
      >
      </el-pagination>
    </center>
  </div>
</template>

<script>
import thumbnailProducts from "@/components/thumbnailProducts/thumbnailProducts.vue";
import listProducts from "@/components/listProducts/listProducts.vue";
export default {
  components: {
    thumbnailProducts,
    listProducts
  },
  data() {
    return {
      isShowDate: false,
      isShowPrice: false,
      isThumbnail: "thumbnailProducts",
      pageSize: 10,
      currentPage: 1,
      totalCount: 0
    };
  },
  methods: {
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.currentPage * pageSize > this.totalCount) return false;
      // this.getProductList()
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
    }
  },
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
.productWrap {
  width: 100%;
  min-height: calc(100% - 482px) !important;
  .productList {
    margin: 0 auto;
    width: 1240px;
    margin-top: 20px;
    background-color: #fff;
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
          cursor: pointer;
          margin-left: 40px;
        }
        .dateBox {
          cursor: pointer;
        }
      }
      .right {
        justify-content: flex-end;
        .checkView {
          color: #666666;
          display: flex;
          .thumbnail,
          .list {
            cursor: pointer;
            .text {
              margin-left: 10px;
            }
            &.active {
              color: #ff760e;
            }
          }
          .list {
            margin-left: 30px;
          }
        }
      }
    }
    .productListWrap {
      padding: 20px 20px 0 20px;
      .number {
        height: 40px;
        color: #333;
      }
    }
  }
  .paginationWrap {
    padding: 30px 0;
  }
}
</style>
