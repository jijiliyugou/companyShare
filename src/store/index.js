import Vue from "vue";
import Vuex from "vuex";
import { Message } from "element-ui";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
function myForEach(oList, yList) {
  for (let i = 0; i < oList.length; i++) {
    for (let j = 0; j < yList.length; j++) {
      if (oList[i].id === yList[j].id) {
        oList.splice(i, 1);
      }
    }
  }
}
const store = new Vuex.Store({
  state: {
    screenWidth: 0,
    globalLang: "en",
    userInfo: null,
    AppLoading: false,
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
    handlerAppLoading(state, payLoad) {
      state.AppLoading = payLoad;
    },
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
    handlerSearchForm(state, payLoad) {
      for (const key in payLoad) {
        state.searchForm[key] = payLoad[key];
      }
    },
    // 加购
    pushShopping(state, payLoad) {
      const key =
        state.userInfo.shareId + "_" + (state.userInfo.loginEmail || "");
      if (state[key]) {
        payLoad.index = state[key].length + 1;
        state[key].push(payLoad);
      } else {
        payLoad.index = 1;
        Vue.prototype.$set(state, key, [payLoad]);
      }
      if (state.userInfo.loginEmail) store.dispatch("addServiceShoppingCart");
    },
    // 更新购物车
    replaceShoppingCart(state, payLoad) {
      const key =
        state.userInfo.shareId + "_" + (state.userInfo.loginEmail || "");
      Vue.prototype.$set(state, key, payLoad);
      if (state.userInfo.loginEmail) store.dispatch("addServiceShoppingCart");
    },
    // 删除购物车某一个或多个商品
    resetShoppingCart(state, payLoad) {
      const key =
        state.userInfo.shareId + "_" + (state.userInfo.loginEmail || "");
      myForEach(state[key], payLoad);
      if (state.userInfo.loginEmail) store.dispatch("addServiceShoppingCart");
    },
    // 删除购物车某指定一个商品
    popShopping(state, payLoad) {
      const key =
        state.userInfo.shareId + "_" + (state.userInfo.loginEmail || "");
      for (let i = 0; i < state[key].length; i++) {
        if (state[key][i].id === payLoad.id) state[key].splice(i, 1);
      }
      if (state.userInfo.loginEmail) store.dispatch("addServiceShoppingCart");
    },
    // 修改数量方法
    replaceShoppingCartValueCount(state, payLoad) {
      const key =
        state.userInfo.shareId + "_" + (state.userInfo.loginEmail || "");
      for (let i = 0; i < state[key].length; i++) {
        for (const keys in state[key][i]) {
          Vue.prototype.$set(state[key][i], keys, payLoad[i][keys]);
        }
      }
      if (state.userInfo.loginEmail) store.dispatch("addServiceShoppingCart");
    }
  },
  getters: {
    myShoppingList(state) {
      if (!state.userInfo) {
        return [];
      }
      return state[
        state.userInfo.shareId + "_" + (state.userInfo.loginEmail || "")
      ];
    }
  },
  actions: {
    addServiceShoppingCart({ state }) {
      Vue.prototype.$http
        .post("/api/WebsiteShare/AddShoppingCart", {
          loginEmail: state.userInfo.loginEmail,
          shoppingCarts:
            state[state.userInfo.shareId + "_" + state.userInfo.loginEmail]
        })
        .then(res => {
          if (res.data.result.code !== 200) {
            Message.closeAll();
            Message.error(res.data.result.message);
          }
        });
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
