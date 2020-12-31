import {Toast, Dialog} from 'vant';

export default {
    /**
     * 轻提示框
     * @param opt
     * @returns {VanToast}
     */
    info(opt) {
        opt = opt || {msg: ''};
        return Toast({
            type: 'text',
            position: 'middle',
            message: opt.msg,
            mask: false,
            forbidClick: false,
            duration: 2000,
            onClose: () => {
                opt.fn && opt.fn();
            }
        });
    },
    /**
     * 成功提示
     * @param msg
     * @returns {VanToast}
     */
    success(msg) {
        return Toast.success(msg);
    },
    /**
     * 错误提示
     * @param msg
     * @returns {VanToast}
     */
    error(msg) {
        return Toast.fail(msg);
    },
    /**
     * 加载提醒
     * @param mask
     * @returns {VanToast}
     */
    loading(mask = false) {
        return Toast.loading({
            mask: mask,
            message: 'loading...',
            forbidClick: true,
            loadingType: 'circular',
            duration: 0
        })
    },
    /**
     * 清除指定层
     * @param toast
     */
    clear(toast) {
        toast.clear();
    },
    /**
     * 清除所有层
     */
    clearAll() {
        Toast.clear();
    },
    alert(msg, title = '', btn = {}) {
        const tmp = {message: msg};
        if (title) tmp.title = title;
        if (!btn || !btn.name) {
            tmp.confirmButtonText = 'OK';
        } else {
            tmp.confirmButtonText = btn.name;
        }
        Dialog.alert(tmp).then(() => {
            // Promise.resolve();
            btn.fn && btn.fn();
        });
    },
    confirms(opt) {
        const tmp = {
            message: opt.msg || '',
            title: opt.title || '',
            overlayStyle: {zIndex: opt.zIndex || 2000},
            className: opt.className || '',
            confirmButtonText: opt.rightBtn || 'CONFIRM',
            cancelButtonText: opt.leftBtn || 'CANCEL',
        };
        Dialog.confirm(tmp).then(() => {
            opt.rightBtnFn && opt.rightBtnFn();
        }).catch(() => {
            opt.leftBtnFn && opt.leftBtnFn();
        });
    },
    close() {
        Dialog.close();
    },
    testAlert() {
        //options events  https://youzan.github.io/vant/#/zh-CN/dialog
    }
}