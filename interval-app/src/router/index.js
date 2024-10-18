import { createRouter, createWebHistory } from "vue-router";
import LoadingScreen from "@/components/Loading.vue";
import SetTimer from "@/components/SetTimer.vue";
import MainTimer from "@/components/MainTimer.vue";
import AnalogTimer from "@/components/AnalogTimer.vue";
import DigitalTimer from "@/components/DigitalTimer.vue";
import TextTimer from "@/components/TextTimer.vue";
import AlarmView from "@/components/AlarmView.vue";
import BreakView from "@/components/BreakView.vue";

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
  {
    path: "/main-timer",
    name: "MainTimer",
    component: MainTimer,
    children: [
      { path: "analog", component: AnalogTimer },
      { path: "digital", component: DigitalTimer },
      { path: "text", component: TextTimer },
      { path: "alarm", component: AlarmView },
      { path: "break", component: BreakView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
