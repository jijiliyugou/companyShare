import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screenWidth: 0,
    globalLang: "en",
    userInfo: {}
  },
  mutations: {
    setLang(state, payLoad) {
      state.globalLang = payLoad;
    },
    handlerUserInfo(state, payLoad) {
      state.userInfo = payLoad;
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
