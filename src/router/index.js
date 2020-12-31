import Vue from 'vue'
import VueRouter from 'vue-router'
import staticRoute from './staticRouter'
// @ts-ignore
import getAccessToken from '@/service/access_token.js';
// @ts-ignore
import storage from '@/util/storage.js';
const { resolve } = require("path");
import {
    generateSessionId,
    catchUrlParam,
    strTrim
// @ts-ignore
} from '@/util/tools.js';
// @ts-ignore
import Message from '@/util/message.js';
Vue.use(VueRouter);

let load = null;
const router = new VueRouter({
    mode: 'history',
    // mode: 'hash',
    base: resolve(__dirname,'/carts/m/'),
    routes: staticRoute,
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
});
router.beforeEach((to, from, next) => {
    load = Message.loading();
    //进入应用时优先获取授权
    getAccessToken();
    //进入应用时生成SessionId
    generateSessionId();

    let toPath = strTrim(to.path, '/', 'right');
    let routeCheckAuth = (toPath) => {
        if (storage.getAccessToken() && storage.getCustomerToken()) {
            next();
        } else {
            //白名单
            if (['/payment_step_two','/apilogin','/login', '/forgot', '/reset', '/my_cart',
            '/order/order_detail','/payment_success'].includes(toPath)) {
                next();
            } else {
                next('/login');
            }
        }
    };

    //先判断是否有通信包
    catchUrlParam();
    //路由认证验证进入
    routeCheckAuth(toPath);

    // const originalPush = VueRouter.prototype.push;
    // VueRouter.prototype.push = function push(location) {
    //     return originalPush.call(this, location).catch(err => err)
    // };
    if (to.matched.length === 0) {
        next('/error/404');
    }
});
router.afterEach(() => {
    window.refreshing = false;
    setTimeout(() => {
        Message.clear(load);
    }, 500)
});
export default router
