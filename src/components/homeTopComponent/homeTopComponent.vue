<template>
  <div class="wrap">
    <div class="topLauot">
      <div class="left">
        <el-image
          width="55px"
          height="60px"
          :src="require('@/assets/images/hallLogoImg.png')"
        ></el-image>
        <text class="leftTitleText">{{ homeLang.PreferredToys }}</text>
      </div>
      <div class="right">
        <div class="myInput">
          <el-input
            prefix-icon="el-icon-search"
            :placeholder="homeLang.SearchPlaceholder"
            v-model="searchValue"
          >
            <i
              slot="suffix"
              @click="openUpload"
              class="el-input__icon el-icon-camera"
            ></i>
          </el-input>
          <el-button>{{ homeLang.search }}</el-button>
        </div>
        <div class="langBox">
          <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              {{ currentLang.name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="item"
                v-for="(item, i) in langs"
                :key="i"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 菜单栏 -->
    <div class="menuBox">
      <div class="menuWrap">
        <div class="left">
          <el-menu
            :default-active="$route.path"
            background-color="#3368A9"
            text-color="#fff"
            router
            active-text-color="#ffd04b"
            class="el-menu-demo"
            mode="horizontal"
          >
            <el-menu-item index="/index/home">{{ homeLang.home }}</el-menu-item>
            <el-menu-item index="/index/product">{{
              homeLang.product
            }}</el-menu-item>
          </el-menu>
        </div>
        <div class="right">
          <div class="itemBox myCart">
            <text class="icon cartIcon"></text>
            {{ homeLang.ShoppingCart }}
          </div>
          <div class="itemBox myOrder">
            <text class="icon orderIcon"></text>
            {{ homeLang.MyOrder }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-top-component",
  props: {},
  computed: {
    homeLang() {
      return this.$t("lang.home");
    }
  },
  data() {
    return {
      currentLang: {
        name: "请选择语言"
      },
      langs: [
        {
          name: "中文",
          value: "zh-CN"
        },
        {
          name: "English",
          value: "en"
        }
      ],
      searchValue: ""
    };
  },
  mounted() {
    this.initLang();
  },
  methods: {
    // 初始化语言
    initLang() {
      switch (this.$store.state.globalLang) {
        case "zh-CN":
          this.currentLang = {
            name: "中文",
            value: "zh-CN"
          };
          break;
        case "en":
          this.currentLang = {
            name: "English",
            value: "en"
          };
          break;
        default:
          this.currentLang = {
            name: "请选择语言"
          };
          break;
      }
    },
    // 选择了语言
    handleCommand(lang) {
      this.currentLang = lang;
      this.$i18n.locale = lang.value;
      this.$store.commit("setLang", lang.value);
    },
    // 打开图搜
    openUpload() {
      console.log(123);
    }
  }
};
</script>

<style scoped lang="less">
.wrap {
  width: 100%;
  background-color: #fff;
  .topLauot {
    height: 130px;
    max-width: 1240px;
    margin: 0 auto;
    display: flex;
    .left,
    .right {
      height: 130px;
      flex: 1;
      display: flex;
      align-items: center;
      .leftTitleText {
        margin-left: 20px;
      }
      .langBox {
        margin-left: 46px;
        min-width: 80px;
        .el-dropdown {
          cursor: pointer;
        }
      }
      .myInput {
        width: 437px;
        height: 44px;
        background: #ffffff;
        border: 2px solid #3368a9;
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        ::v-deep .el-input {
          height: 40px;
          border: none;
          .el-input__inner {
            height: 40px;
            border: none;
          }
        }
        .el-input__icon {
          cursor: pointer;
          font-size: 16px;
          color: #3368a9;
        }
        .el-button {
          background-color: #3368a9;
          color: #fff;
          border-color: #3368a9;
          border-radius: 0px;
        }
      }
    }
  }
  .menuBox {
    width: 100%;
    height: 50px;
    background-color: #3368a9;
    color: #fff;
    font-size: 14px;
    .menuWrap {
      max-width: 1240px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      .left,
      .right {
        flex: 1;
        display: flex;
        align-items: center;
        .el-menu {
          height: 50px;
          .el-menu-item {
            height: 50px;
            text-align: center;
            line-height: 50px;
          }
        }
      }
      .right {
        justify-content: flex-end;
        .itemBox {
          width: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .icon {
            width: 18px;
            height: 18px;
            margin-right: 10px;
            &.cartIcon {
              background: url("~@/assets/images/cartIcon.png") center no-repeat;
              background-size: 100% 100%;
            }
            &.orderIcon {
              width: 14px;
              background: url("~@/assets/images/orderIcon.png") center no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
}
</style>
