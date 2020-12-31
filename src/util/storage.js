import App from '@/config/app.js'
import VAL from '@/config/val.js'
import {isJson} from './tools.js'
export default {
    set(key, value) {
        key = App.prefix + key;
        //对象必须序列化才能存入缓存
        if (isJson(value)) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },
    get(key) {
        key = App.prefix + key;
        //反序列化
        let value = localStorage.getItem(key);
        if (isJson(value)) {
            value = JSON.parse(value);
        }
        return value;
    },
    remove(key) {
        key = App.prefix + key;
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    },
    //----会员信息集合操作----
    setUserInfo(value) {
        this.set(VAL.USER_INFO, value);
    },
    getUserInfo() {
        return this.get(VAL.USER_INFO);
    },
    removeUserInfo() {
        this.remove(VAL.USER_INFO);
    },
    //----会员登录态TOKEN操作----
    getCustomerToken() {
        let userInfo = this.getUserInfo();
        if (userInfo && userInfo.customer_token) {
            return userInfo.customer_token
        } else {
            return '';
        }
    },
    //----授权认证TOKEN操作----
    setAccessToken(value) {
        this.set(VAL.ACCESS_TOKEN, value);
    },
    getAccessToken() {
        let tmp = this.get(VAL.ACCESS_TOKEN);
        return tmp ? tmp : '';
    },
    setAccessExpired (value) {
        this.set(VAL.ACCESS_EXPIRED, value);
    },
    getAccessExpired () {
        let tmp = this.get(VAL.ACCESS_EXPIRED);
        return tmp ? tmp : '';
    },
    //----临时会话ID操作----
    setSessionId (value) {
        this.set(VAL.SESSION_ID, value);
    },
    getSessionId() {
        return this.get(VAL.SESSION_ID);
    },
    //----系统配置操作----
    setConfig(value) {
        if (isJson(value)) {
            value = Base64.encode(JSON.stringify(value),'')
        }
        sessionStorage.setItem(App.prefix + VAL.CONFIG,value)
    },
    getConfig() {
        let value = sessionStorage.getItem(App.prefix + VAL.CONFIG)?Base64.decode(sessionStorage.getItem(App.prefix + VAL.CONFIG),''):'';
        if (isJson(value)) {
            value = JSON.parse(value);
        }
        return value;
    },
    getConfigHost() {
        let config = this.getConfig();
        if (config && config.host) {
            return config.host;
        } else {
            return {};
        }
    },
    //----心愿单集合操作----
    setWishlistIds(value) { //设置登陆获取的信息
        this.set(VAL.WISH_IDS, value);
    },
    getWishlistIds() { // 获取心愿单集合
        return this.get(VAL.WISH_IDS);
    },
    removeWishlistIds(){ // 清除心愿单集合
        return this.remove(VAL.WISH_IDS);
    },
    //----心愿单集合操作----
    setCount(value) { //设置登陆获取的信息
        this.set(VAL.COUNT, value);
    },
    getCount() { // 获取心愿单集合
        return this.get(VAL.COUNT);
    },
}