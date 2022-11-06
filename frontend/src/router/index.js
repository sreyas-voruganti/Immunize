import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/user_register",
    name: "user_register",
    component: () => import("../views/UserRegisterView.vue"),
  },
  {
    path: "/doctor_register",
    name: "doctor_register",
    component: () => import("../views/DoctorRegisterView.vue"),
  },
  {
    path: "/user_profile",
    name: "user_profile",
    component: () => import("../views/UserProfileView.vue"),
  },
  {
    path: "/doctor_profile",
    name: "doctor_profile",
    component: () => import("../views/DoctorProfileView.vue"),
  },
  {
    path: "/doctor_vaccination",
    name: "doctor_vaccination",
    component: () => import("../views/DoctorVaccinationView.vue"),
  },

  {
    path: "*",
    component: Vue.component("page-not-found", {
      template: "",
      created: () => {
        window.location.href = "/home";
      },
    }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
