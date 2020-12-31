const urlPath = '';
const Layout = () => import( /* webpackChunkName: 'index' */ '../views/Layout/vivew')
const staticRoute = [
    {
        path: urlPath+'/login',
        name: 'login',
        component: () => import( /* webpackChunkName: 'login' */ '../views/Layout/Login'),
    },
    {
        path: urlPath+'/apilogin',
        name: 'apilogin',
        component: () => import( /* webpackChunkName: 'login' */ '../views/Layout/apilogin'),
    },
    {
        path: urlPath+'/reg',
        name: 'reg',
        component: () => import( /* webpackChunkName: 'Reg' */ '../views/Layout/Reg'),
    },
    {
        path: urlPath+'/',
        name: 'home',
        component: () => import( /* webpackChunkName: 'Home' */ '../views/Home'),
    },
    {
        path: urlPath+'/order',
        component: Layout,
        // component: () => import('../views/Home'),
        children: [
            {
                path: '',
                component: () => import( /* webpackChunkName: 'order' */ '../views/Order/index')
            },
            {
                path: 'after_sale_details',
                component: () => import( /* webpackChunkName: 'Confirmorderaftersaleedit' */ '../views/Order/Confirmorderaftersaleedit')
            },
            {
                path: 'order_detail',
                component: () => import( /* webpackChunkName: 'Orderdetail' */ '../views/Order/Orderdetail')
            },
            {
                path: 'order_review',
                component: () => import( /* webpackChunkName: 'Comment' */ '../views/Users/Comment')
            },
            {
                path: 'apply_order_after_sale',
                component: () => import( /* webpackChunkName: 'Applyorderaftersale' */ '../views/Order/Applyorderaftersale')
            },
            {
                path: 'apply_order_after_saleinfo',
                component: () => import( /* webpackChunkName: 'Applyorderaftersaleinfo' */ '../views/Order/Applyorderaftersaleinfo')
            },
            {
                path: 'confirm_order_after_sale',
                component: () => import( /* webpackChunkName: 'Confirmorderaftersale' */ '../views/Order/Confirmorderaftersale')
            }
        ]
    },
    {
        path: urlPath+'/reset',
        name:'reset',
        component: () => import( /* webpackChunkName: 'Reset' */ '../views/Layout/Reset')
    },
    {
        path:  urlPath+'forgot',
        name: 'cart_forgot',
        component: () => import( /* webpackChunkName: 'Forgot' */ '../views/Layout/Forgot')
    },
        
    {
        path: '/my_cart',
        name: 'my_cart',
        component: () => import( /* webpackChunkName: 'Mycart' */ '../views/Users/Mycart')
    },
    {
        path: '/payment_success',
        name: 'payment_success',
        component: () => import( /* webpackChunkName: 'Paymentsuccess' */ '../views/Users/Paymentsuccess')
    },
    {
        path: '/payment_step_two',
        name: 'payment_step_two',
        component: () => import( /* webpackChunkName: 'Paymentsteptwo' */ '../views/Users/Paymentsteptwo')
    },
    {
        path: urlPath+'/user',
        component: Layout,
        // component: () => import('../views/Home'),
        children: [
            {
                path: 'my_setting',
                name:'Setting',
                component: () => import( /* webpackChunkName: 'Wishlist' */ '../views/Users/mySetting')
            },
            {
                path: 'my_wish',
                component: () => import( /* webpackChunkName: 'Wishlist' */ '../views/Users/Wishlist')
            },
            {
                path: 'my_review',
                component: ()=> import( /* webpackChunkName: 'Mycommont' */ '../views/Users/Mycommont')
            },
            {
                path: 'my_message',
                component: ()=> import( /* webpackChunkName: 'Mymessage' */ '../views/Users/Mymessage')
            },
            {
                path: 'my_message_send',
                component: ()=> import( /* webpackChunkName: 'Mymessage' */ '../views/Users/Mymessagesend')
            },
            {
                path: 'my_recently_viewed',
                component: ()=> import( /* webpackChunkName: 'Myrecentlyviewed' */ '../views/Users/Myrecentlyviewed')
            },
            {
                path: 'my_coupon',
                component: ()=> import( /* webpackChunkName: 'Discountcoupon' */ '../views/Users/Discountcoupon')
            },
            {
                path: 'my_address',
                component: () => import( /* webpackChunkName: 'Addressbook' */ '../views/Address/Addressbook')
            }
        ]
    },
    {
        path: urlPath+'/error',
        component: Layout,
        children: [

            {
                path: '404',
                component: () => import( /* webpackChunkName: 'error' */ '../views/error/404')
            }
        ]
    }
];
export default staticRoute