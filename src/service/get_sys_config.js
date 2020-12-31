import $Http from '@/service/api/index.js'
import storage from '@/util/storage.js';
import store from '@/store';
import { autoCheckToMobileClient, setToHost } from '@/util/tools.js'

export default function () {
    if(!storage.getConfig()||storage.getConfig()==undefined||storage.getConfig()==''){
        $Http.common.getSysConfig().then(res => {
            let {data, code} = res;
            if (code == 200) {
                storage.setConfig(data);
                setToHost();
                //自动检测访问终端是否移动端并跳转
                autoCheckToMobileClient();
    
                document.querySelector('#icon_img').setAttribute('href', data.favicon);
                document.title = data.site ? data.site.title : 'Personal Center';
                data.site && document.head.insertAdjacentHTML('beforeend', data.google_code.ga_code);
                data.site && document.head.insertAdjacentHTML('beforeend', data.google_code.gtm_code.head_code);
                // 存入store
                store.commit('common/modeify_config', data);
            }
        });
    }
}