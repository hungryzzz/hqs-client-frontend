/*
 * @Created on: 2022-09-15 23:38:33
 * @LastEditTime: 2022-10-08 09:45:40
 * @@Author: fduxuan
 * 
 * @@Desc: 
 * 
 */
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
        name: 'PoListJob',
        title: 'PoListJob',
        component: () => import('./views/PoListJob.vue'), //.vue不能省略
    },

    // {
    //     path: '/start',
    //     name: '主页',
    //     title: '欢迎民工',
    //     component: () => import('./components/squad/Display.vue'), //.vue不能省略
    // },

    // {
    //     path: '/labeling',
    //     name: '标注',
    //     title: '标注',
    //     component: () => import('./views/MarkingHome.vue'), //.vue不能省略
    // },
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

const defaultTitle = 'HQS AUTOMOTIVE'
router.beforeEach((to, from, next) => {
    document.title = to.name ? defaultTitle + ' | ' + to.name : defaultTitle
    next()
})

export default router
