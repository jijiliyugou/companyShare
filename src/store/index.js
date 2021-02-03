import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
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
    pushShopping(state, payLoad) {
      console.log(111);
      state.shoppingList.push(payLoad);
    },
    handlerSearchForm(state, payLoad) {
      state.searchForm = payLoad;
    },
    replaceShoppingCart(state, payLoad) {
      state.shoppingList = payLoad;
    },
    resetShoppingCart(state, payLoad) {
      console.log(111);
      for (let i = 0; i < state.shoppingList.length; i++) {
        for (let j = 0; j < payLoad.length; j++) {
          if (state.shoppingList[i].id === payLoad[j].id) {
            state.shoppingList.splice(i, 1);
          }
        }
      }
    },
    popShopping(state, payLoad) {
      for (let i = 0; i < state.shoppingList.length; i++) {
        if (state.shoppingList[i].id === payLoad.id)
          state.shoppingList.splice(i, 1);
      }
    },
    handlerAppLoading(state, payLoad) {
      state.AppLoading = payLoad;
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
});
