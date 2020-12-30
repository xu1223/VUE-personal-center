import Base from './base.js'

export default Base({
    fullMallActivityList: { // 全场活动列表
        method: 'post',
        url: '/api/full_activity/full_mall_activity_list'
    },
    getCarts:{ //购物车列表
        method: 'post',
        url: '/api/cart/get_carts'
    },
    checkCouponAvailabilityByCart:{ //验证购物车商品是否满足优惠券使用条件 
        method: 'post',
        url: '/api/coupon/check_coupon_availability_by_cart'
    },
    generateOrderFromCart:{ //购物第一步-从购物车生成订单 
        method: 'post',
        url: '/api/cart/generate_order_from_cart'
    },
    getFeaturedProducts:{ //商品活动-商品列表
        method: 'post',
        url: '/api/web/get_featured_products'
    },
    getRecentlyViewed:{ //获取用户最近查看的商品记录
        method: 'post',
        url: '/api/cart/get_recently_viewed'
    },
    cartAddAllToWish:{ //购物车商品全部加入心愿单
        method: 'post',
        url: '/api/cart/cart_add_all_to_wish'
    },
    cartEmpty:{ //清空购物车
        method: 'post',
        url: '/api/cart/cart_empty'
    },
    cartEdit:{ //编辑购物车
        method: 'post',
        url: '/api/cart/cart_edit'
    },
    cartDel:{ //删除购物车
        method: 'post',
        url: '/api/cart/cart_del'
    },
    wishDo:{ //添加删除心愿单
        method: 'post',
        url: '/api/cart/wish_do'
    }, 
    moveShelvesToWishlist:{ //下架
        method: 'post',
        url: '/api/cart/move_off_shelves_to_wishlist_by_cart'
    },
    getAllRecentlyViewedSimple:{ //相识商品
        method: 'post',
        url: '/api/cart/get_all_recently_viewed_simple'
    },
    getDesignatedProducts:{ //指定商品列表
        method: 'post',
        url: '/api/web/get_designated_products'
    },
});