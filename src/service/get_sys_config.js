import $Http from '@/service/api/index.js'
import storage from '@/util/storage.js';
import store from '@/store';
import {
    setToHost
} from '@/util/tools.js'

export default function () {
    $Http.common.getSysConfig().then(res => {
        let {code,data} = res;
        if (code == 200) {
            storage.setConfig(data);
            setToHost();
            document.querySelector('#icon_img').setAttribute('href', data.favicon);
            document.title = data.site ? data.site.title : 'Personal Center';
            data.site && document.head.insertAdjacentHTML('beforeend', data.site.google_analytics);

            // 存入store
            store.commit('common/modeify_config', data);
        }
    });
}