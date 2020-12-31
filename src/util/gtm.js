import {dealNumberFormat} from "./tools";

export default {
      purchase (order) {
        window.dataLayer = window.dataLayer || [];
        let transactionProducts = [];
        if (order && order.order_products) {
            for (let product of order.order_products) {
                transactionProducts.push({
                    'sku': product.sku|| '',
                    'name': product.name || '',
                    'category': '',
                    'price': dealNumberFormat(product.price || ''),
                    'quantity': product.quantity || 0
                });
            }
        }

        // window.dataLayer.push({
        //     'event': 'purchase',
        //     'transactionId': order.invoice_no || '',
        //     'transactionAffiliation': '',
        //     'transactionTotal': dealNumberFormat(order.total_price || ''),
        //     'transactionTax': 0,
        //     'transactionShipping': dealNumberFormat(order.shipping_fee || ''),
        //     'transactionProducts': transactionProducts
        // })

        transactionProducts =JSON.stringify(transactionProducts);
        let dataLayer=`
        dataLayer.push({
            'event': 'purchase',
            'transactionId': '${order.invoice_no || ''}',
            'transactionAffiliation': '',
            'transactionTotal': '${dealNumberFormat(order.total_price || '')}',
            'transactionTax': '0',
            'transactionShipping': '${dealNumberFormat(order.shipping_fee || '')}',
            'transactionProducts': ${transactionProducts}
        })`

        let script = document.createElement("script");
        script.type = "text/javascript";
        script.text =`
        window.dataLayer = window.dataLayer || [];${dataLayer}
        `
        document.querySelector("head").appendChild(script);
    }
}