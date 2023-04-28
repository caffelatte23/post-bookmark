import { createRouter, createWebHashHistory } from "vue-router"

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "root",
      component: () => import("./components/menu.vue")
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("./components/setting.vue")
    }
  ]
})