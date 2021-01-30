<template>
  <div class="myCartWrap">
    <div class="myCartBoX">
      <div class="wrapTitle">
        {{ myShoppingCartLang.myShoppingCart }}
        <span class="email">（onon@163.com）</span>
      </div>
      <el-table
        :header-cell-style="{ backgroundColor: '#F5F5F5', color: '#666' }"
        :data="tableList"
        id="myTable"
        ref="multipleTable"
        size="medium"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        highlight-current-row
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
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
          prop="the_nu"
          :label="myShoppingCartLang.unitPrice"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="volume"
          :label="myShoppingCartLang.volume"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="number"
          :label="myShoppingCartLang.number"
          align="center"
        >
          <template slot-scope="scope">
            <el-input-number
              :controls="false"
              size="mini"
              v-model="scope.row.number"
              :min="1"
              :max="99999"
            ></el-input-number>
          </template>
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
        <el-table-column :label="myShoppingCartLang.operation" align="center">
          <template slot-scope="scope">
            <i
              class="el-icon-close deleteIcon"
              @click.stop="deleteRow(scope.row)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="statisticsBox">
        <div class="totalBox">
          <div class="left"></div>
          <div class="middle">{{ myShoppingCartLang.totalQuantity }}：3</div>
          <div class="right">
            <div class="totalVolume">
              {{ myShoppingCartLang.totalVolume }}：<span class="changeColor"
                >0.000cbm 0.000cuft</span
              >
            </div>
            <div class="totalPrice">
              {{ myShoppingCartLang.totalPrice }}: USD<span class="price"
                >294.000</span
              >
            </div>
          </div>
        </div>
        <div class="contactInfoBox">
          <div class="title">{{ myShoppingCartLang.contactInformation }}</div>
          <div class="userInfoBox">
            <el-form
              label-position="right"
              label-width="130px"
              :model="formInfo"
            >
              <div class="wrapBox">
                <div class="left">
                  <el-form-item :label="myShoppingCartLang.companyName">
                    <el-input v-model="formInfo.name"></el-input>
                  </el-form-item>
                </div>
                <div class="right">
                  <el-form-item :label="myShoppingCartLang.contact">
                    <el-input v-model="formInfo.region"></el-input>
                  </el-form-item>
                  <el-form-item :label="myShoppingCartLang.email">
                    <el-input v-model="formInfo.type"></el-input>
                  </el-form-item>
                </div>
              </div>
              <el-form-item :label="myShoppingCartLang.remark">
                <el-input v-model="formInfo.name"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="submitBox">
          <el-button type="warning" class="submitBtn">Submit</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      formInfo: {},
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
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created() {},
  mounted() {},
  computed: {
    myShoppingCartLang() {
      return this.$t("lang.myShoppingCart");
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.myCartWrap {
  min-height: calc(100% - 343px) !important;
  width: 100%;
  margin-top: 20px;
  .myCartBoX {
    width: 1240px;
    background-color: #fff;
    margin: 0 auto;
    .wrapTitle {
      height: 60px;
      padding: 0 32px;
      display: flex;
      align-items: center;
      color: #333;
      font-size: 20px;
      font-weight: bold;
      .email {
        font-size: 16px;
        color: #999;
        font-weight: 400;
      }
    }
    .statisticsBox {
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      .totalBox {
        height: 50px;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        .left,
        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          .totalVolume {
            .changeColor {
              color: #ff760e;
              font-size: 18px;
            }
          }
          .totalPrice {
            .price {
              color: #ff760e;
              font-size: 24px;
              font-weight: bold;
            }
          }
        }
      }
      .contactInfoBox {
        margin-top: 20px;
        box-sizing: border-box;
        padding: 0 25px 10px 25px;
        font-size: 14px;
        color: #606266;
        background: #f5f5f5;
        .title {
          font-size: 16px;
          color: #666;
          font-weight: bold;
          box-sizing: border-box;
          padding: 26px 0;
        }
        .userInfoBox {
          .wrapBox {
            display: flex;
            .left,
            .right {
              width: 40%;
            }
            .right {
              flex: 1;
              display: flex;
              .el-form-item {
                flex: 1;
              }
            }
          }
        }
      }
      .submitBox {
        height: 106px;
        padding: 0 43px;
        .submitBtn {
          width: 197px;
          height: 46px;
          // background: #FF760E;
          opacity: 1;
          border-radius: 5px;
          font-size: 18px;
          font-weight: bold;
          margin-top: 25px;
          float: right;
        }
      }
    }
  }
}
.deleteIcon {
  cursor: pointer;
}
.tablePrice {
  .price {
    color: #ff760e;
  }
}
</style>
