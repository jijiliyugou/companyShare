<template>
  <div class="wrap">
    <div class="topLauot">
      <div class="left">
        <el-image
          @click.native="tohome"
          fit="contain"
          :src="userInfo && userInfo.companyLogo"
        >
          <div slot="placeholder" class="image-slot">
            <img :src="require('@/assets/images/logo.png')" />
          </div>
          <div slot="error" class="image-slot">
            <img :src="require('@/assets/images/logo.png')" />
          </div>
        </el-image>
        <span class="leftTitleText">{{
          userInfo && userInfo.companyName
        }}</span>
      </div>
      <div class="right">
        <div class="myInput">
          <el-input
            prefix-icon="el-icon-search"
            :placeholder="homeLang.SearchPlaceholder"
            @keyup.enter.native="search"
            @keyup.native="handlerSearchForms"
            v-model="searchForm.keyword"
          >
            <i
              slot="suffix"
              @click="openUpload"
              class="el-input__icon el-icon-camera"
            ></i>
          </el-input>
          <el-button @click="search" class="searchBtn">{{
            homeLang.search
          }}</el-button>
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
            <el-menu-item
              index="/index/product"
              :route="{ path: '/index/product', query: { productType: 1 } }"
              >{{ homeLang.product }}</el-menu-item
            >
          </el-menu>
        </div>
        <div class="right">
          <!-- <div class="itemBox myCart">
            <text class="icon cartIcon"></text>
            {{ homeLang.ShoppingCart }}
          </div>
          <div class="itemBox myOrder">
            <text class="icon orderIcon"></text>
            {{ homeLang.MyOrder }}
          </div> -->
          <el-menu
            :default-active="$route.path"
            background-color="#3368A9"
            text-color="#fff"
            router
            active-text-color="#ffd04b"
            class="el-menu-demo"
            mode="horizontal"
          >
            <el-menu-item index="/index/shoppingCart">
              <template slot="title">
                <el-badge
                  type="warning"
                  :hidden="!shoppingList || shoppingList.length < 1"
                  :value="shoppingList && shoppingList.length"
                  class="myBadge"
                >
                  <i class="iconfont icon-gouwuche"></i>
                </el-badge>
                <span>{{ homeLang.ShoppingCart }}</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/index/myOrder">
              <template slot="title">
                <i class="iconfont icon-dingdan1"></i>
                <span>{{ homeLang.MyOrder }}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "home-top-component",
  props: {},
  computed: {
    homeLang() {
      return this.$t("lang.home");
    },
    ...mapGetters({
      shoppingList: "myShoppingList"
    }),
    ...mapState(["searchForm"]),
    ...mapState(["userInfo"])
  },
  data() {
    return {
      currentLang: {
        name: "请选择语言"
      },
      langs: [
        {
          name: "简体中文",
          value: "zh-CN"
        },
        {
          name: "English",
          value: "en"
        }
      ]
    };
  },
  mounted() {
    // var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    // link.type = 'image/x-icon';
    // link.rel = 'shortcut icon';
    // link.href = 'http://www.stackoverflow.com/favicon.ico';
    // document.getElementsByTagName('head')[0].appendChild(link);
    this.initLang();
  },
  methods: {
    // 去首页
    tohome() {
      if (this.$route.path.includes("/index/home")) return false;
      else this.$router.push("/index/home");
    },
    // 修改搜索内容
    handlerSearchForms() {
      this.$store.commit("handlerSearchForm", this.searchForm);
    },
    // 搜索产品
    search() {
      if (this.$route.path.includes("/index/product"))
        this.$root.eventHub.$emit("resetProducts");
      else this.$router.push("/index/product?productType=1");
    },
    // 初始化语言
    initLang() {
      switch (this.$store.state.globalLang) {
        case "zh-CN":
          this.currentLang = {
            name: "简体中文",
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
      this.$confirm("敬请期待！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).catch(err => {
        // eslint-disable-next-line
        console.log(err);
      });
    }
  }
};
</script>

<style scoped lang="less">
@deep: ~">>>";
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
      .el-image {
        cursor: pointer;
        width: 60px;
        height: 60px;
        img {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }
      }
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .leftTitleText {
        max-width: 500px;
        font-size: 36px;
        font-weight: bold;
        color: #333333;
        margin-left: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
          font-size: 20px;
          color: #3368a9;
        }
        .el-button {
          background-color: #3368a9;
          color: #fff;
          border-color: #3368a9;
          min-width: 90px;
          font-size: 16px;
          border-radius: 0px;
        }
      }
    }
  }
  .menuBox {
    width: 100%;
    height: 52px;
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
          box-sizing: border-box;
          .el-menu-item {
            min-width: 180px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 18px;
          }
        }
      }
      .right {
        justify-content: flex-end;
        .el-menu {
          .el-menu-item {
            font-size: 14px !important;
          }
        }
        .el-menu-item i {
          color: #fff;
          margin-right: 10px;
        }
        .el-menu-item.is-active i {
          color: #fff;
          margin-right: 10px;
        }
        // .itemBox {
        //   width: 160px;
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        //   cursor: pointer;
        //   .icon {
        //     width: 18px;
        //     height: 18px;
        //     margin-right: 10px;
        // &.cartIcon {
        //   background: url("~@/assets/images/cartIcon.png") center no-repeat;
        //   background-size: 100% 100%;
        // }
        // &.orderIcon {
        //   width: 14px;
        //   background: url("~@/assets/images/orderIcon.png") center no-repeat;
        //   background-size: 100% 100%;
        // }
        //   }
        // }
      }
    }
  }
}
@{deep} .el-menu-item {
  &.is-active {
    background-color: rgba(255, 255, 255, 0.2) !important;
    color: #fff !important;
    border-bottom-color: #5c86ba !important;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #fff;
      left: 50%;
      bottom: -3px;
      transform: translate(-50%, 0);
    }
  }
}
@{deep} .myBadge {
  .el-badge__content.is-fixed {
    top: 15px;
    right: 20px;
  }
}
</style>
