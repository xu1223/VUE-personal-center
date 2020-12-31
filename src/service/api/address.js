import Base from './base.js'

export default Base({
    getAddresses: { // 收货地址列表
        method: 'get',
        url: '/api/cart/get_addresses'
    },
    addressDefault:{ //设置默认地址
        method: 'post',
        url: '/api/cart/address_default'
    },
    addressDel:{ //删除收货地址 
        method: 'post',
        url: '/api/cart/address_del'
    },
    addressAdd:{ //添加收货地址 
        method: 'post',
        url: '/api/cart/address_add'
    },
    addressEdit:{ //编辑收货地址
        method: 'post',
        url: '/api/cart/address_edit'
    },
    getAddressDetail:{ //收货地址详情
        method: 'post',
        url: '/api/cart/get_address_detail'
    },
});