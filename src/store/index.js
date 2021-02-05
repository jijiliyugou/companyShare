import Vue from "vue";
import Vuex from "vuex";
// import myAxios from "@/request/http";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
// function myForEach(oList, yList) {
//   return [];
// }
const store = new Vuex.Store({
  state: {
    screenWidth: 0,
    globalLang: "en",
    userInfo: null,
    AppLoading: false,
    shoppingList: [],
    searchForm: {
      // 产品搜索表单
      keyword: "", // 关键字
      name: "", // 产品名称
      ch_pa: "", // 包装方式
      minPrice: "", // 最低价格
      maxPrice: "", // 最高价格
      pr_le: "", // 产品规格 长
      pr_wi: "", // 产品规格 宽
      pr_hi: "", // 产品规格 高
      ou_le: "", // 外箱规格 长
      ou_wi: "", // 外箱规格 宽
      ou_hi: "", // 外箱规格 高
      in_le: "", // 包装规格 长
      in_wi: "", // 包装规格 长
      in_hi: "", // 包装规格 长
      fa_no: "", // 出厂货号
      startTime: "", // 开始时间
      endTime: "", // 结束时间
      isUpInsetImg: true // 是否有图片
    }
  },
  mutations: {
    handlerSearchDate(state, payLoad) {
      state.searchForm.startTime = payLoad.startTime;
      state.searchForm.endTime = payLoad.endTime;
    },
    setLang(state, payLoad) {
      state.globalLang = payLoad;
    },
    handlerUserInfo(state, payLoad) {
      state.userInfo = payLoad;
    },
    // 加购
    pushShopping(state, payLoad) {
      if (state.userInfo.loginEmail) {
        if (state[state.userInfo.loginEmail]) {
          state[state.userInfo.loginEmail].push(payLoad);
        } else {
          state[state.userInfo.loginEmail] = [payLoad];
        }
      } else {
        state.shoppingList.push(payLoad);
      }
    },
    handlerSearchForm(state, payLoad) {
      state.searchForm = payLoad;
    },
    // 更新购物车
    replaceShoppingCart(state, payLoad) {
      if (state.userInfo.loginEmail) {
        state[state.userInfo.loginEmail] = payLoad;
      } else {
        state.shoppingList = payLoad;
      }
    },
    // 删除购物车某一个或多个商品
    resetShoppingCart(state, payLoad) {
      if (state.userInfo.loginEmail) {
        if (state[state.userInfo.loginEmail]) {
          for (let i = 0; i < state[state.userInfo.loginEmail].length; i++) {
            for (let j = 0; j < payLoad.length; j++) {
              if (state[state.userInfo.loginEmail][i].id === payLoad[j].id) {
                state[state.userInfo.loginEmail].splice(i, 1);
              }
            }
          }
        } else {
          state[state.userInfo.loginEmail] = [];
        }
      } else {
        for (let i = 0; i < state.shoppingList.length; i++) {
          for (let j = 0; j < payLoad.length; j++) {
            if (state.shoppingList[i].id === payLoad[j].id) {
              state.shoppingList.splice(i, 1);
            }
          }
        }
      }
    },
    // 删除购物车某指定一个商品
    popShopping(state, payLoad) {
      if (state.userInfo.loginEmail) {
        if (state[state.userInfo.loginEmail]) {
          for (let i = 0; i < state[state.userInfo.loginEmail].length; i++) {
            if (state[state.userInfo.loginEmail][i].id === payLoad.id)
              state[state.userInfo.loginEmail].splice(i, 1);
          }
        } else {
          state[state.userInfo.loginEmail] = [];
        }
      } else {
        for (let i = 0; i < state.shoppingList.length; i++) {
          if (state.shoppingList[i].id === payLoad.id)
            state.shoppingList.splice(i, 1);
        }
      }
    },
    handlerAppLoading(state, payLoad) {
      state.AppLoading = payLoad;
    }
  },
  getters: {
    myShoppingList(state) {
      if (state.userInfo && state.userInfo.loginEmail) {
        return state[state.userInfo.loginEmail] || [];
      } else {
        return state.shoppingList;
      }
    }
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
});
export default store;
