import Base from './base.js'

export default Base({
    getAllManagers: { // 获取所有业务员
        method: 'get',
        url: '/api/cart/get_all_managers'
    },
    get_customer_info:{ //登陆
        method: 'post',
        url: '/api/cart/get_customer_info'
    }, 
    guestLogin:{ //游客登录 
        method: 'post',
        url: '/api/cart/guest_login'
    },
    register:{ //用户注册
        method: 'post',
        url: '/api/cart/register'
    },
    changePasswd:{ //修改密码
        method: 'post',
        url: '/api/cart/change_passwd'
    },
    sendResetPasswdToEmail:{ //发送重置密码链接到邮箱
        method: 'post',
        url: '/api/cart/send_reset_passwd_to_email'
    },
    resetPassword:{ //重置密码
        method: 'post',
        url: '/api/cart/reset_password'
    },
});