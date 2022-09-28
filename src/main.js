/*
 * @Created on: 2022-09-15 23:38:33
 * @@LastEditTime: 2022-09-29 00:17:41
 * @@Author: fduxuan
 * 
 * @@Desc: 
 * 
 */
import { createApp } from 'vue'
import App from './App.vue';

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import '@arco-design/web-vue/es/index.less';
import './assets/css/group.css'

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import router from "./router";

import store from "./store";

import VueClipboard from 'vue-clipboard2'

import "./assets/group.less"



const app = createApp(App);

app.use(ArcoVue);
app.use(router);
app.use(store);
app.use(ArcoVueIcon);
app.use(VueClipboard);

app.mount('#app');
