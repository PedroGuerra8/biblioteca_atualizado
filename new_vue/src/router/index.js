import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CriarUser from "../components/CriarUser.vue";

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/Criar",
        name: "CriarUser",
        component: CriarUser,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;