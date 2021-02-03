<template>
  <div class="myOrderWrap">
    <div class="orderBox">
      <div class="title">
        {{ myOrderLang.myOrder }}
        <span class="value" v-if="userInfo.loginEmail"
          >（{{ userInfo.loginEmail }}）</span
        >
      </div>
      <ul class="orderListWrap">
        <li class="itemBox" v-for="(item, i) in orderList" :key="i">
          <div class="orderTitle">
            <div class="left">
              {{ myOrderLang.oddNumbers }}：
              <span class="value">{{ item.orderNumber }}</span>
            </div>
            <div
              class="right"
              @click="exportOrder(item.orderNumber)"
              v-if="userInfo.isExportExcel"
            >
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
                <div class="values">{{ item.createdOn.replace(/T/, " ") }}</div>
                <div class="values">{{ item.companyName }}</div>
              </div>
            </div>
            <div class="two">
              <div class="left">
                <div class="keys">{{ myOrderLang.totalQuantity }}：</div>
                <div class="keys">{{ myOrderLang.email }}：</div>
              </div>
              <div class="right">
                <div class="values">{{ item.totalCount }}</div>
                <div class="values">{{ item.email }}</div>
              </div>
            </div>
            <div class="three">
              <div class="left">
                <div class="keys">{{ myOrderLang.totalPrice }}：</div>
                <div class="keys">{{ myOrderLang.contact }}：</div>
              </div>
              <div class="right">
                <div class="values">USD {{ item.totalAmount }}</div>
                <div class="values">{{ item.contactName }}</div>
              </div>
            </div>
            <div class="four">
              <el-button type="warning" @click="toOrderDetail(item)" plain>{{
                myOrderLang.viewDetails
              }}</el-button>
            </div>
          </div>
        </li>
      </ul>
      <!-- 分页 -->
      <center class="paginationWrap">
        <el-pagination
          background
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      orderList: []
    };
  },
  methods: {
    // 导出功能
    exportOrder(orderNumber) {
      this.$http
        .post(
          "/api/WebsiteShare/ExportOrderDetailToExcel",
          {
            shareOrderNumber: orderNumber
          },
          { responseType: "blob" }
        )
        .then(res => {
          const fileName = "订单.xls";
          const blob = res.data;
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // 兼容IE
            window.navigator.msSaveOrOpenBlob(blob, fileName);
          } else {
            // 兼容Google及fireFox
            const link = document.createElement("a");
            link.style.display = "none";
            link.download = fileName;
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href); // 释放URL 对象
            document.body.removeChild(link);
          }
        });
    },
    // 获取订单列表
    async getSearchShareOrdersPage() {
      const res = await this.$http.get(
        "/api/WebsiteShare/SearchShareOrdersPage",
        {
          params: {
            keyword: "",
            pageIndex: this.currentPage,
            pageSize: this.pageSize,
            companyNumber: this.userInfo.companyNumber,
            loginEmail: this.userInfo.loginEmail
          }
        }
      );
      const { code, data, message } = res.data.result;
      if (code === 200) {
        this.orderList = data.items;
        this.totalCount = data.totalCount;
      } else {
        this.$message.error(message);
      }
    },
    // 去详情页
    toOrderDetail(item) {
      this.$router.push({
        path: "/orderDetail",
        query: { item: JSON.stringify(item) }
      });
    },
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.currentPage * pageSize > this.totalCount) return false;
      this.getSearchShareOrdersPage();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getSearchShareOrdersPage();
    }
  },
  created() {},
  mounted() {
    this.getSearchShareOrdersPage();
  },
  computed: {
    myOrderLang() {
      return this.$t("lang.myOrder");
    },
    ...mapState(["userInfo"])
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
              .values {
                height: 20px;
                display: flex;
                align-items: center;
              }
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
