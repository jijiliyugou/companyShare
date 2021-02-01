<template>
  <div class="wrapBox">
    <div class="editionCenter">
      <div class="showTip">
        <div class="topTitle">
          <div class="left">
            {{ advancedSearchLang.comprehensiveInquiry }}
          </div>
          <div class="right" @click="openAdvancedSearch">
            {{ advancedSearchLang.advancedQuery }}
            <span style="margin-left:10px;">
              <i class="el-icon-arrow-down" v-show="isShowAdvancedSearch"></i>
              <i class="el-icon-arrow-up" v-show="!isShowAdvancedSearch"></i>
            </span>
          </div>
        </div>
        <div class="bottomInput">
          <div class="inputItem">
            <div class="title">{{ advancedSearchLang.productName + "：" }}</div>
            <div class="myInput">
              <el-input
                :placeholder="advancedSearchLang.pleaseInputTheContent"
                v-model="searchForm.name"
                clearable
              >
              </el-input>
            </div>
            <div class="unit"></div>
          </div>
          <div class="inputItem">
            <div class="title">
              {{ advancedSearchLang.packingMethod + "：" }}
            </div>
            <div class="myInput">
              <el-input
                :placeholder="advancedSearchLang.pleaseInputTheContent"
                v-model="searchForm.packingMethod"
                clearable
              >
              </el-input>
            </div>
            <div class="unit"></div>
          </div>
          <div class="inputItem">
            <div class="searchBtn" v-show="isShowAdvancedSearch">
              <el-button type="warning" icon="el-icon-search"></el-button>
            </div>
          </div>
        </div>
        <el-collapse-transition>
          <div class="consistencyWrapBox" v-show="!isShowAdvancedSearch">
            <div class="consistencyBox">
              <div class="left">
                <div class="itemInput">
                  <div class="title">
                    {{ advancedSearchLang.priceRange + "：" }}
                  </div>
                  <div class="myInput">
                    <el-input
                      :placeholder="advancedSearchLang.miniPrice"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                    <span class="middleLine">-</span>
                    <el-input
                      :placeholder="advancedSearchLang.maxPrice"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                  </div>
                  <div class="unit"></div>
                </div>
                <div class="itemInput">
                  <div class="title">
                    {{ advancedSearchLang.packageSpecification + "：" }}
                  </div>
                  <div class="myInput">
                    <el-input
                      :placeholder="advancedSearchLang.long"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                    <span class="middleLine">-</span>
                    <el-input
                      :placeholder="advancedSearchLang.width"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                    <span class="middleLine">-</span>
                    <el-input
                      :placeholder="advancedSearchLang.height"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                  </div>
                  <div class="unit">
                    CM
                  </div>
                </div>
              </div>
              <div class="middle">
                <div class="itemInput">
                  <div class="title">
                    {{ advancedSearchLang.productSpecification + "：" }}
                  </div>
                  <div class="myInput">
                    <el-input
                      :placeholder="advancedSearchLang.long"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                    <span class="middleLine">-</span>
                    <el-input
                      :placeholder="advancedSearchLang.width"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                    <span class="middleLine">-</span>
                    <el-input
                      :placeholder="advancedSearchLang.height"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                  </div>
                  <div class="unit">
                    CM
                  </div>
                </div>
                <div class="itemInput">
                  <div class="title">
                    {{ advancedSearchLang.exFactoryArticleNo + "：" }}
                  </div>
                  <div class="myInput">
                    <el-select
                      v-model="value"
                      :placeholder="advancedSearchLang.pleaseSelect"
                    >
                      <el-option
                        v-for="item in []"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="unit"></div>
                </div>
              </div>
              <div class="right">
                <div class="itemInput">
                  <div class="title">
                    {{ advancedSearchLang.specificationOfOuterBox + "：" }}
                  </div>
                  <div class="myInput">
                    <el-input
                      :placeholder="advancedSearchLang.long"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                    <span class="middleLine">-</span>
                    <el-input
                      :placeholder="advancedSearchLang.width"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                    <span class="middleLine">-</span>
                    <el-input
                      :placeholder="advancedSearchLang.height"
                      v-model="searchForm.productName"
                    >
                    </el-input>
                  </div>
                  <div class="unit">
                    CM
                  </div>
                </div>
                <div class="itemInput">
                  <div class="title">
                    {{ advancedSearchLang.dateOfIssue + "：" }}
                  </div>
                  <div class="myInput">
                    <el-select
                      v-model="value"
                      :placeholder="advancedSearchLang.pleaseSelect"
                    >
                      <el-option
                        v-for="item in []"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="unit"></div>
                </div>
              </div>
            </div>
            <div class="pictureBox">
              <div class="itemInput">
                <div class="title">{{ advancedSearchLang.picture + "：" }}</div>
                <div class="myInput">
                  <el-radio v-model="radio" label="1">{{
                    advancedSearchLang.yes
                  }}</el-radio>
                  <el-radio v-model="radio" label="2">{{
                    advancedSearchLang.no
                  }}</el-radio>
                </div>
              </div>
            </div>
            <div class="btns">
              <el-button>{{ advancedSearchLang.reset }}</el-button>
              <el-button icon="el-icon-search"></el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      radio: "",
      value: "",
      isShowAdvancedSearch: true,
      activeNames: "activeNames"
    };
  },
  computed: {
    advancedSearchLang() {
      return this.$t("lang.advancedSearch");
    },
    ...mapState(["searchForm"])
  },
  methods: {
    toLogin() {
      // this.$router.push({ path: '/login', query: { id: 'suo' }})
    },
    // 打开高级搜索
    openAdvancedSearch() {
      this.isShowAdvancedSearch = !this.isShowAdvancedSearch;
    },
    handleChange() {
      console.log(123);
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.wrapBox {
  width: 100%;
  .editionCenter {
    color: #333333;
    font-size: 14px;
    max-width: 1240px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px 27px;
    box-sizing: border-box;
    background-color: #fff;
    .showTip {
      width: 100%;
      .topTitle {
        display: flex;
        justify-content: space-between;
        .right {
          cursor: pointer;
        }
      }
      // 第一行搜索
      .bottomInput {
        margin-top: 20px;
        display: flex;
        .inputItem {
          flex: 1;
          display: flex;
          margin-left: 10px;
          &:first-of-type {
            margin-left: 0;
          }
          .title {
            display: flex;
            width: 133px;
            align-items: center;
          }
          .myInput {
            width: 186px;
            align-items: center;
          }
          .unit {
            width: 40px;
            text-align: center;
          }
          .searchBtn {
            .el-button {
              color: #fff;
              width: 86px;
              height: 40px;
              background: #ff760e;
              border-radius: 4px;
            }
          }
        }
      }
      // 折叠面板
      .consistencyWrapBox {
        .consistencyBox {
          width: 100%;
          display: flex;
          .left,
          .right,
          .middle {
            flex: 1;
            .itemInput {
              margin-top: 20px;
              display: flex;
              align-items: center;
              .title {
                display: flex;
                width: 133px;
                align-items: center;
              }
              .myInput {
                display: flex;
                width: 186px;
                align-items: center;
                .middleLine {
                  margin: 0 5px;
                }
              }
              .unit {
                width: 40px;
                text-align: center;
              }
            }
          }
          .middle {
            flex: 1;
            margin-left: 10px;
            .itemInput {
              margin-top: 20px;
              display: flex;
              align-items: center;
              .title {
                display: flex;
                width: 133px;
                align-items: center;
              }
              .myInput {
                display: flex;
                width: 186px;
                align-items: center;
                .middleLine {
                  margin: 0 5px;
                }
              }
              .unit {
                width: 40px;
                text-align: center;
              }
            }
          }
          .right {
            flex: 1;
          }
        }
        .pictureBox {
          margin-top: 20px;
          .itemInput {
            width: 33.33%;
            display: flex;
            .title {
              display: flex;
              width: 133px;
              align-items: center;
            }
            .myInput {
              display: flex;
              width: 186px;
              align-items: center;
              .middleLine {
                margin: 0 5px;
              }
            }
          }
        }
        .btns {
          padding: 30px;
          display: flex;
          justify-content: center;
          .el-button {
            height: 36px;
            width: 86px;
            background-color: #ebebeb;
            border-color: #ebebeb;
            color: #666;
            &:last-of-type {
              margin-left: 24px;
              background-color: #ff760e;
              color: #fff;
              border-color: #ff760e;
            }
          }
        }
      }
    }
  }
}
</style>
