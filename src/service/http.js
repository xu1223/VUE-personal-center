import axios from 'axios'
import router from '../router';
import storage from '@/util/storage.js'
import Message from '@/util/message.js';
import {
    iDate
} from '@/util/tools.js';
import getAccessToken from '@/service/access_token.js';
//是否正在刷新token
window.refreshing = false;

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
};

/**
 * 校验并返回access_token
 * @returns {Promise<*>}
 */
const checkAccessToken = async () => {
    let access_token = storage.getAccessToken();
    let access_expired = storage.getAccessExpired();
    if (access_token && access_expired) {
        if (access_expired >= iDate('U')) {
            return access_token;
        }
    }
    let res = await getAccessToken({
        refresh: true
    });
    if (res) {
        return storage.getAccessToken();
    } else {
        return '';
    }
};

let instance = axios.create({
    baseURL: process.env.VUE_APP_API, //HOST['api'],
    timeout: 300000
});
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.interceptors.request.use(async config => {
    Message.loading();
    const {url = ''} = config;
    if (config.data) {
        if(!config.data && config.data == 'undefined'){
            delete config.data['session_id']
        }
        if(localStorage.getItem('cart.m.userInfo')){
            let _user = JSON.parse(localStorage.getItem('cart.m.userInfo'));
            config.data['customer_token'] = _user.customer_token;
        }
        // if(localStorage.getItem('cart.m.access_token')){
        //     config.data['access_token'] = localStorage.getItem('cart.m.access_token')
        // }
        const _seid = localStorage.getItem('cart.m.session_id') || localStorage.getItem('session_id');
        if (typeof (config.data) == 'string') {
            config.data = JSON.parse(config.data);
        }
        if(['/api/third_party_login/bind_account','/api/cart/register','/api/third_party_login/bind_account_by_customer'].includes(url)){
            const _data = config.data;
            let formData = new FormData()
            for(var key in _data){
                formData.append(key,_data[key])
            }
            formData.append('session_id',_seid);
            if(localStorage.getItem('cart.m.userInfo')){
                let customer_token = JSON.parse(localStorage.getItem('cart.m.userInfo'));
                formData.append('customer_token',customer_token);
            }
            // if(localStorage.getItem('cart.m.access_token')){
            //     const access_token = localStorage.getItem('cart.m.access_token')
            //     formData.append('access_token',access_token);
            // }
            config.data = formData
        }
    }
    //设置access_token
    let access_token = await checkAccessToken();
    config.headers['Authorization'] = 'Bearer ' + access_token;
    config.headers['lang'] = 'langen';
    return config;
}, () => {});

instance.interceptors.response.use(res => {

    if (res.status === 200) {
        
        res = res.data;
        let result = {
            code: '',
            msg: '',
            data: {}
        };
        if (res.hasOwnProperty('resultId')) {
            result.code = res.resultId.toString();
            result.msg = res.resultMsg;
            result.data = res.resultData;
        } else if (res.hasOwnProperty('code')) {
            result.code = res.code.toString();
            result.msg = res.msg;
            result.data = res.data;
        } else {
            return Promise.reject(res);
        }
        switch (result.code) {
            case '200':
                break;
            case '1104':
                if (!window.refreshing) {
                    getAccessToken({
                        refresh: true
                    });
                    Message.confirms({
                        className: "confirms-btnswhis",
                        msg: 'Page expires, please choose one.',
                        leftBtn: 'REFRESH',
                        rightBtn: 'RE-LOGIN',
                        leftBtnFn: () => {
                            location.reload();
                        },
                        rightBtnFn: () => {
                            toLogin();
                        }
                    });
                }
                break;
            case '601':
            case '602':
                //需要登录,弹窗提示先登录并跳转登录页
                Message.info({
                    msg: 'Please login first.',
                    fn: () => {
                        toLogin();
                    }
                });
                break;
            case '603':
            case '604':
                //重新登录,弹窗提示登录失效并跳转登录页
                Message.info({
                    msg: 'Please login again.',
                    fn: () => {
                        toLogin();
                    }
                });
                break;
            default:
                //弹窗提示
                // Message.info(res.data.msg || 'Bad request');
                break;
        }
        Message.clearAll();
        return result;
    } else {
        Message.clearAll();
        return Promise.reject(res);
    }
}, error => {
    const {
        response
    } = error;
    Message.error(response);
    // console.log('=== error >> response ===', error, response);
    // if (response) {
    // 请求已发出，但是不在2xx的范围
    // errorHandle(response.status, response.data.msg);
    // return Promise.reject(response);
    // } else {
    // 处理断网的情况  
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    //store.commit('changeNetwork', false);
    // }
});

export default instance;