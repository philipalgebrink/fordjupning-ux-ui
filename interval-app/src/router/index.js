import { createRouter, createWebHistory } from "vue-router";
import LoadingScreen from "@/components/Loading.vue";
import SetTimer from "@/components/SetTimer.vue";

const routes = [
  {
    path: "/",
    name: "LoadingScreen",
    component: LoadingScreen,
  },
  {
    path: "/set-timer",
    name: "SetTimer",
    component: SetTimer,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
