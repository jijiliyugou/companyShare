<template>
  <div class="orderWrap">
    <div class="orderBox">
      <div class="title">
        {{ myOrderLang.orderDetails }}
      </div>
      <div class="titleBox">
        <div class="titleText">{{ myOrderLang.orderInformation }}</div>
        <div class="exportBtn">
          <el-button type="warning" plain
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
            <div class="values">S168988444444</div>
            <div class="values">Lok fun toy company</div>
            <div class="values">Lok fun toy company</div>
          </div>
        </div>
        <div class="two">
          <div class="left">
            <div class="keys">{{ myOrderLang.orderTime }}：</div>
            <div class="keys">{{ myOrderLang.contact }}：</div>
            <div class="keys"></div>
          </div>
          <div class="right">
            <div class="values">2021-01-23</div>
            <div class="values">Mr.胡</div>
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
            <div class="values">onoh@163.com</div>
            <div class="values"></div>
          </div>
        </div>
      </div>
      <div class="titleBox">
        <div class="titleText">{{ myOrderLang.productInformation }}</div>
        <div class="exportBtn"></div>
      </div>
      <div class="myTable">
        <el-table
          :header-cell-style="{ backgroundColor: '#F5F5F5', color: '#666' }"
          :data="tableList"
          id="myTable"
          ref="multipleTable"
          size="medium"
          tooltip-effect="dark"
          highlight-current-row
        >
          <el-table-column
            prop="img"
            :label="myShoppingCartLang.commodity"
            align="center"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 70px"
                :src="scope.row.img"
                :preview-src-list="[scope.row.img]"
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
            prop="productName"
            :label="myShoppingCartLang.productName"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="the_nu"
            :label="myShoppingCartLang.unitPrice"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="volume"
            :label="myShoppingCartLang.totalCapacity"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="number"
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
                USD
                <span class="price">{{ scope.row.total }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="totalBox">
        <div class="totalWrap">
          <div class="item">
            {{ myOrderLang.totalQuantity }}：
            <span>6</span>
          </div>
          <div class="item">
            {{ myOrderLang.totalVolume }}：
            <span class="value">0.000cbm 0.000cuft</span>
          </div>
          <div class="item">
            {{ myOrderLang.totalPrice }}：USD
            <span class="value price">588.00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList: [
        {
          id: 0,
          number: 1,
          total: 98.0,
          img: require("@/assets/images/cheche.png")
        },
        { id: 1, number: 2, total: 198.0 },
        { id: 2, number: 3, total: 78.0 }
      ]
    };
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {
    myOrderLang() {
      return this.$t("lang.myOrder");
    },
    myShoppingCartLang() {
      return this.$t("lang.myShoppingCart");
    }
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
            color: #ff760e;
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
