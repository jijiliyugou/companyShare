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
    shoppingList: []
  },
  mutations: {
    setLang(state, payLoad) {
      state.globalLang = payLoad;
    },
    handlerUserInfo(state, payLoad) {
      state.userInfo = payLoad;
    },
    pushShopping(state, payLoad) {
      state.shoppingList.push(payLoad);
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
