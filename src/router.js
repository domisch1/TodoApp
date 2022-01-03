import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "./pages/LandingPage.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/signup", component: () => import("./pages/SignUp.vue") },
  { path: "/login", component: () => import("./pages/Login.vue") },
  { path: "/start", component: () => import("./pages/Start.vue") },
  { path: "/demo", component: () => import("./pages/Demo.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
