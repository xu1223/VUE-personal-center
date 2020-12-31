import storage from '@/util/storage.js'
import VAL from '@/config/val.js'
import sha256 from "js-sha256";
import { Base64 } from "js-base64";
/**
 * 处理金额字段格式，四舍五入，默认保留两位小数
 * @param number
 * @param decimals
 * @returns {number}
 */
const dealNumberFormat = (number, decimals = 2) => {
    if (!number) return 0;
    decimals = decimals || 2; //默认保留2位小数
    number = parseFloat(number);
    //倍数
    let multiple = Math.pow(10, decimals);
    number = Math.round(number * multiple) / multiple;
    return number;
};

/**
 * 对象转数组
 * @param data
 * @returns {Array}
 */
const jsonToArray = (data) => {
    let arr = [];
    for (let i in data) {
        arr.push(data[i]);
    }
    return arr;
};

/**
 * 比较数组
 * @param property
 * @returns {function(*, *): number}
 */
const compare = (property, property2) => {
    return (a, b) => {
        // if(){

        // }
        let value1 = a[property];
        let value2 = b[property];
        // let value3 = a[property2];
        // let value4 = b[property2];
        // console.log(value3,value4)
        return value2 - value1;
    }
};
/**
 * 获取当前域名
 * @returns {string}
 */
const getStoreDomain = (type) => {
    let host;
    if(type){
        host=process.env.VUE_APP_TO?process.env.VUE_APP_TO:window.location.host;
    }else{
        host=process.env.VUE_APP_DOMAIN?process.env.VUE_APP_DOMAIN:window.location.host;
        if(host.indexOf('//')!=-1){
            host=host.split('//')[1];
        }
    }
    return host;
};

/**
 * 获取日期 (年月日)
 * @returns {{year: number, month: (*|number), day: (*|number)}}
 */
const getYearMonthDay = () => {
    let year = iDate('yyyy'),
        month = iDate('MM'),
        day = iDate('dd');
    return {
        year,
        month,
        day
    }
};

/**
 * 获取一个指定时区的日期 默认指定中国时区-正8区
 * @param fmt 格式
 * @param str_date 指定日期时间
 * @param timezone 时区
 * @returns {string}
 */
const iDate = (fmt = "yyyy-MM-dd hh:mm:ss", str_date = "", timezone = 8) => {
    let date;
    if (str_date !== "") {
        date = new Date(str_date.replace(/\-/g, "/"));
    } else {
        date = new Date();
    }
    if (timezone !== false) {
        let offsetGMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
        let now = date.getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
        date = new Date(now + offsetGMT * 60 * 1000 + parseInt(timezone) * 60 * 60 * 1000);
    }
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds(), //毫秒
        "U": date.getTime() / 1000, //Unix时间戳
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ?
                o[k] :
                ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return fmt;
};

/**
 * 是否json对象
 * @param str
 * @returns {boolean}
 */
const isJson = (str) => {
    if (typeof str == 'string') {
        try {
            let obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    } else if (typeof str == 'object') {
        return true;
    } else {
        return false;
    }
};

/**
 * 接收 - 抓取url参数
 * @param name
 * @returns {*}
 */
const catchUrlParam = (name = VAL.URL_PARAM_NAME) => {
    let path = '';
    if (window.location.hash.indexOf("?") >= 0) {
        path = window.location.hash;
    } else if (window.location.href.indexOf("?") >= 0) {
        path = window.location.href;
    } else {
        return null;
    }
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = path.split("?")[1].match(reg);
    if (r != null) {
        let param = decodeURIComponent(r[2]);
        param = JSON.parse(Base64.decode(param,''));
        return dealParam({
            param: param
        });
    } else {
        return null;
    }
};

/**
 * 发送 - 跳转url，携带参数
 * @param route  route = {page: '', id: ''}
 * @param name
 */
const sendParamInUrl = (route = {}, name = VAL.URL_PARAM_NAME) => {
    let data = dealParam({
        route: route
    });
    if (data.want_url) {
        let param = Base64.encode(JSON.stringify(data), "0");
        window.location.href = strTrim(data.want_url, '/', 'right') + `${data.want_url.indexOf('?') !== -1 ? '&' : '/#/?'}${name}=` + param;
    } else {
        console.log('=== link error ===');
    }
    return;
};

/**
 * 构建/解构通信包
 * @param param  param = {param: {}} | param = {route: {page: '', id: ''}}
 */
const dealParam = (param) => {
    let data;
    if (param.param) { // 接收
        param = param.param;
        if (param.hasOwnProperty('want_url')) {
            data = param.want_url;
            delete param.want_url;
        }
        if (param.hasOwnProperty('wishlist_ids')) {
            storage.setWishlistIds(param.wishlist_ids);
            delete param.wishlist_ids;
        }
        if (param.hasOwnProperty('session_id')) {
            param.session_id && storage.setSessionId(param.session_id);
            delete param.session_id;
        }
        if (param.hasOwnProperty('from_url')) {
            //coding...
            //临时缓存回跳链接，用于后退按钮
            delete param.from_url;
        }
        storage.setUserInfo(param)
    } else { // 发送
        param = param.route;
        data = storage.getUserInfo();
        data = data || {};
        data.session_id = storage.getSessionId();
        data.want_url = strTrim(getStoreDomain('type'), '/', 'right') + (param.url ? '/' + strTrim(param.url, '/', 'left') : '/');
        data.from_url = window.location.href; // 当前url
        data.wishlist_ids = storage.getWishlistIds();
    }
    return data;
};

/**
 * 三大页面的页面类型
 * @param page
 * @param id
 * @returns {*}
 */
const getToPages = (page = 'index', id = 0) => {
    if (!id) {
        id = '';
    }
    let pages = {
        index: '/',
        list: '/category?item_id=',
        detail: '/product?item_id=',
        post: '/information?item_id='
    };
    if (page && pages.hasOwnProperty(page)) {
        return pages[page] + id;
    }
    return pages.index + id;
};
/**
 * 生成SessionId
 * @returns {*|string}
 */
const generateSessionId = () => {
    let session_id = '';
    if (storage.getSessionId()) {
        session_id = storage.getSessionId();
        return session_id;
    }
};
/**
 * 生成随机字符串
 * @param len
 * @param need_time
 * @returns {string}
 */
const generateRandomStr = (len, need_time = false) => {
    len = len || 64;
    const $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789'; // ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678
    const maxPos = $chars.length;
    let str = '',
        timestamp = '';
    if (need_time === true) {
        len = len - 10;
        timestamp = Math.floor((new Date()).getTime() / 1000);
    }
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str + timestamp;
};

/**
 * str trim
 * @param str
 * @param char
 * @param type
 * @returns {*}
 */
const strTrim = (str, char, type) => {
    if (str && char) {
        if (type == 'left') {
            return str.replace(new RegExp('^\\' + char + '+', 'g'), '');
        } else if (type == 'right') {
            return str.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return str.replace(/^\s+|\s+$/g, '');
};

/**
 * 是否手机端访问
 * @returns {boolean}
 */
const isMobile = () => {
    let agent = navigator.userAgent.toLowerCase();
    if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(agent)) {
        return true;
    } else {
        return false;
    }
};
// const IS_PRODUCTION = process.env.VUE_APP_IS_PRODUCTION;
/**
 * 自动检测访问终端是否移动端并跳转
 */
const autoCheckToMobileClient = () => {
    if (isMobile()) {
        // let cart_host, href_host = '';
        // if (['dev', 'pro'].includes(IS_PRODUCTION)) {
        //     let host = storage.getConfigHost();
        //     if (host && host['cart_host']) {
        //         cart_host = strTrim(host['cart_host'], '/', 'right') + '/m/';
        //     }
        // } else { //测试环境
        //     cart_host = 'http://t.hxmis.com:7101/';
        // }
        // if (window.location.href.indexOf('reset') != -1) {
        //     href_host = '#/' + window.location.href.split('/#/')[1]
        // }
        // window.location.href = cart_host + href_host
    }
};

/**
 * 动态获取本地物流图片名字
 */
const matchImageName = (name) => {
    name = name.toLowerCase().replace(/\W/, "_");
    return name
};

/**
 * sha256加密
 */
const sha256Encryption = (name) => {
    if (typeof name == 'string') {
        name = sha256(name)
    }
    return name
};

/**
 * 支付返回链接
 */
const getCartHost = () => {
    let host = storage.getConfigHost();
    if (host && host['cart_host']) {
        let cart_host = strTrim(host['cart_host'], '/', 'right') + '/#/cart/pay_mentsuccess?invoice_no=';
        return cart_host
    }
}
/**
 * @method
 * @desc: 动态加载css
 * @author:  zhangyunjiang
 * @creatDate 2020-11-24 17:27:14
 * @param {*}  val
 */
const loadStyle = (url) => {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}

/**
 * 生成年、月、日数组
 * @param type
 * @returns {arr}
 */
const dateArr = (type, year, month) => {
    let arr = [];
    if (type == 'year') {
        for (let i = 1900; i < 2100; i++) {
            arr.push({
                id: "" + i + ""
            });
        }
        return arr
    } else if (type == 'month') {
        for (let i = 1; i < 13; i++) {
            if (i < 10) {
                i = "0" + i;
            }

            arr.push({
                id: "" + i + ""
            });
        }
        return arr
    } else {
        let n = 1;
        let day = 0;
        if (month == 2) {
            if (
                (0 == year % 4 && 0 != year % 100) ||
                0 == year % 400
            ) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            if (month == 2 * n) {
                day = 30;
            } else {
                day = 31;
            }
        }

        for (let i = 1; i < day + 1; i++) {
            if (i < 10) {
                i = "0" + i;
            }
            arr.push({
                id: "" + i + ""
            });
        }
        return arr
    }
};

/**
 * 计算年月日时分的函数
 * @param type
 * @returns {arr}
 */
const timestampToTime = (timestamp) => {
    // 计算年月日时分的函数
    let date = new Date(timestamp)
    let Y = date.getFullYear()
    let M = (date.getMonth() + 1) + '/'
    let D = date.getDate() + '/'
    return M + D + Y
}

export {
    dealNumberFormat,
    jsonToArray,
    compare,
    getStoreDomain,
    getYearMonthDay,
    iDate,
    isJson,
    catchUrlParam,
    sendParamInUrl,
    generateSessionId,
    strTrim,
    autoCheckToMobileClient,
    matchImageName,
    sha256Encryption,
    getCartHost,
    loadStyle,
    dateArr,
    timestampToTime
}