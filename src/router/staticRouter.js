const layout = () => import( /* webpackChunkName: 'index' */ '../views/layout/view');
const staticRoute = [
    {
        path: '/',
        name: 'My Account',
        meta: {
            num: '0',
            nav:true
        },
        component: () => import(/* webpackChunkName: 'Home' */ '../views/Home'),
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
        },
        component: () => import('../views/layout/login'),
    },
    {
        path: '/forget',
        name: 'Forget',
        meta: {
        },
        component: () => import('../views/layout/forget'),
    },
    {
        path: '/reset',
        name: 'Reset',
        meta: {
        },
        component: () => import('../views/layout/reset'),
    },
    {
        path: '/order',
        name:'My Order',
        meta: {
            num: '1',
            nav:true
        },
        component: () => import('../views/order/myOrder')
    },
    {
        path: '/order/order_detail',
        name: 'Order Detail',
        meta: {
            num: '1',
        },
        component: () => import('../views/order/orderDetail'),
    },
    {
        path: '/order/order_review',
        name: 'My Order',
        meta: {
            num: '1'
        },
        component: () => import('../views/order/orderReview'),
    },
    {
        path: '/order/after_sale_service',
        name: 'After Sale Service',
        meta: {
            num: '1',
        },
        component: () => import('../views/order/afterSaleService'),
    },
    {
        path: '/order/after_sale_details',
        name: 'After Sale Details',
        meta: {
            num: '1',
        },
        component: () => import('../views/order/afterSaleDetails'),
    },
    {
        path: '/my_cart',
        name: 'Shopping Bag',
        meta: {
            num: '2',
            nav:true,
            fate:true
        },
        component: () => import('../views/cart/myCart'),
    },
    {
        path: '/payment_step_two',
        name: 'Checkout',
        meta: {
            num: '2',
            fate:true
        },
        component: () => import('../views/cart/paymentStepTwo'),
    },
    {
        path: '/payment_success',
        name: 'Order Complete',
        meta: {
            num: '2',
            fate:true
        },
        component: () => import('../views/cart/paymentSuccess'),
    },
    {
        path: '/user/my_wish',
        name: 'My Wishlist',
        meta: {
            num: '3',
            nav:true
        },
        component: () => import('../views/user/myWish'),
    },
    {
        path: '/user/my_recently_viewed',
        name: 'Recently Viewed',
        meta: {
            num: '4',
            nav:true
        },
        component: () => import('../views/user/myRecentlyViewed'),
    },
    {
        path: '/user/my_review',
        name: 'My Review',
        meta: {
            num: '5',
            nav:true
        },
        component: () => import('../views/user/myReview'),
    },
    {
        path: '/user/my_message',
        name: 'My Message',
        meta: {
            num: '6',
            nav:true
        },
        component: () => import('../views/user/myMessage'),
    },
    {
        path: '/user/my_coupon',
        name: 'My Coupon Code',
        meta: {
            num: '7',
            nav:true
        },
        component: () => import('../views/user/myCoupon'),
    },
    {
        path: '/user/my_address',
        name: 'Adress Book',
        meta: {
            num: '8',
            nav:true
        },
        component: () => import('../views/user/myAddressBook'),
    },
    {
        path: '/user/my_setting',
        name: 'Setting',
        meta: {
            num: '9',
            nav:true
        },
        component: () => import('../views/user/mySetting'),
    }
];
export default staticRoute