import Base from './base.js'

export default Base({
    getOrders: { //订单列表
        method: 'post',
        url: '/api/cart/get_orders'
    },
    getOrderReturns: { // 售后订单列表
        method: 'post',
        url: '/api/cart/get_order_returns'
    },
    orderCanceled:{ //取消订单
        method: 'post',
        url: '/api/cart/order_canceled'
    },
    orderCompleted:{ //取消订单
        method: 'post',
        url: '/api/cart/order_completed'
    },
    ordeDelByNo:{//删除订单 
        method: 'post',
        url: 'api/cart/order_del_by_no'
    },
    buyAgain:{ //再次购买-订单商品添加到购物车
        method: 'post',
        url: '/api/cart/buy_again'
    },
    getOrderDetail:{ //订单详情 
        method: 'post',
        url: '/api/cart/get_order_detail'
    },
    getOrderDetailbsessionid:{ //订单支付详情 
        method: 'post',
        url: '/api/cart/get_order_detail_by_session_id'
    },
    modifyShippingAddress:{ //修改订单收货地址信息
        method: 'post',
        url: '/api/cart/modify_shipping_address'
    },
    getOrderProductDetail:{ //获取订单商品信息
        method: 'post',
        url: '/api/cart/get_order_product_detail'
    },
    getReturnAction:{ //获取售后方式选项数据
        method: 'post',
        url: '/api/cart/get_return_action'
    },
    generateOrderAfterSale:{//生成售后订单
        method: 'post',
        url: '/api/cart/generate_order_after_sale' 
    },
    orderReturnImageUpload:{//售后订单图片上传方法
        method: 'post',
        url: '/api/cart/order_return_image_upload'
    },
    canceledOrderReturn:{//取消售后订单
        method: 'post',
        url: '/api/cart/canceled_order_return'
    },
    changeApplyOrdeReturn:{//修改申请售后订单填写的数据
        method: 'post',
        url: '/api/cart/change_apply_order_return'
    },
    getOrderReturnDetail:{ //获取售后订单
        method: 'post',
        url: '/api/cart/get_order_return_detail'
    }
});