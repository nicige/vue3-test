import { createRouter, createWebHashHistory } from 'vue-router'
import index from "@/views/index.vue" ;
import ancestors from "@/views/ancestors.vue" ;
import refs from "@/views/refs.vue" ;
import apiTool from "@/views/apiTool.vue" ;
import arApis from "@/views/arApis.vue" ;

const routes = [
    {
        path: "/",
        redirect: "/index"
    },
    {
        path: "/index",
        name: "index",
        component: index
    },
    {
        path: "/ancestors",
        name: "ancestors",
        component: ancestors
    },
    {
        path: "/refs",
        name: "refs",
        component: refs
    },
    {
        path: "/apiTool",
        name: "apiTool",
        component: apiTool
    },
    {
        path: "/arApis",
        name: "arApis",
        component: arApis
    }
]

const router = createRouter({
    // 使用 hash 模式构建路由（ url中带 # 号的那种)
    history: createWebHashHistory(),
    // 使用 history 模式构建路由 （ url 中没有 # 号，但生产环境需要特殊配置）
    // history: createWebHistory(),
    routes
})

export default router ;