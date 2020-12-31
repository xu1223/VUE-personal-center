import App from '@/config/app.js'
import VAL from '@/config/val.js'
import { isJson } from './tools.js'
export default {
    set (key, value) {
        key = App.prefix + key;
        //对象必须序列化才能存入缓存
        if (isJson(value)) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },
    get (key) {
        key = App.prefix + key;
        //反序列化
        let value = localStorage.getItem(key);
        if (isJson(value)) {
            value = JSON.parse(value);
        }
        return value;
    },
    remove (key) {
        key = App.prefix + key;
        localStorage.removeItem(key);
    },
    clear () {
        localStorage.clear();
    },

    //----会员信息集合操作----
    setUserInfo (value) {
        this.set(VAL.USER_INFO, value);
    },
    getUserInfo () {
        return this.get(VAL.USER_INFO);
    },
    removeUserInfo () {
        this.remove(VAL.USER_INFO);
    },
    //----会员登录态TOKEN操作----
    getCustomerToken () {
         let userInfo = this.getUserInfo();
         if (userInfo && userInfo.customer_token) {
             return userInfo.customer_token
         } else {
             return '';
         }
    },
    //----授权认证TOKEN操作----
    setAccessToken (value) {
        this.set(VAL.ACCESS_TOKEN, value);
    },
    getAccessToken () {
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
    getSessionId () {
        return this.get(VAL.SESSION_ID);
    },
    //----系统配置操作----
    setConfig (value) {
        this.set(VAL.CONFIG, value);
    },
    getConfig () {
        return this.get(VAL.CONFIG);
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
    setWishlistIds(value){
        this.set(VAL.WISH_IDS, value);
    },
    getWishlistIds(){
        return this.get(VAL.WISH_IDS);
    },
    removeWishlistIds(){
        return this.remove(VAL.WISH_IDS);
    }
}