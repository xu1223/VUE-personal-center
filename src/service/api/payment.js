import Base from './base.js'

export default Base({
    getOrderPaymentDetail: { // 购物第二步-获取订单支付所需信息
        method: 'post',
        url: '/api/cart/get_order_payment_detail'
    },
    syncOrderTradingInfo:{ //支付第二步-同步收货地址信息、支付方式、物流方式、邮箱等信息
        method: 'post',
        url: '/api/cart/sync_order_trading_info'
    },
    confirmOrder:{ //购物第三步-确认订单
        method: 'post',
        url: '/api/cart/confirm_order'
    },
    paymentSuccess:{ //购物第四步-获取支付成功数据
        method: 'post',
        url: '/api/cart/payment_success'
    },
    wishDo:{ //添加删除心愿单
        method: 'post',
        url: '/api/cart/wish_do'
    },
    shippingAsync:{ //获取可到达的运费信息
        method: 'post',
        url: '/api/cart/shipping_async'
    },
});