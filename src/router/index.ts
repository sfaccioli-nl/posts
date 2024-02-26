import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PostsViewVue from "@/views/PostsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "posts",
    component: PostsViewVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
