<template>
  <div class="orderWrap">
    <div class="orderBox">
      <div class="title">
        {{ myOrderLang.orderDetails }}
      </div>
      <div class="titleBox">
        <div class="titleText">{{ myOrderLang.orderInformation }}</div>
        <div class="exportBtn">
          <el-button
            type="warning"
            v-if="userInfo.isExportExcel"
            @click="exportOrder"
            plain
            ><i class="iconfont icon-daochujinruchukou"></i>
            {{ myOrderLang.exportOrder }}
          </el-button>
        </div>
      </div>
      <div class="orderInfo">
        <div class="one">
          <div class="left">
            <div class="keys">{{ myOrderLang.oddNumbers }}：</div>
            <div class="keys">{{ myOrderLang.companyName }}：</div>
            <div class="keys">{{ myOrderLang.remark }}：</div>
          </div>
          <div class="right">
            <div class="values">{{ orderInfo.orderNumber }}</div>
            <div class="values">{{ orderInfo.companyName }}</div>
            <div class="values">{{ orderInfo.remark }}</div>
          </div>
        </div>
        <div class="two">
          <div class="left">
            <div class="keys">{{ myOrderLang.orderTime }}：</div>
            <div class="keys">{{ myOrderLang.contact }}：</div>
            <div class="keys"></div>
          </div>
          <div class="right">
            <div class="values">
              {{ orderInfo.createdOn.replace(/T/, " ") }}
            </div>
            <div class="values">{{ orderInfo.contactName }}</div>
            <div class="values"></div>
          </div>
        </div>
        <div class="three">
          <div class="left">
            <div class="keys"></div>
            <div class="keys">{{ myOrderLang.email }}：</div>
            <div class="keys"></div>
          </div>
          <div class="right">
            <div class="values"></div>
            <div class="values">{{ orderInfo.email }}</div>
            <div class="values"></div>
          </div>
        </div>
      </div>
      <div class="titleBox">
        <div class="titleText">{{ myOrderLang.productInformation }}</div>
        <div class="exportBtn"></div>
      </div>
      <div class="myTable">
        <!-- <el-table
          :header-cell-style="{
            backgroundColor: '#F5F5F5',
            color: '#666',
            'font-size': '14px',
            'font-weight': 400
          }"
          :data="tableList"
          id="myTable"
          ref="multipleTable"
          size="medium"
          tooltip-effect="dark"
          highlight-current-row
        >
          <el-table-column
            type="index"
            width="50"
            align="center"
            :label="myOrderLang.id"
          >
          </el-table-column>
          <el-table-column
            prop="productImage"
            :label="myShoppingCartLang.commodity"
            align="center"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 70px"
                :src="scope.row.productImage"
                fit="contain"
              >
                <div slot="placeholder" class="image-slot">
                  <img
                    class="errorImg"
                    style="width: 70px; height: 70px"
                    src="~@/assets/images/logo.png"
                    alt
                  />
                </div>
                <div slot="error" class="image-slot">
                  <img
                    class="errorImg"
                    style="width: 70px; height: 70px"
                    src="~@/assets/images/logo.png"
                    alt
                  />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            width="400"
            :prop="globalLang === 'zh-CN' ? 'productName' : 'productEName'"
            :label="myShoppingCartLang.productName"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="productPrice"
            :label="myShoppingCartLang.unitPrice"
            align="center"
          >
            <template slot-scope="scope">
              <div class="tablePrice">
                <span class="price" style="margin-right:5px;">
                  {{ scope.row.currencyType }}
                </span>
                <span class="price">{{ scope.row.productPrice }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="productStere"
            :label="myShoppingCartLang.totalCapacity"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.productStere }}/{{ scope.row.productFeet }}
            </template>
          </el-table-column>
          <el-table-column
            prop="innerEn"
            :label="myShoppingCartLang.cTn + '(pcs)'"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.innerEn + "/" + scope.row.outerBoxLo }}
            </template>
          </el-table-column>
          <el-table-column
            prop="productCount"
            :label="myShoppingCartLang.number"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            :label="myShoppingCartLang.total"
            align="center"
          >
            <template slot-scope="scope">
              <div class="tablePrice">
                <span class="price" style="margin-right:5px;">
                  {{ scope.row.currencyType }}
                </span>
                <span class="price">{{ scope.row.totalPrice }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table> -->
        <el-table
          :header-cell-style="{
            backgroundColor: '#F5F5F5',
            color: '#666',
            'font-size': '14px',
            'font-weight': 700
          }"
          :data="tableList"
          id="myTable"
          ref="multipleTable"
          size="medium"
          tooltip-effect="dark"
          highlight-current-row
          :empty-text="publicLang.noData"
        >
          <el-table-column
            width="50"
            align="center"
            type="index"
            :label="myShoppingCartLang.id"
          ></el-table-column>
          <el-table-column label="Product information" align="center">
            <template slot-scope="scope">
              <div class="productInformation">
                <div class="imgBox">
                  <el-image
                    style="width: 100px; height: 100px; cursor: pointer;"
                    fit="contain"
                    :src="scope.row.productImage"
                    :preview-src-list="[scope.row.productImage]"
                  >
                    <div slot="placeholder" class="image-slot">
                      <img
                        class="errorImg"
                        style="width: 100px; height: 100px"
                        src="~@/assets/images/logo.png"
                        alt
                      />
                    </div>
                    <div slot="error" class="image-slot">
                      <img
                        class="errorImg"
                        style="width: 100px; height: 100px"
                        src="~@/assets/images/logo.png"
                        alt
                      />
                    </div>
                  </el-image>
                </div>
                <div class="productNameBox">
                  <p class="name">
                    {{
                      globalLang === "zh-CN"
                        ? scope.row.productName
                        : scope.row.productEName
                    }}
                  </p>
                  <p class="fa_no">{{ scope.row.outFactoryNumber }}</p>
                  <p class="price">
                    <span>{{ scope.row.currencyType }}</span>
                    <span class="priceText">{{ scope.row.productPrice }}</span>
                  </p>
                </div>
                <div class="item">
                  <div class="content">
                    <span>{{ myShoppingCartLang.packingMethod }}：</span>
                    <span>
                      {{
                        globalLang === "zh-CN"
                          ? scope.row.packMethod
                          : scope.row.ePackMethod
                      }}
                    </span>
                  </div>
                  <div class="content">
                    <span>{{ myShoppingCartLang.productSpecification }}：</span>
                    <span
                      >{{ scope.row.sampleLenth }} x
                      {{ scope.row.sampleWidth }} x
                      {{ scope.row.sampleHeight }} (CM)</span
                    >
                  </div>
                  <div class="content">
                    <span>{{ myShoppingCartLang.outerBoxSize }}：</span>
                    <span
                      >{{ scope.row.outerBoxLenth }} x
                      {{ scope.row.outerBoxWidth }} x
                      {{ scope.row.outerBoxHeight }} (CM)</span
                    >
                  </div>
                  <div class="content">
                    <span>{{ myShoppingCartLang.packageSpecification }}：</span>
                    <span
                      >{{ scope.row.innerLenth }} x {{ scope.row.innerWidth }} x
                      {{ scope.row.innerHeight }} (CM)</span
                    >
                  </div>
                </div>
                <div class="item">
                  <div class="content">
                    <span>{{ myShoppingCartLang.packingQuantity }}：</span>
                    <span
                      >{{ scope.row.innerEn }} /
                      {{ scope.row.outerBoxLo }} (PCS)</span
                    >
                  </div>
                  <div class="content">
                    <span>{{ myShoppingCartLang.volumeVolume }}：</span>
                    <span
                      >{{ scope.row.productStere }} (CBM) /
                      {{ scope.row.productFeet }} (CUFT)</span
                    >
                  </div>
                  <div class="content">
                    <span>{{ myShoppingCartLang.grossNetWeight }}：</span>
                    <span
                      >{{ scope.row.outerBoxWeight }} /
                      {{ scope.row.outerBoxNetWeight }} (KG)</span
                    >
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="CTNS" align="center" prop="productCount" width="100">
            <template slot-scope="scope">
              <span style="color: #FF3E3E;">
                {{ scope.row.productCount }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            width="120"
            align="center"
            label="Total volume Total amount"
          >
            <template slot-scope="scope">
              <div class="tableTotalVolume">
                <p class="item">
                  {{ scope.row.totalProductStere }}
                  cbm
                </p>
                <p class="item">{{ scope.row.totalProductFeet }}cuft</p>
                <p class="item price">
                  <span>{{ scope.row.currencyType }}</span>
                  <span>
                    {{ scope.row.totalPrice }}
                  </span>
                </p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="totalBox">
        <div class="totalWrap">
          <div class="item">
            {{ myOrderLang.totalQuantity }}：
            <span>{{ orderInfo.totalCount }}</span>
          </div>
          <div class="item">
            {{ myOrderLang.totalVolume }}：
            <span class="value">{{ myTotalVolume(tableList) }}</span>
          </div>
          <div class="item">
            {{ myOrderLang.totalPrice }}：
            <span class="value price">{{ orderInfo.currencyType }}</span>
            <span class="value price">{{ orderInfo.totalAmount }}</span>
          </div>
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
      type: String
    }
  },
  data() {
    return {
      orderInfo: {},
      keyword: "",
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      tableList: []
    };
  },
  methods: {
    // 导出功能
    // 导出功能
    exportOrder() {
      this.$http
        .post(
          "/api/WebsiteShare/ExportOrderDetailToExcel",
          {
            shareOrderNumber: this.orderInfo.orderNumber
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
    // 获取订单详情
    async getSearchShareOrderDetailsPage() {
      const res = await this.$http.get(
        "/api/WebsiteShare/SearchShareOrderDetailsPage",
        {
          params: {
            shareOrderNumber: this.orderInfo.orderNumber,
            pageIndex: this.currentPage,
            pageSize: this.pageSize,
            keyword: this.keyword
          }
        }
      );
      const { code, data, message } = res.data.result;
      if (code === 200) {
        this.tableList = data.items;
        console.log(this.tableList);
        this.totalCount = data.totalCount;
      } else {
        this.$message.error(message);
      }
    },
    /*
     * 判断obj是否为一个整数
     */
    isInteger(obj) {
      return Math.floor(obj) === obj;
    },
    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    toInteger(floatNum) {
      const ret = { times: 1, num: 0 };
      if (this.isInteger(floatNum)) {
        ret.num = floatNum;
        return ret;
      }
      const strfi = floatNum + "";
      const dotPos = strfi.indexOf(".");
      const len = strfi.substr(dotPos + 1).length;
      const times = Math.pow(10, len);
      const intNum = parseInt(floatNum * times + 0.5, 10);
      ret.times = times;
      ret.num = intNum;
      return ret;
    },
    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    operation(a, b, digits, op) {
      const o1 = this.toInteger(a);
      const o2 = this.toInteger(b);
      const n1 = o1.num;
      const n2 = o2.num;
      const t1 = o1.times;
      const t2 = o2.times;
      const max = t1 > t2 ? t1 : t2;
      let result = null;
      switch (op) {
        case "add":
          if (t1 === t2) {
            // 两个小数位数相同
            result = n1 + n2;
          } else if (t1 > t2) {
            // o1 小数位 大于 o2
            result = n1 + n2 * (t1 / t2);
          } else {
            // o1 小数位 小于 o2
            result = n1 * (t2 / t1) + n2;
          }
          return result / max;
        case "subtract":
          if (t1 === t2) {
            result = n1 - n2;
          } else if (t1 > t2) {
            result = n1 - n2 * (t1 / t2);
          } else {
            result = n1 * (t2 / t1) - n2;
          }
          return result / max;
        case "multiply":
          result = (n1 * n2) / (t1 * t2);
          return result;
        case "divide":
          result = (n1 / n2) * (t2 / t1);
          return result;
      }
    },
    // 加
    add(a, b, digits) {
      return this.operation(a, b, digits, "add");
    },
    // 减
    subtract(a, b, digits) {
      return this.operation(a, b, digits, "subtract");
    },
    // 乘
    multiply(a, b, digits) {
      return this.operation(a, b, digits, "multiply");
    },
    // 除
    divide(a, b, digits) {
      return this.operation(a, b, digits, "divide");
    },
    // 计算总体积材积
    myTotalVolume(list) {
      let outerBoxStere = 0,
        outerBoxFeet = 0;
      for (let i = 0; i < list.length; i++) {
        outerBoxStere = this.add(
          outerBoxStere,
          this.multiply(list[i].productStere, list[i].productCount)
        );
        outerBoxFeet = this.add(
          outerBoxFeet,
          this.multiply(list[i].productFeet, list[i].productCount)
        );
      }
      return outerBoxStere + "(cbm) " + outerBoxFeet + "(cuft)";
    }
  },
  created() {
    this.orderInfo = JSON.parse(this.item);
  },
  mounted() {
    this.getSearchShareOrderDetailsPage();
  },
  computed: {
    advancedSearchLang() {
      return this.$t("lang.advancedSearch");
    },
    publicLang() {
      return this.$t("lang.publicLang");
    },
    myOrderLang() {
      return this.$t("lang.myOrder");
    },
    myShoppingCartLang() {
      return this.$t("lang.myShoppingCart");
    },
    ...mapState(["globalLang"]),
    ...mapState(["userInfo"])
  }
};
</script>
<style scoped lang="less">
.orderWrap {
  margin-top: 20px;
  width: 100%;
  .orderBox {
    width: 1240px;
    margin: 0 auto;
    padding: 0 23px;
    box-sizing: border-box;
    background-color: #fff;
    .title {
      padding: 20px 0;
      color: #333;
      font-size: 20px;
      font-weight: bold;
      border-bottom: 1px solid #e9e9e9;
    }
    .titleBox {
      padding: 20px 0;
      color: #666;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .exportBtn {
        font-size: 14px;
        font-weight: 400;
        line-height: 55px;
        color: #ff760e;
        cursor: pointer;
        .el-button {
          width: 139px;
          height: 34px;
          border: 1px solid #ff760e;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .iconfont {
          margin-right: 10px;
        }
      }
    }
    .orderInfo {
      height: 130px;
      border: 1px solid #e9e9e9;
      font-size: 14px;
      display: flex;
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
          .keys,
          .values {
            height: 19px;
          }
        }
        .left {
          color: #999;
          .keys {
            text-align: right;
          }
        }
      }
    }
    .myTable {
      border: 1px solid #e9e9e9;
      .el-table {
        color: #000;
        font-size: 14px;
        .productInformation {
          width: 100%;
          // height: 100px;
          min-height: 100px;
          display: flex;
          justify-content: space-between;
          .imgBox {
            width: 100px;
            height: 100%;
          }
          .productNameBox {
            width: 170px;
            min-height: 100px;
            text-align: left;
            box-sizing: border-box;
            padding: 0 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name {
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2; /* 这里是超出几行省略 */
              overflow: hidden;
              color: #000;
              font-weight: bold;
            }
            .fa_no,
            .price {
              color: #ff3e3e;
            }
            .price {
              font-weight: 600;
              .priceText {
                margin-left: 3px;
              }
            }
          }
          .item {
            flex: 1;
            text-align: left;
            box-sizing: border-box;
            padding: 0 5px;
            min-height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: #666666;
          }
        }
        .tableTotalVolume {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #ff3e3e;
          height: 90px;
          .price {
            font-weight: bold;
          }
        }
      }
    }
    .totalBox {
      height: 120px;
      .totalWrap {
        margin-top: 30px;
        float: right;
        display: flex;
        font-size: 16px;
        font-weight: 400;
        color: #666666;
        .item {
          margin-left: 60px;
          .value {
            color: #ff3e3e;
            margin-left: 5px;
            &.price {
              font-size: 20px;
              font-weight: bold;
            }
          }
        }
      }
      &::after {
        clear: both;
        content: "";
        display: block;
      }
    }
  }
}
</style>
