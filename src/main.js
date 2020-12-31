import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
// 引入模块后自动生效
import '@vant/touch-emulator';
// import 'amfe-flexible'
import '@/assets/css/common.css'
// import '@/assets/css/Apply-for.css'
import '@/assets/fonts/iconfont.css'
import '@/assets/style/index.scss';
import {Skeleton, Lazyload, Locale} from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
// import 'lib-flexible/flexible';
import 'amfe-flexible/index.js' // rem 组件
import api from '@/service/api/index.js'
import storage from '@/util/storage';
import FooterBtn from "@/common/FooterBtn.vue";
import Pmodel from '@/common/Pmodel'
import FBSignInButton from 'vue-facebook-signin-button'
Vue.use(FBSignInButton)
// require('./assets/style/index.scss');
Vue.use(Vant);
Vue.use(Skeleton);
Vue.use(Lazyload, {
    lazyComponent: true,
    loading: require('@/assets/img/imgload.gif'),
    error: require('@/assets/img/error.jpg')
});
Vue.component('FooterBtn',FooterBtn);
Vue.component('Pmodel',Pmodel);
Locale.use('en-US', enUS);

Vue.config.productionTip = false;
Vue.prototype.$Http = api;
Vue.prototype.$Storage = storage;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
