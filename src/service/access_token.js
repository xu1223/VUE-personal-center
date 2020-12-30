import axios from 'axios'
import md5 from "md5";
import storage from '@/util/storage'
import {getStoreDomain, iDate} from '@/util/tools'
import getSysConfig from '@/service/get_sys_config.js'

const AccessToken = async (opt = {}) => {
    if (!storage.getAccessToken() || (opt.refresh && opt.refresh === true)) {
        let ymd = iDate('yyyyMMdd');
        let $domain_key = getStoreDomain(), //获取当前主域名
            $key = md5("web" + ymd),
            $value = md5($domain_key + ymd);
        let auth_url = process.env.VUE_APP_AUTH;
        if (opt.refresh && opt.refresh === true) {
            window.refreshing = true;
        } 
        let res = await axios.get(auth_url, {
            params: {
                app_key: $key,
                app_value: $value
            }
        });
        if (!res) {
            window.refreshing = false;
            console.log('No Auth.');
            return false;
        }
        res = res.data;
        if ([parseInt(res.resultId || res.resultCode)].includes(200) && res.resultData && res.resultData.access_token) {
            storage.setAccessToken(res.resultData.access_token);
            if (res.resultData.expired_at) {
                let access_expired = iDate('U', res.resultData.expired_at, false);
                storage.setAccessExpired(access_expired);
            }
            //获取系统配置
            if (!opt.refresh || opt.refresh !== true) {
                getSysConfig();
            }
            return true;
        } else {
            window.refreshing = false;
            console.log('Incorrect Auth.');
            return false;
        }
    } else if (storage.getAccessToken()) {
        getSysConfig();
        return true;
    } else {
        return false;
    }
};
export default AccessToken