import Base from './base.js'

export default Base({
    personal: { // 个人中心
        method: 'post',
        url: '/api/cart/personal'
    },
    customerEdit: { // 修改用户资料 
        method: 'post',
        url: '/api/cart/customer_edit'
    },
    getNewsletter:{ //获取用户订阅详情
        method: 'post',
        url:'/api/cart/get_newsletter'
    },
    customerNewsletter:{ //用户订阅取消订阅
        method: 'post',
        url:'/api/cart/customer_newsletter'
    },
    CustomerAvatarUpload:{ //用户头像
        method: 'post',
        url:'/api/cart/customer_avatar_upload'
    }
});