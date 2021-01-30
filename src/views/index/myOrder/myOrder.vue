<template>
  <div class="myOrderWrap">
    <div class="orderBox">
      <div class="title">
        {{ myOrderLang.myOrder }} <span class="value">（onon@163.com）</span>
      </div>
      <ul class="orderListWrap">
        <li class="itemBox" v-for="(item, i) in 10" :key="i">
          <div class="orderTitle">
            <div class="left">
              {{ myOrderLang.oddNumbers }}：<span class="value"
                >S168988444446</span
              >
            </div>
            <div class="right">
              <i class="iconfont icon-daochujinruchukou"></i>
              {{ myOrderLang.exportOrder }}
            </div>
          </div>
          <div class="orderContent">
            <div class="one">
              <div class="left">
                <div class="keys">{{ myOrderLang.orderTime }}：</div>
                <div class="keys">{{ myOrderLang.companyName }}：</div>
              </div>
              <div class="right">
                <div class="values">2021-01-23</div>
                <div class="values">Lok fun toy company</div>
              </div>
            </div>
            <div class="two">
              <div class="left">
                <div class="keys">{{ myOrderLang.totalQuantity }}：</div>
                <div class="keys">{{ myOrderLang.email }}：</div>
              </div>
              <div class="right">
                <div class="values">2</div>
                <div class="values">onoh@163.com</div>
              </div>
            </div>
            <div class="three">
              <div class="left">
                <div class="keys">{{ myOrderLang.totalPrice }}：</div>
                <div class="keys">{{ myOrderLang.contact }}：</div>
              </div>
              <div class="right">
                <div class="values">USD 196.00</div>
                <div class="values">15986860326</div>
              </div>
            </div>
            <div class="four">
              <el-button type="warning" @click="toOrderDetail" plain>{{
                myOrderLang.viewDetails
              }}</el-button>
            </div>
          </div>
        </li>
      </ul>
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
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 去详情页
    toOrderDetail() {
      this.$router.push("/orderDetail");
    },
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
    myOrderLang() {
      return this.$t("lang.myOrder");
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.myOrderWrap {
  width: 100%;
  .orderBox {
    margin: 0 auto;
    width: 1240px;
    box-sizing: border-box;
    padding: 0 23px;
    background-color: #fff;
    .title {
      height: 65px;
      display: flex;
      align-items: center;
      color: #333333;
      font-size: 20px;
      font-weight: bold;
      .value {
        font-size: 16px;
        color: #999;
        font-weight: 400;
      }
    }
    .orderListWrap {
      .itemBox {
        border: 1px solid #e9e9e9;
        margin-bottom: 20px;
        color: #333;
        font-size: 14px;
        .orderTitle {
          height: 40px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          box-sizing: border-box;
          .left {
            .value {
              color: #666666;
            }
          }
          .right {
            width: 112px;
            color: #666;
            cursor: pointer;
            display: flex;
            align-items: center;
            .iconfont {
              margin-right: 10px;
            }
          }
        }
        .orderContent {
          height: 100px;
          display: flex;
          padding: 0 20px;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-between;
          .one,
          .two,
          .three {
            flex: 1;
            height: 100%;
            display: flex;
            .left,
            .right {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              color: #333;
            }
            .left {
              color: #999;
              .keys {
                text-align: right;
              }
            }
          }
          .four {
            width: 112px;
            background-color: #ccc;
            .el-button {
              width: 112px;
              height: 34px;
              opacity: 1;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 0px;
              overflow: hidden;
            }
          }
        }
      }
    }
    .paginationWrap {
      padding: 50px 0 36px 0;
    }
  }
}
</style>
