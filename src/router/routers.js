/** 404模块 */
import _404 from "@/router/404/index.js";

const Login = () => import("@/views/login.vue");
const Index = () => import("@/views/index/index.vue");
const Home = () => import("@/views/index/home/home.vue");
const Product = () => import("@/views/index/product/product.vue");
const MyOrder = () => import("@/views/index/myOrder/myOrder.vue");
const ShoppingCart = () =>
  import("@/views/index/shoppingCart/shoppingCart.vue");
const ProductDetails = () =>
  import("@/views/productDetails/productDetails.vue");
const OrderDetail = () => import("@/views/orderDetail/orderDetail.vue");

export default [
  _404,
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/productDetails",
    name: "productDetails",
    component: ProductDetails
  },
  {
    path: "/orderDetail",
    name: "orderDetail",
    component: OrderDetail
  },
  {
    path: "/index",
    name: "index",
    component: Index,
    children: [
      {
        path: "/index/home",
        name: "home",
        component: Home
      },
      {
        path: "/index/product",
        name: "product",
        component: Product
      },
      {
        path: "/index/shoppingCart",
        name: "shoppingCart",
        component: ShoppingCart
      },
      {
        path: "/index/myOrder",
        name: "myOrder",
        component: MyOrder
      },
      {
        path: "/index",
        redirect: "/index/home"
      }
    ]
  },
  {
    path: "/",
    redirect: "/login"
  }
];
