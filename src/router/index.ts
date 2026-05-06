import App from "@/layouts/App.vue";
import Home from "@/views/app/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: App,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
      ],
    },
  ],
});

export default router;
