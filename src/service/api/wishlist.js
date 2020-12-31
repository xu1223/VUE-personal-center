import Base from './base.js';

export default Base({
    getWishlists: { // 获取心愿单列表
        method: 'post',
        url: '/api/cart/get_wishlists'
    },
    wishDo: { //添加删除心愿单 /api/cart/wish_do
        method: 'post',
        url: '/api/cart/wish_do'
    },
    cartAdd:{ //添加购物车
        method: 'post',
        url: '/api/cart/cart_add'
    },
    emptyWish:{ //清空心愿单
        method: 'post',
        url: '/api/cart/empty_wish'
    },
    batchCartAdd:{//批量添加购物车
        method: 'post',
        url: 'api/cart/batch_cart_add'
    },
    batchDeleteWish:{//批量删除购物车
        method: 'post',
        url: 'api/cart/batch_delete_wish'
    }
   
});