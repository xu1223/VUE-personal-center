import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import en from '@/util/en'
import vueBeauty from 'vue-beauty'
// import {
//     steps,
//     step,
//     pagination,
//     rate,
//     alert,
//     icon,
//     button,
//     tabs,
//     input,
//     select,
//     radio,
//     checkbox,
//     upload,
//     notification,
//     form,
//     modal,
//     message,
//     datePicker,
// } from 'vue-beauty'
vueBeauty.install(Vue, {
    locale: en
});
Vue.use(vueBeauty);
// Vue.use(steps);
// Vue.use(step);
// Vue.use(notification);
// Vue.use(modal);
// Vue.use(pagination);
// Vue.use(datePicker);
// Vue.use(message);
// Vue.use(upload);
// Vue.use(radio);
// Vue.use(radio.group);
// Vue.use(checkbox);
// Vue.use(checkbox.group);
// Vue.use(tabs);
// Vue.use(tabs.pane);
// Vue.use(alert);
// Vue.use(button);
// Vue.use(button.group);
// Vue.use(icon);
// Vue.use(form);
// Vue.use(form.item);
// Vue.use(input);
// Vue.use(input.group);
// Vue.use(rate );
// Vue.use(select);
Vue.use(VueLazyload, {
    lazyComponent: true,
    error: require('@/assets/img/error.jpg'),
    loading: require('@/assets/img/imgload.gif'),
});