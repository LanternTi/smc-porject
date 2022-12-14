import { createRouter, createWebHashHistory } from "vue-router";
import { useMainStore } from "@/store"
import { storeToRefs } from 'pinia'


const routes = [
    { path: "/login", component: () => import('views/login/login.vue') },
    {
        path: "/home", component: () => import('views/home/index.vue'),
        children: [
            { path: "/default", component: () => import('views/main/home.vue') },
            { path: "/setting", component: () => import('views/setting/setting.vue') },
            { path: "/faceAdd", component: () => import('views/main/personalInfo/faceAdd.vue') },
            { path: "/pwdUpdate", component: () => import('views/main/personalInfo/pwdUpdate.vue') },
            { path: "/commodityInfo", component: () => import('views/main/commodity/commodityInfo.vue') },
            { path: "/commodityStock", component: () => import('views/main/commodity/commodityStock.vue') },
            { path: "/orderQuery", component: () => import('views/main/order/orderQuery.vue') },
            { path: "/customerInfo", component: () => import('views/main/customer/customerInfo.vue') },
            { path: "/employeeInfo", component: () => import('views/main/employee/employeeInfo.vue') },
            { path: "/activityInfo", component: () => import('views/main/activity/activityInfo.vue') },
            { path: "/WaiMaiQuery", component: () => import('views/main/order/WaiMaiQuery.vue') },
            { path: "/FenLei", component: () => import('views/main/commodity/fenLei.vue') },
            { path: "/home", redirect: '/default' }
        ]
    },
    { path: "/shop", component: () => import('views/shop.vue') },
    { path: "/", redirect: '/home' }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
router.beforeEach(async (to, from, next) => {
    const mainStore = useMainStore()
    const { employee } = storeToRefs(mainStore)
    if (employee.value.id == null && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})
export {
    router
}