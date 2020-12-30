import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-beauty/package/style/vue-beauty.min.css'
import './assets/fonts/iconfont.css'
import './assets/my.less'
import 'quill/dist/quill.core.css'
import 'swiper/dist/css/swiper.css';
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import hxmessage from './lang'

import axios from "axios";

import api from './service/api/index.js'
import storage from './util/storage'


Vue.prototype.$hxmessage = hxmessage;
Vue.prototype.$http = axios;
import './plugins/beauty.js';

Vue.config.productionTip = false;

Vue.prototype.$Http = api;
Vue.prototype.$storage = storage;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});