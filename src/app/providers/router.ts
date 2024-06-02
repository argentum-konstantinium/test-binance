import {createRouter,  createWebHistory, createMemoryHistory} from "vue-router";
import {routes} from "@pages/index.ts";
const baseUrl = import.meta.env.BASE_URL
const history = import.meta.env.SSR ? createMemoryHistory(baseUrl) : createWebHistory(baseUrl)
export const router = createRouter({
    history,
    routes
})