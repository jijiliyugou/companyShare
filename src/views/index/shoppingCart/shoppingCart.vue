<template>
  <div class="myCartWrap">
    <div class="myCartBoX">
      <div class="wrapTitle">
        {{ myShoppingCartLang.myShoppingCart }}
        <span class="email" v-if="userInfo.loginEmail"
          >（{{ userInfo.loginEmail }}）</span
        >
      </div>
      <el-table
        :header-cell-style="{ backgroundColor: '#F5F5F5', color: '#666' }"
        :data="shoppingList"
        id="myTable"
        ref="multipleTable"
        size="medium"
        tooltip-effect="dark"
        highlight-current-row
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="imageUrls"
          :label="myShoppingCartLang.commodity"
          align="center"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 70px"
              fit="contain"
              :src="scope.row.imageUrls[0]"
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
          prop="price"
          :label="myShoppingCartLang.unitPrice"
          align="center"
        >
          <template slot-scope="scope">
            USD <span style="margin-left:5px;">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="volume"
          :label="myShoppingCartLang.volume"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.outerBoxStere }}(cbm)
            {{ scope.row.outerBoxFeet }}(cuft)
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          :label="myShoppingCartLang.number"
          align="center"
        >
          <template slot-scope="scope">
            <!-- @change="changeInputNumber" -->
            <el-input-number
              size="mini"
              v-model="scope.row.shoppingCount"
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
              <span class="price">{{
                multiply(scope.row.price, scope.row.shoppingCount)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="myShoppingCartLang.operation" align="center">
          <template slot-scope="scope">
            <el-popconfirm
              class="deleteBtn"
              title="确定要删除此产品吗？"
              @confirm="handleDelete(scope.row)"
            >
              <i slot="reference" class="el-icon-close deleteIcon"></i>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="statisticsBox">
        <div class="totalBox">
          <div class="left"></div>
          <div class="middle">
            {{ myShoppingCartLang.totalQuantity }}：{{ shoppingList.length }}
          </div>
          <div class="right">
            <div class="totalVolume">
              {{ myShoppingCartLang.totalVolume }}：
              <span class="changeColor">
                {{ myTotalVolume(shoppingList) }}
              </span>
            </div>
            <div class="totalPrice">
              {{ myShoppingCartLang.totalPrice }}: USD
              <span style="margin-left:5px;" class="price">
                {{ myTotalPrice(shoppingList) }}
              </span>
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
                    <el-input v-model="formInfo.companyName"></el-input>
                  </el-form-item>
                </div>
                <div class="right">
                  <el-form-item :label="myShoppingCartLang.contact">
                    <el-input v-model="formInfo.contactName"></el-input>
                  </el-form-item>
                  <el-form-item :label="myShoppingCartLang.email">
                    <el-input v-model="formInfo.email"></el-input>
                  </el-form-item>
                </div>
              </div>
              <el-form-item :label="myShoppingCartLang.remark">
                <el-input v-model="formInfo.remark"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="submitBox">
          <el-button
            type="warning"
            :disabled="
              $refs.multipleTable && $refs.multipleTable.selection.length < 1
            "
            class="submitBtn"
            @click="submitOrder"
            >{{ myShoppingCartLang.submit
            }}<span
              v-if="
                $refs.multipleTable && $refs.multipleTable.selection.length > 0
              "
            >
              ({{
                $refs.multipleTable && $refs.multipleTable.selection.length
              }})
            </span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      formInfo: {
        companyNumber: "",
        loginEmail: "",
        companyName: "",
        contactName: "",
        email: "",
        remark: "",
        shareOrderDetails: []
      },
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
    // 形成订单
    async submitOrder() {
      const selectProducts = this.$refs.multipleTable.selection;
      this.formInfo.shareOrderDetails = selectProducts.map(val => {
        return {
          id: this.userInfo.shareId,
          productNumber: val.productNumber,
          productName: val.name,
          productEName: val.ename,
          productPrice: val.price,
          productCount: val.shoppingCount,
          productFeet: val.outerBoxFeet,
          productStere: val.outerBoxStere,
          productImage: val.imageUrls[0]
        };
      });
      const res = await this.$http.post(
        "/api/WebsiteShare/CreateShareOrder",
        this.formInfo
      );
      const { code, message } = res.data.result;
      if (code === 200) {
        this.$store.commit("resetShoppingCart", selectProducts);
        this.$message.success("提交订单成功");
      } else {
        this.$message.error(message);
      }
    },
    // 删除购物车中的某项
    handleDelete(row) {
      this.$store.commit("popShopping", row);
    },
    // 计算总价
    myTotalPrice(list) {
      let price = 0;
      for (let i = 0; i < list.length; i++) {
        price = this.add(
          price,
          this.multiply(list[i].price, list[i].shoppingCount)
        );
      }
      return price;
    },
    // 计算总体积材积
    myTotalVolume(list) {
      let outerBoxStere = 0,
        outerBoxFeet = 0;
      for (let i = 0; i < list.length; i++) {
        outerBoxStere = this.add(
          outerBoxStere,
          this.multiply(list[i].outerBoxStere, list[i].shoppingCount)
        );
        outerBoxFeet = this.add(
          outerBoxFeet,
          this.multiply(list[i].outerBoxFeet, list[i].shoppingCount)
        );
      }
      return outerBoxStere + "(cbm)" + outerBoxFeet + "(cuft)";
    },
    // 修改购物车数量
    // changeInputNumber() {
    //   console.log(this.shoppingList);
    //   // this.$store.commit("replaceShoppingCart", [...this.shoppingList]);
    // }
  },
  created() {
    document.title = "购物车";
  },
  mounted() {
    this.formInfo.companyNumber = this.userInfo.companyNumber;
    this.formInfo.loginEmail = this.userInfo.loginEmail;
    // 默认全选
    this.$refs.multipleTable.toggleAllSelection();
  },
  computed: {
    myShoppingCartLang() {
      return this.$t("lang.myShoppingCart");
    },
    ...mapState(["userInfo"]),
    ...mapState(["shoppingList"])
  },
  filters: {}
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.myCartWrap {
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
            margin-left: 10px;
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .changeColor {
              color: #ff760e;
              font-size: 18px;
            }
          }
          .totalPrice {
            display: flex;
            align-items: center;
            margin-left: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
