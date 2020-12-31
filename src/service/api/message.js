import Base from './base.js'

export default Base({
    getBackgroundMessages: { // 获取后台发送消息列表
        method: 'post',
        url: '/api/cart/get_background_messages'
    },
    getMessages:{ //获取我的消息列表
        method: 'post',
        url: '/api/cart/get_messages'
    },
    getMessageDetail:{ //获取我的消息详情 
        method: 'post',
        url: '/api/cart/get_message_detail'
    },
    sendMessage:{ //发送消息 
        method: 'post',
        url: '/api/cart/send_message'
    },
    getWillCommentOrder:{ //获取待评价订单数据
        method: 'post',
        url: '/api/cart/get_will_comment_order'
    },
    multiReviewAdd:{ //收货地址详情
        method: 'post',
        url: '/api/review/multi_review_add'
    },
    messageImageUpload:{ //收货地址详情
        method: 'post',
        url: '/api/cart/message_image_upload'
    },
    
});