import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/shops/estimated",
    name: "Estimated shops parameter",
    component: () => import("../views/shop/EstimatedShopsParameter.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
