import axios from 'axios'
import router from '../router';
import storage from '@/util/storage.js'
import {iDate} from '@/util/tools.js';
import getAccessToken from '@/service/access_token.js';
import message from "@/util/message";

//是否正在刷新token
window.refreshing = false;
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    storage.remove('wishlist_ids');
    storage.remove('userInfo');
    storage.remove('access_expired');
    storage.remove('access_token');
    storage.remove('count');
    sessionStorage.clear();
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
    let res = await getAccessToken({refresh: true});
    if (res) {
        return storage.getAccessToken();
    } else {
        return '';
    }
};

let instance = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 150000
});

// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(async config => {
    // Message.loading();
    //设置access_token
    const {url = ''} = config;
    if (config.data) {
        if(storage.getUserInfo()){
            config.data['customer_token'] = storage.getUserInfo().customer_token;
        }
        if(storage.getSessionId()&&storage.getSessionId()!=null&&storage.getSessionId()!=undefined){
            config.data['session_id'] = storage.getSessionId()
        }
        
        if (typeof (config.data) == 'string') {
            config.data = JSON.parse(config.data)
        }
        if(['/api/third_party_login/bind_account','/api/cart/register'].includes(url)){
            const _seid = localStorage.getItem('cart.m.session_id') || localStorage.getItem('session_id');
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
            if(localStorage.getItem('web.p.access_token')){
                const access_token = localStorage.getItem('web.p.access_token')
                formData.append('access_token',access_token);
            }
            formData.append('session_id',_seid)
            config.data = formData
        }
    }
    let access_token = await checkAccessToken();
    config.headers['Authorization'] = 'Bearer ' + access_token;
    config.headers['lang'] = 'langen';
    return config;
}, () => {
    // Message.clearAll();
});

instance.interceptors.response.use(res => {
    // Message.clearAll();
    if (res.status === 200) {
        res = res.data;
        let result = {
            code: '',
            msg: '',
            data: {}
        };
        if (res.hasOwnProperty('resultId')) {
            result.code = res.resultId.toString();
            // result.code = res.resultId.toString();
            result.msg = res.resultMsg;
            result.data = res.resultData;
        } else if (res.hasOwnProperty('code')) {
            result.code = res.code.toString();
            result.msg = res.msg;
            result.data = res.data;
        } else {
            return Promise.reject(res);
        }
        // result.code=Number(result.code)
        switch (result.code) {
            case '200':
                break;
            case '1100':
            case '1103':
            case '1104':
                if (!window.refreshing) {
                    getAccessToken({refresh: true});
                    message.confirm({
                        content: 'Page expires, please choose one',
                        okText: 'REFRESH',
                        cancelText: 'RE-LOGIN',
                        onOk: function () {
                            location.reload();
                        },
                        onCancel: function () {
                            toLogin();
                        },
                    });
                }
                break;
            case '1104':
                if (!window.refreshing) {
                    getAccessToken({refresh: true});
                    message.confirm({
                        content: 'Page expires, please choose one',
                        okText: 'REFRESH',
                        cancelText: 'RE-LOGIN',
                        onOk: function () {
                            location.reload();
                        },
                        onCancel: function () {
                            toLogin();
                        },
                    });
                }
                break;
            case '601':
            case '602':
            case '603':
            case '604':
                //重新登录,弹窗提示登录失效跳转登录页
                toLogin();
                break;
            default:
                //弹窗提示
                // Message.info(res.data.msg || 'Bad request');
                break;
        }
        return result;
    } else {
        return Promise.reject(res);
    }
}, error => {
    const {response} = error;
    console.log(error, response);
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