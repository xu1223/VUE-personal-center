import axios from "../http.js";
import storage from '@/util/storage'
export default function (service) {
    const Http = {};
    if (service) {
        for(let key in service){
            let api = service[key];
            // async 作用：避免进入回调地狱
            Http[key] = function (params = {}, is_formdata = false, config = {}) {
                let final_params = {};
                if(storage.getCustomerToken()){
                    config.headers = config.headers ? config.headers : {};
                    config.headers['Customer-Token'] = storage.getCustomerToken();
                    // config.headers['lang'] ='langen'
                    /*if (!params['customer_token']) {
                        params['customer_token'] = storage.getCustomerToken();
                    }*/
                }
               
                
                if(params && is_formdata){
                    final_params = new FormData();
                    if(localStorage.getItem('cart.m.userInfo')){
                        let _user = JSON.parse(localStorage.getItem('cart.m.userInfo'));
                        console.log(_user,'--_user')
                        params['customer_token'] = _user.customer_token ? _user.customer_token : '';
                    }
                    if(localStorage.getItem('cart.m.access_token')){
                        const access_token = localStorage.getItem('cart.m.access_token')
                        // formData.append('access_token',access_token);
                        params['access_token'] = access_token
                    }
                    if(localStorage.getItem('cart.m.session_id') || localStorage.getItem('session_id') ){
                        let session_id = localStorage.getItem('cart.m.session_id') || localStorage.getItem('cart.m.session_id');
                        params['session_id'] = session_id;
                    }
                    for(let i in params){
                        final_params.append(i, params[i]);
                    }
                }else{
                    final_params = params;
                }

                let response = {};

                try{
                    switch(api.method.toLowerCase()){
                        case 'get':
                        case 'delete':
                        {
                            config.params = final_params;
                            response = axios[api.method](api.url, config);
                        } break;
                        case 'post':
                        case 'put':
                        case 'patch':
                        {
                            response = axios[api.method](api.url, final_params, config);
                        } break;
                        default: break;
                    }
                }catch(err){
                    response = err;
                }

                return response;
            }
        }
    }
    return Http;
}