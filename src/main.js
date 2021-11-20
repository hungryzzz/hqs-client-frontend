import { createApp } from 'vue'
import App from './App.vue';

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import './assets/css/group.css'

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import router from "./router";

import VueClipboard from 'vue-clipboard2'

import "./assets/group.less"



const app = createApp(App);

app.use(ArcoVue);
app.use(router);
app.use(ArcoVueIcon);
app.use(VueClipboard);

app.mount('#app');
