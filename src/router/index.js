import Vue from 'vue'
import VueRouter from 'vue-router'
import staticRoute from './staticRouter'
import {
    generateSessionId,
    catchUrlParam,
    strTrim,
    loadStyle
} from '@/util/tools.js';
import storage from '@/util/storage.js';
import getAccessToken from '@/service/access_token.js';
const { resolve } = require("path");
Vue.use(VueRouter); //这里要注册
const router = new VueRouter({
    mode: 'history',
    // mode: 'hash',
    base: resolve(__dirname,'/carts/'),
    routes: staticRoute,
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
});

router.beforeEach((to, from, next) => {
    //进入应用时优先获取授权
    getAccessToken();
    //进入应用时生成SessionId
    generateSessionId();
    let toPath = strTrim(to.path, '/', 'right');

    let routeCheckAuth = (toPath) => {
        if (storage.getAccessToken() && storage.getCustomerToken()) {
            if (['/login', '/forget', '/reset'].includes(toPath)) {
                next('/');
            }else{
                next();
            }
        } else {
            if (['/login', '/forget', '/reset', '/my_cart', '/payment_step_two', '/payment_success', '/order/order_detail'].includes(toPath)) {
                next();
            } else {
                storage.remove('wishlist_ids');
                storage.remove('userInfo');
                storage.remove('access_expired');
                storage.remove('access_token');
                next('/login');
            }
        }
    };
    //先判断是否有通信包
    catchUrlParam();

    //路由认证验证进入
    routeCheckAuth(toPath);

    if (to.matched.length === 0) {
        next('/error/404');
    }
});

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
      router.replace(targetPath);
    }
  });

router.afterEach(() => {
    window.refreshing = false;
});

export default router