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
                    // if (!params['customer_token']) {
                    //     params['customer_token'] = storage.getCustomerToken();
                    // }
                }
                if(params && is_formdata){
                    final_params = new FormData();
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