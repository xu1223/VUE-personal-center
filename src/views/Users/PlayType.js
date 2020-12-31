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
import storage from "@/util/storage.js";
import message from "@/util/message.js";
import $Http from '@/service/api/index.js'
import {strTrim,getCartHost} from "@/util/tools";

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
                    let _customer_token = storage.getCustomerToken();

                    let parm = {
                        payment_method: 'paypal',
                        customer_token: _customer_token,
                        invoice_no: parms.invoice_no,
                        address_id: parms.address_id,
                        shipping_method_id: parms.shipping_method_id,
                        coupon_code: parms.coupon_code,
                        remarks: parms.remarks,
                        activity_id: parms.activity_id,
                        email: parms.email
                    }

                    return $Http.cart.confirmOrder(parm, true).then(res => {
                        if (parseInt(res.code) === 200) {
                            return res.data.paypal.id;
                        } else {
                            message.error(res.msg);
                            return false;//3U29421286083025V
                        }
                    });
                },

                // // Finalize the transaction
                onApprove: function () {
                    if (getCartHost()) {
                        window.location.href = getCartHost()+ _this.invoice_no;
                    } else {
                        console.log('=== system config error ===');
                    }
                }
            }).render(dom);// "#paypal-button-container"
    }
};
export default PlayTtype;
