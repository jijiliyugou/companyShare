import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routers.js";
import $Store from "@/store";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// 拦截
router.beforeEach(async (to, from, next) => {
  // 如果没有登录token
  if (to.path !== "/login" && to.path !== "/404" && !$Store.state.userInfo) {
    return next({ path: "/login" });
  }
  next();
});
// 路由报错
router.onError(error => {
  console.log(error);
  // 已有路由未配置页面文件的情况下就乖乖去404吧
  router.push("/404");
});

export default router;
