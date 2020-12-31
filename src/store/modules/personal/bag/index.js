// import {
//     fetch_form
// } from "@/util/fetch"
const state = {
    bag_mun: '',
    bag_weight: '',
    bag_prive: '',
    bag_show_prive: '',
    monitor: '0',
    coupon_amount: '',
    bag_discount_:0,
    bag_total_num: '',
    wish_total_num:''
}
const mutations = {
    bag_mun(state, arg) {
        state.bag_mun = arg;
    },
    bag_weight(state, arg) {
        state.bag_weight = arg;
    },
    bag_prive(state, arg) {
        state.bag_prive = arg;
    },
    bag_show_prive(state, arg) {
        state.bag_show_prive = arg;
    },
    monitor(state, arg) {
        state.monitor = arg
    },
    coupon_amount(state, arg) {
        state.coupon_amount = arg
    },
    bag_discount_(state, arg) {
        state.bag_discount_ = arg
    },
    bag_total_num(state, arg) {
        state.bag_total_num = arg
    },
    wish_total_num(state, arg){
        state.wish_total_num = arg
    }
}
const actions = {
    async bag_data({
        commit
    }, param) {
        const list = param.data
        const data = param.data.data
        let mun = Number(list.mun) - Number(data.quantity)
       
        commit('monitor', 1 + Number(state.monitor))
        if (data.pov_show_price != data.pov_price) {
            let couponamount = Number(data.pov_show_price) - Number(data.pov_price)
            commit('coupon_amount', couponamount * mun)
        }
        let bag_discount_=0;
        if (data.pov_show_price != data.pov_price) {
            bag_discount_ = Number(data.pov_show_price) - Number(data.pov_price)
        }
        commit('bag_discount_', bag_discount_ * mun)

        commit('bag_mun', mun)
        commit('bag_weight', mun * data.pov_weight)
        commit('bag_prive', mun * data.pov_price)
        commit('bag_show_prive', mun * data.pov_show_price)
        // await fetch_form({
        //     type: 'post',
        //     url: list.url,
        //     params: {}
        // })
    }
}

const getters = {

}

export default {
    namespaced: true,
    mutations,
    state,
    actions,
    getters
}