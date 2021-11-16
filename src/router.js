/*
 * Created on 2021/11/16 2:12 下午
 *
 * @Author: fduxuan
 *
 * Desc:  路由相关
 */

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        title: '首页',
        component: () => import('./views/Home.vue'), //.vue不能省略
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
