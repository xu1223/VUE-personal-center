
import { Toast } from "vant";
let StripeCheckout = function(opts){
    this.init(opts)
}
 StripeCheckout.prototype =  {
   
    init(options){
        this.datas(options)
    },
    datas(opt){
        // //{\#  billingAddress: false,shippingAddress: false,      只要'shippingAddress'，就必须启用'billingAddress'。   #\}//
        // locale: 'auto',//{\# auto en  zh Simplified Chinese (zh) Danish (da) Dutch (nl) English (en) Finnish (fi) French (fr) German (de) Italian (it) Japanese (ja) Norwegian (no) Spanish (es) Swedish (sv) #\} //
       this.handler = StripeCheckout.configure({
            key: opt.key || '',
            image: opt.image || 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: opt.key || 'auto',
            stripe_amount: opt.stripe_amount * 100 || '0',
            currency: opt.currency|| 'USD',
            amount:opt. amount|| '',
            email: opt.email|| '',
            allowRememberMe: true,
            zipCode: true,
            // panelLabel: "Pay with Card", {\#      label: "Pay with Card",  #\} //
            token: function(token, args) {
                opt.tokenfn && opt.tokenfn(token,args);
            }
        });

        this.render(opt)
        
    },
    render(opt){
        let _self = this
        if(document.getElementById('stripe-button')){
            document.getElementById('stripe-button').addEventListener('click', function(e) {
                if(opt.stripe_amount > 99999999){
                    // HXMessage.msg('The amount value supports up to eight digits.');
                    Toast.fail('The amount value supports up to eight digits.')
                    return;
                }
                // {\# Open Checkout with further options: #\}//
                _self.handler.open({
                    name: opt.site_name  ? opt.site_name : "HeXin",
                    description: opt.invoice_no ? "NO. "+opt.invoice_no : "Complete your order" 
                });
                e.preventDefault();
            });
        }
    }
   

}

// var stripe_currency = "USD"; //{\# {{ order.currency_code }} #\}//
// var stripe_amount = (actual_payment_amount * 100); //单位美分
// var stripe_email = "{{ customer.email ? : '' }}";
// //{\#  billingAddress: false,shippingAddress: false,      只要'shippingAddress'，就必须启用'billingAddress'。   #\}//
// var handler = StripeCheckout.configure({
//     key: '{{  payment_list.stripe.publishable_key }}',
//     image: '{{ payment_list.stripe.marketplace ? : "https://stripe.com/img/documentation/checkout/marketplace.png"}}',
//     locale: 'auto',//{\# auto en  zh Simplified Chinese (zh) Danish (da) Dutch (nl) English (en) Finnish (fi) French (fr) German (de) Italian (it) Japanese (ja) Norwegian (no) Spanish (es) Swedish (sv) #\} //
//     currency: stripe_currency,
//     amount: stripe_amount,
//     email: stripe_email,
//     allowRememberMe: true,
//     zipCode: true,
//     // panelLabel: "Pay with Card", {\#      label: "Pay with Card",  #\} //
//     token: function(token, args) {
//         var remarks = $("#note").val();
//         var email = $("#email").val();
//         var msg = '';
//         if(invoice_no == ''){
//             msg = 'Order error!';
//         }
//         if(address_id <= 0){
//             msg = 'Please select your Shipping address!';
//         }
//         if(shipping_method_id <= 0){
//             msg = 'Please select your Shipment method!';
//         }
//         if(payment_method == ''){
//             msg = 'Please select your Payment method!';
//         }
//         if(email == ''){
//             msg = 'Please fill in the Contact email!';
//         }
//         if(msg != ''){
//             HXMessage.warning(msg);
//             return false;
//         }
//         var formData = new FormData();
//         formData.append("_token", _token);
//         formData.append("token", JSON.stringify(token));
//         formData.append("args", JSON.stringify(args));
//         formData.append("invoice_no", invoice_no);
//         formData.append("address_id", address_id);
//         formData.append("shipping_method_id", shipping_method_id);
//         formData.append("coupon_code", coupon_code);
//         formData.append("payment_method", payment_method);
//         formData.append("remarks", remarks);
//         formData.append("email", email);
//         var stipe_paying = layer.open({
//             type: 3
//             ,title: false
//             ,closeBtn: false
//             //,area: '500px;'
//             ,shade: 0.9
//             ,id: 'stripe_layuipro'
//             //,resize: false
//             ,anim: 1
//             ,offset: 'auto'
//             //,btnAlign: 'c'
//             ,moveType: 1
//             //{\# ,content: '<div class="layui-layer layui-layer-loading" type="loading" times="0" showtime="0" contype="string" style="z-index: 19891019;top: 40%; left: 45%;text-align:center;"><div style="color: #fff; font-weight: 300; text-align:center;font-size:22px;padding-bottom:10px;">In payment...</div><div id="" class="layui-layer-content layui-layer-loading0" style="text-align:center;"></div><span class="layui-layer-setwin"></span></div>' #\}//
//             ,content: '<br /><br /><div style="color: #fff; font-weight: 300; text-align:center;font-size:22px;padding-bottom:10px;width:100%">In payment...</div>'
//         });
//         $.ajax({
//             type : 'post',
//             url  : '/cart/confirm_order',
//             contentType: false,
//             processData: false,
//             async : true,
//             data : formData,
//             success:function(resp){
//                 layer.close(stipe_paying);
//                 if(resp.code == '0000'){
//                     layer.confirm('Payment Successful.', {
//                         zIndex:19891014,
//                         icon: 6,
//                         area: ['400px'],
//                         time: 0,
//                         anim: 2,
//                         shadeClose: false,
//                         shade: 0.6,
//                         closeBtn: 0,
//                         skin: 'layer-ext-qiuskin',
//                         title: 'Message',
//                         offset: 'c',
//                         btn: ['Contact Us', 'View Orders >>'],
//                     }, function(index){
//                         window.location.href = '/';
//                         layer.close(index);
//                     }, function(){
//                         window.location.href="/cart/payment_success?invoice_no=" + invoice_no;
//                     });
//                     return;
//                 }else{
//                     layer.confirm(resp.msg, {
//                         zIndex:19891014,
//                         area: ['520px'],
//                         time: 0,
//                         anim: 2,
//                         shadeClose: false,
//                         shade: 0.6,
//                         closeBtn: 0,
//                         skin: 'layer-ext-qiuskin',
//                         title: 'Message',
//                         offset: 'c',
//                         btn: ['Contact Us', 'Pay Again >>'],
//                     }, function(index){
//                         window.location.href = '/';
//                         layer.close(index);
//                     }, function(){
//                         window.location.reload();
//                     });
//                 }
//             },
//             error:function(){
//                 layer.close(stipe_paying);
//                 layer.msg('Please refresh retry.');
//                 return;
//             }
//         });
//     }
// });
if(document.getElementById('stripe-button')){
    document.getElementById('stripe-button').addEventListener('click', function(e) {
        if(stripe_amount > 99999999){
            HXMessage.msg('The amount value supports up to eight digits.');
            return;
        }
        // {\# Open Checkout with further options: #\}//
        handler.open({
            name: '{{ C.site_name ? : "HeXin" }}',
            description: '{{ invoice_no ? "NO. "~invoice_no : "Complete your order" }}'
        });
        e.preventDefault();
    });
}