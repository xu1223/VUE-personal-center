/** 
 * 表格
 */
export default function (param) {
    let iJson = {
        //首页
        itemBanner: [{
                title: 'Shopping Bag',
                path: '/my_cart',
            },
            {
                title: 'My Wishlist',
                path: '/user/my_wish'
            },
            {
                title: 'My Review',
                path: '/user/my_review',
            },
            {
                title: 'My Message',
                path: '/user/my_message',
            },
            {
                title: 'My Coupon Code',
                path: '/user/my_coupon'
            },
            {
                title: 'Setting',
                path: '/user/my_setting',
            },
        ],
        orderTabs:[
            {
                title: 'Unpaid',
                num:0,
                key:'unpaid'
            },
            {
                title: 'Processing',
                num:0,
                key:'paid'
            },
            {
                title: 'Shipped',
                num:0,
                key:'shipped'
            },
            {
                title: 'Completed',
                num:0,
                key:'completed'
            },
            {
                title: 'Canceled',
                num:0,
                key:'canceled'
            },
            {
                title: 'After sale',
                num:0,
                key:'after_sale'
            },
        ],
        orderTitle:[
            {
                title: 'All Orders ',
                num:0,
                key:'all'
            },
            {
                title: 'Unpaid Orders ',
                num:0,
                key:'unpaid'
            },
            {
                title: 'Processing Orders ',
                num:0,
                key:'paid'
            },
            {
                title: 'Shipped Orders ',
                num:0,
                key:'shipped'
            },
            {
                title: 'Completed Orders ',
                num:0,
                key:'completed'
            },
            {
                title: 'Canceled Orders ',
                num:0,
                key:'canceled'
            },
            // {
            //     title: 'After Sale Orders ',
            //     num:0,
            //     key:'after_sale'
            // }
        ],
        orderTable:[
            {
              title: 'Products',
              slot: 'total_number',
              align: 'center'
            },
            {
              title: 'Amount',
              slot: 'total_number',
              align: 'center'
            },
            {
              title: 'Total',
              slot: 'total_price',
              align: 'center'
            },
            {
              title: 'Status',
              slot: 'total_number',
              align: 'center'
            },
            {
                title: 'Operating',
                slot: 'action',
                align: 'center'

            }
        ],
        //表单
        addressTitle:[
            {
                key: 'firstname',
                title: 'First Name'
            },
            {
                key: 'lastname',
                title: 'Last Name'
            },
            {
                key: 'mobile',
                title: 'Phone'
            },
            {
                key: 'address_1',
                title: 'Address'
            },
            {
                key: 'city',
                title: 'City'
            },
            {
                type:'select',
                key: 'country_id',
                title: 'Country',
                options:param?param.countries_list:[]
            },
            {
                type:'select',
                key: 'zone_id',
                title: 'State',
                options:param?param.zone_list:[]
            },
            {
                key: 'postcode',
                title: 'Zip code'
            }
        ],
        orderAddress:[
            {
                key: 'shipment_firstname',
                title: 'First Name'
            },
            {
                key: 'shipment_lastname',
                title: 'Last Name'
            },
            {
                key: 'shipment_mobile',
                title: 'Phone'
            },
            {
                key: 'shipment_address_1',
                title: 'Address'
            },
            {
                key: 'shipment_city',
                title: 'City'
            },
            {
                type:'select',
                key: 'shipment_country_id',
                title: 'Country',
                options:param?param.countries_list:[]
            },
            {
                type:'select',
                key: 'shipment_zone_id',
                title: 'State',
                options:param?param.zone_list:[]
            },
            {
                key: 'shipment_postcode',
                title: 'Zip code'
            }
        ]
    };
    return iJson
}