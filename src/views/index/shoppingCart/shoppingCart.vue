<template>
  <div class="myCartWrap">
    <div class="myCartBoX">
      <div class="wrapTitle">
        {{ myShoppingCartLang.myShoppingCart }}
        <span class="email" v-if="userInfo.loginEmail"
          >（{{ userInfo.loginEmail }}）</span
        >
      </div>
      <!-- 排序 -->
      <div class="sortBox">
        <p :class="{ sortID: true, active: isID !== 0 }" @click="sortID">
          <span class="text">ID</span>
          <i v-show="isID === 0" class="el-icon-d-caret"></i>
          <i class="el-icon-caret-bottom" v-show="isID === 1"></i>
          <i v-show="isID === 2" class="el-icon-caret-top"></i>
        </p>
        <p :class="{ sortID: true, active: isPrice !== 0 }" @click="sortPrice">
          <span class="text">Price</span>
          <i v-show="isPrice === 0" class="el-icon-d-caret"></i>
          <i class="el-icon-caret-bottom" v-show="isPrice === 1"></i>
          <i v-show="isPrice === 2" class="el-icon-caret-top"></i>
        </p>
        <p :class="{ sortID: true, active: isCTNS !== 0 }" @click="sortCTNS">
          <span class="text">CTNS</span>
          <i v-show="isCTNS === 0" class="el-icon-d-caret"></i>
          <i class="el-icon-caret-bottom" v-show="isCTNS === 1"></i>
          <i v-show="isCTNS === 2" class="el-icon-caret-top"></i>
        </p>
        <p
          :class="{ sortID: true, active: isTotalQTY !== 0 }"
          @click="sortTotalQTY"
        >
          <span class="text">Total QTY</span>
          <i v-show="isTotalQTY === 0" class="el-icon-d-caret"></i>
          <i class="el-icon-caret-bottom" v-show="isTotalQTY === 1"></i>
          <i v-show="isTotalQTY === 2" class="el-icon-caret-top"></i>
        </p>
        <p
          :class="{ sortID: true, active: isTotalAmount !== 0 }"
          @click="sortTotalAmount"
        >
          <span class="text">Total amount</span>
          <i v-show="isTotalAmount === 0" class="el-icon-d-caret"></i>
          <i class="el-icon-caret-bottom" v-show="isTotalAmount === 1"></i>
          <i v-show="isTotalAmount === 2" class="el-icon-caret-top"></i>
        </p>
      </div>
      <!-- 表格 -->
      <!-- <el-table
        :header-cell-style="{
          backgroundColor: '#F5F5F5',
          color: '#666',
          'font-size': '14px',
          'font-weight': 400
        }"
        :data="dataList"
        id="myTable"
        ref="multipleTable"
        size="medium"
        :empty-text="publicLang.noData"
        tooltip-effect="dark"
        highlight-current-row
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          width="50"
          align="center"
          prop="index"
          :label="myShoppingCartLang.id"
        ></el-table-column>
        <el-table-column
          prop="imageUrls"
          :label="myShoppingCartLang.commodity"
          align="center"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 70px;cursor: pointer;"
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
            <span style="color:#ff3e3e;">{{ userInfo.currencyType }}</span>
            <span style="margin-left:5px;color:#ff3e3e;">
              {{ scope.row.price }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="volume"
          :label="myShoppingCartLang.volume"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.outerBoxStere }}/{{ scope.row.outerBoxFeet }}
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          :label="myShoppingCartLang.number + '(箱)'"
          align="center"
        >
          <template slot-scope="scope">
            <el-input-number
              @change="changeInputNumber"
              v-model="scope.row.shoppingCount"
              size="mini"
              :min="1"
              :max="99999"
            ></el-input-number>
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
          prop="total"
          :label="myShoppingCartLang.total"
          align="center"
        >
          <template slot-scope="scope">
            <div class="tablePrice">
              <span>{{ userInfo.currencyType }}</span>
              <span class="price">{{
                priceCount(
                  scope.row.price,
                  scope.row.outerBoxLo,
                  scope.row.shoppingCount
                )
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="myShoppingCartLang.operation"
          width="160"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              slot="reference"
              @click="toProductDetail(scope.row)"
              type="success"
              size="mini"
            >
              {{ myShoppingCartLang.view }}
            </el-button>
            <el-popconfirm
              class="deleteBtn"
              title="确定要删除此产品吗？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" type="danger" size="mini">
                {{ myShoppingCartLang.delete }}
              </el-button>
            </el-popconfirm>
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
        :data="dataList"
        id="myTable"
        ref="multipleTable"
        size="medium"
        :empty-text="publicLang.noData"
        tooltip-effect="dark"
        highlight-current-row
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          width="50"
          align="center"
          prop="index"
          :label="myShoppingCartLang.id"
        ></el-table-column>
        <el-table-column label="Product information" align="center">
          <template slot-scope="scope">
            <div class="productInformation">
              <div class="imgBox">
                <el-image
                  style="width: 100px; height: 100px; cursor: pointer;"
                  fit="contain"
                  :src="scope.row.imageUrls[0]"
                  :preview-src-list="scope.row.imageUrls"
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
                    globalLang === "zh-CN" ? scope.row.name : scope.row.ename
                  }}
                </p>
                <p class="fa_no">{{ scope.row.outFactoryNumber }}</p>
                <p class="price">
                  <span>{{ userInfo.currencyType }}</span>
                  <span class="priceText">{{ scope.row.price }}</span>
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
                    >{{ scope.row.sampleLenth }} x {{ scope.row.sampleWidth }} x
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
                    >{{ scope.row.outerBoxStere }} (CBM) /
                    {{ scope.row.outerBoxFeet }} (CUFT)</span
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
        <el-table-column label="CTNS" align="center" width="100">
          <template slot-scope="scope">
            <el-input-number
              style="width:80px;"
              @change="changeInputNumber"
              v-model="scope.row.shoppingCount"
              :controls="false"
              size="mini"
              :min="1"
              :max="99999"
            ></el-input-number>
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
                {{
                  multiply(scope.row.shoppingCount, scope.row.outerBoxStere)
                }}cbm
              </p>
              <p class="item">
                {{
                  multiply(scope.row.shoppingCount, scope.row.outerBoxFeet)
                }}cuft
              </p>
              <p class="item price">
                <span>{{ userInfo.currencyType }}</span>
                <span>
                  {{
                    priceCount(
                      scope.row.price,
                      scope.row.outerBoxLo,
                      scope.row.shoppingCount
                    )
                  }}
                </span>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template slot-scope="scope">
            <el-popconfirm
              class="deleteBtn"
              title="确定要删除此产品吗？"
              @confirm="handleDelete(scope.row)"
            >
              <i class="el-icon-delete" slot="reference"></i>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="statisticsBox">
        <div class="totalBox">
          <div class="left"></div>
          <div class="middle">
            {{ myShoppingCartLang.totalQuantity }}：{{ myTotalQuantity() }}
          </div>
          <div class="right">
            <div class="totalVolume">
              {{ myShoppingCartLang.totalVolume }}：
              <span class="changeColor">
                {{ myTotalVolume(dataList) }}
              </span>
            </div>
            <div class="totalPrice">
              {{ myShoppingCartLang.totalPrice }}：
              <span class="price">{{ userInfo.currencyType }}</span>
              <span style="margin-left:5px;" class="price">
                {{ myTotalPrice(dataList) }}
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
import { mapState, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      isID: 0,
      isPrice: 0,
      isCTNS: 0,
      isTotalQTY: 0,
      isTotalAmount: 0,
      dataList: [],
      formInfo: {
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
    // 单个产品总价
    priceCount(price, outerBoxLo, shoppingCount) {
      return this.multiply(this.multiply(price, outerBoxLo), shoppingCount);
    },
    // ID排序
    sortID() {
      this.isID = this.isID === 0 ? 1 : this.isID === 1 ? 2 : 0;
      this.isPrice = 0;
      this.isCTNS = 0;
      this.isTotalQTY = 0;
      this.isTotalAmount = 0;
      if (this.dataList.length) {
        switch (this.isID) {
          case 0:
            this.dataList.sort((a, b) => {
              return a.index - b.index;
            });
            break;
          case 1:
            this.dataList.sort((a, b) => {
              return a.index - b.index;
            });
            break;
          case 2:
            this.dataList.sort((a, b) => {
              return b.index - a.index;
            });
            break;
        }
      }
    },
    // 价格排序
    sortPrice() {
      this.isPrice = this.isPrice === 0 ? 1 : this.isPrice === 1 ? 2 : 0;
      this.isID = 0;
      this.isCTNS = 0;
      this.isTotalQTY = 0;
      this.isTotalAmount = 0;
      if (this.dataList.length) {
        switch (this.isPrice) {
          case 0:
            this.dataList.sort((a, b) => {
              return a.index - b.index;
            });
            break;
          case 1:
            this.dataList.sort((a, b) => {
              return a.price - b.price;
            });
            break;
          case 2:
            this.dataList.sort((a, b) => {
              return b.price - a.price;
            });
            break;
        }
      }
    },
    // 箱排序
    sortCTNS() {
      this.isCTNS = this.isCTNS === 0 ? 1 : this.isCTNS === 1 ? 2 : 0;
      this.isID = 0;
      this.isPrice = 0;
      this.isTotalQTY = 0;
      this.isTotalAmount = 0;
      if (this.dataList.length) {
        switch (this.isCTNS) {
          case 0:
            this.dataList.sort((a, b) => {
              return a.index - b.index;
            });
            break;
          case 1:
            this.dataList.sort((a, b) => {
              return a.shoppingCount - b.shoppingCount;
            });
            break;
          case 2:
            this.dataList.sort((a, b) => {
              return b.shoppingCount - a.shoppingCount;
            });
            break;
        }
      }
    },
    // 总数量排序
    sortTotalQTY() {
      this.isTotalQTY =
        this.isTotalQTY === 0 ? 1 : this.isTotalQTY === 1 ? 2 : 0;
      this.isID = 0;
      this.isPrice = 0;
      this.isCTNS = 0;
      this.isTotalAmount = 0;
      if (this.dataList.length) {
        switch (this.isTotalQTY) {
          case 0:
            this.dataList.sort((a, b) => {
              return a.index - b.index;
            });
            break;
          case 1:
            this.dataList.sort((a, b) => {
              return (
                a.outerBoxLo * a.shoppingCount - b.outerBoxLo * b.shoppingCount
              );
            });
            break;
          case 2:
            this.dataList.sort((a, b) => {
              return (
                b.outerBoxLo * b.shoppingCount - a.outerBoxLo * a.shoppingCount
              );
            });
            break;
        }
      }
    },
    // 总金额排序
    sortTotalAmount() {
      this.isTotalAmount =
        this.isTotalAmount === 0 ? 1 : this.isTotalAmount === 1 ? 2 : 0;
      this.isID = 0;
      this.isPrice = 0;
      this.isCTNS = 0;
      this.isTotalQTY = 0;
      // 购物车数量 * 外箱装量 *单价= 总金额
      if (this.dataList.length) {
        switch (this.isTotalAmount) {
          case 0:
            this.dataList.sort((a, b) => {
              return a.index - b.index;
            });
            break;
          case 1:
            this.dataList.sort((a, b) => {
              return (
                a.shoppingCount * a.outerBoxLo * a.price -
                b.shoppingCount * b.outerBoxLo * b.price
              );
            });
            break;
          case 2:
            this.dataList.sort((a, b) => {
              return (
                b.shoppingCount * b.outerBoxLo * b.price -
                a.shoppingCount * a.outerBoxLo * a.price
              );
            });
            break;
        }
      }
    },
    // 提交订单
    async submitOrder() {
      const selectProducts = this.$refs.multipleTable.selection;
      this.formInfo.currencyType = this.userInfo.currencyType;
      this.formInfo.shareOrderDetails = selectProducts.map(val => {
        return {
          productNumber: val.productNumber,
          productName: val.name,
          productEName: val.ename,
          productPrice: val.price,
          productCount: val.shoppingCount,
          productFeet: val.outerBoxFeet,
          productStere: val.outerBoxStere,
          productImage: val.imageUrls[0],
          currencyType: this.userInfo.currencyType,
          outerBoxLo: val.outerBoxLo,
          packMethod:
            this.globalLang === "zh-CN" ? val.packMethod : val.ePackMethod,
          productInfo: val
        };
      });
      const res = await this.$http.post(
        "/api/WebsiteShare/CreateShareOrder",
        this.formInfo
      );
      const { code, message } = res.data.result;
      if (code === 200) {
        this.$message.success("提交订单成功");
        for (let i = 0; i < this.dataList.length; i++) {
          for (let j = 0; j < selectProducts.length; j++) {
            if (this.dataList[i].id === selectProducts[j].id)
              this.dataList.splice(i, 1);
          }
        }
        this.$store.commit("resetShoppingCart", selectProducts);
        this.$router.push("/index/myOrder");
      } else {
        this.$message.error(message);
      }
    },
    // 查看产品详情
    toProductDetail(item) {
      sessionStorage.setItem("currentProductDetails", JSON.stringify(item));
      let { href } = this.$router.resolve({
        path: "/productDetails"
      });
      window.open(href, "_blank");
    },
    // 计算总数量
    myTotalQuantity() {
      let number = 0;
      for (let i = 0; i < this.dataList.length; i++) {
        number = this.add(number, this.dataList[i].shoppingCount || 0);
      }
      return number;
    },
    // 删除购物车中的某项
    handleDelete(row) {
      this.$store.commit("popShopping", row);
      this.dataList.forEach((val, i) => {
        if (val.id === row.id) {
          this.dataList.splice(i, 1);
          this.$message.error("删除成功");
        }
      });
      // for (let i = 0; i < this.dataList.length; i++) {
      //   if (this.dataList[i].id === row.id) {
      //     this.dataList.splice(i, 1);
      //     this.$message.error("删除成功");
      //   }
      // }
    },
    // 计算总价
    myTotalPrice(list) {
      let price = 0;
      for (let i = 0; i < list.length; i++) {
        price = this.add(
          price,
          this.multiply(
            this.multiply(list[i].price, list[i].shoppingCount),
            list[i].outerBoxLo
          )
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
    changeInputNumber() {
      this.$store.commit("replaceShoppingCartValueCount", this.dataList);
    }
  },
  created() {
    document.title = this.myShoppingCartLang.myShoppingCart;
  },
  mounted() {
    this.dataList = this.shoppingList
      ? JSON.parse(JSON.stringify(this.shoppingList))
      : [];
    this.formInfo.loginEmail = this.userInfo.loginEmail;
    // 默认全选
    this.$refs.multipleTable.toggleAllSelection();
  },
  watch: {
    "$store.state.globalLang"(val) {
      if (val) document.title = this.myShoppingCartLang.myShoppingCart;
    }
  },
  computed: {
    myShoppingCartLang() {
      return this.$t("lang.myShoppingCart");
    },
    advancedSearchLang() {
      return this.$t("lang.advancedSearch");
    },
    publicLang() {
      return this.$t("lang.publicLang");
    },
    ...mapState(["globalLang"]),
    ...mapState(["userInfo"]),
    ...mapGetters({
      shoppingList: "myShoppingList"
    })
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
    max-width: 1240px;
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
    .sortBox {
      display: flex;
      align-items: center;
      height: 50px;
      background: #fcfcfc;
      box-sizing: border-box;
      padding: 0 20px;
      .sortID {
        cursor: pointer;
        margin-right: 40px;
        .text {
          margin-right: 5px;
        }
        &.active {
          color: #ff760e;
        }
      }
    }
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
    .statisticsBox {
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      color: #666;
      font-size: 14px;
      .totalBox {
        height: 50px;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 25px;
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
              color: #ff3e3e;
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
              color: #ff3e3e;
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
        @{deep} .userInfoBox {
          .el-form-item {
            color: #606266;
            .el-form-item__label {
              color: #606266;
            }
          }
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
  color: #ff3e3e;
  .price {
    margin-left: 5px;
  }
}
@{deep} .el-checkbox__input {
  padding: 6px;
  .el-checkbox__inner {
    width: 18px;
    height: 18px;
    &::after {
      left: 6px;
      top: 3px;
    }
  }
}
@{deep} .el-checkbox__input.is-indeterminate {
  .el-checkbox__inner::before {
    top: 7px;
  }
}
</style>
