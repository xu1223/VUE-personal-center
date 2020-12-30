/***
 * payl支付接口
 * dom
 * new PlayTtype(dom)
 */
/**
 *
 * @param {*} dom dom选择器 # . 元素
 * @param {*} options
 * {
 *  call: (data,actions)=>{ 点击按钮操作
 * },
 * su: (data,actions) ={ //跳转
 * }
 * }
 */
import router from "@/router";
import $Http from '@/service/api/index.js'
import storage from '@/util/storage.js'
import message from '@/util/message.js'
import {getCartHost} from "@/util/tools";

let PlayTtype = function (dom, options) {
    this.option = options;
    this.bom = document.querySelector(dom || "body");
    this.invoice_no = this.option ? this.option.qs["invoice_no"] : "";
    this.init(this.bom, this.option);
};
PlayTtype.prototype = {
    init(dom, option) {
        this.pay(dom, option);
    },
    pay(dom, option) {
        let _this = this;
        // if (typeof paypal === 'undefined') {
        //     message.info({
        //         content: 'paypal payment error. try again.'
        //     });
        //     return false;
        // }
        paypal.Buttons({
            style: {
                layout: "vertical",
                color: "black",
                shape: "rect",
                label: "paypal",
                card: "none"
            },
            createOrder: function (data, actions) {

                let parms = option.qs || {};

                let parm = {
                    payment_method: 'paypal',
                    invoice_no: parms.invoice_no,
                    address_id: parms.address_id,
                    shipping_method_id: parms.shipping_method_id,
                    coupon_code: parms.coupon_code,
                    remarks: parms.remarks,
                    activity_id: parms.activity_id,
                    email: parms.email
                };

                return $Http.payment.confirmOrder(parm, true).then(res => {
                    if (res && parseInt(res.code) === 200) {
                        return res.data.paypal.id;
                    } else {
                        return false; //3U29421286083025V
                    }
                });
            },

            // // Finalize the transaction
            onApprove: function (data, actions) {
                if(getCartHost()){
                    window.location.href = cart_host + _this.invoice_no;
                }else{
                    console.log('=== system config error ===');
                }
                // let host = storage.getConfigHost();
                // if (host && host['cart_host']) {
                //     let cart_host = strTrim(host['cart_host'], '/', 'right') + '/#/cart/pay_mentsuccess?invoice_no=' + _this.invoice_no;
                //     console.log(cart_host,'cart_host')

                //     // window.location.href = cart_host;
                // } else {
                //     console.log('=== system config error ===');
                // }
                /*router.push({
                    path: "/cart/pay_mentsuccess",
                    query: {
                        invoice_no: _this.invoice_no
                    }
                });*/
            }
        }).render(dom); // "#paypal-button-container"
    }
};
export default PlayTtype;