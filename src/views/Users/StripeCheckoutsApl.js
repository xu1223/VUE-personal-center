
import { Toast } from "vant";
let StripeCheckoutsApl = function(opts){
    this.init(opts)
}
StripeCheckoutsApl.prototype =  {
    init(options){
        this.datas(options)
    },
    datas(opt){
        // //{\#  billingAddress: false,shippingAddress: false,      只要'shippingAddress'，就必须启用'billingAddress'。   #\}//
        // locale: 'auto',//{\# auto en  zh Simplified Chinese (zh) Danish (da) Dutch (nl) English (en) Finnish (fi) French (fr) German (de) Italian (it) Japanese (ja) Norwegian (no) Spanish (es) Swedish (sv) #\} //
        if (typeof StripeCheckout != 'undefined') {
            let handler = StripeCheckout.configure({
                key: opt.key || '',
                image: opt.image || 'https://stripe.com/img/documentation/checkout/marketplace.png',
                locale: opt.key || 'auto',
                stripe_amount: (opt.stripe_amount * 100 )||( 0 *  100) ,
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
    
            // this.render(opt)
            if(document.getElementById('stripe-button')){
                document.getElementById('stripe-button').addEventListener('click', function(e) {
                    if(opt.stripe_amount > 99999999){
                        // HXMessage.msg('The amount value supports up to eight digits.');
                        Toast.fail('The amount value supports up to eight digits.')
                        return;
                    }
                    // {\# Open Checkout with further options: #\}//
                    handler.open({
                        name: opt.site_name || "HeXin",
                        description: opt.invoice_no ? "NO. "+opt.invoice_no : "Complete your order" 
                    });
                    e.preventDefault();
                });
            }
        }
    
        
    }

}
export default StripeCheckoutsApl
