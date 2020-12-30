import Base from './base.js'

export default Base({
    getSysConfig: { // 获取站点配置
        method: 'post',
        url: '/api/get_config'
    },
    getCountries:{   //获取国家列表数据
        method: 'post',
        url: '/api/get_countries'
    },
    getCountryZone:{ //根据国家获取地区数据
        method: 'post',
        url: '/api/cart/get_country_zone'
    },
    getAllWishlistProductIds:{ //获取心愿单全部商品id数据
        method: 'post',
        url: '/api/cart/get_all_wishlist_product_ids'
    },
    sessionConvertToCustomer:{ //同步session购物车数据到账户
        method: 'post',
        url: '/api/cart/session_convert_to_customer'
    },
    getUsedCoupons:{ //获取已使用优惠券
        method: 'post',
        url: '/api/coupon/get_used_coupons'
    },
    getTotalCartWishCount:{//获取购物车/心愿单总数
        method: 'post',
        url: '/api/cart/get_total_cart_wish_count'
    },
    getLoginWays:{//第三方登录接口
        method: 'post',
        url: '/api/third_party_login/get_login_ways'
    },
    thirdPartyLogin:{
        method: 'post',
        url: '/api/third_party_login/third_party_login'
    },
    bindAccount:{ //第三方登录绑定已有账户
        method: 'post',
        url:'/api/third_party_login/bind_account'
    },
    register:{//第三方登录创建新用户
        method:'post',
        url:'/api/cart/register'
    }
});