const state = {
    config: []
};
const mutations = {
    modeify_config(state, arg) {
        state.config = arg;
    }
};
const actions = {
    /**
     * 头部
     * @param {*} param0
     * @param {*} arg
     */
    async StoreGetConfig({commit}, arg) {
        commit('modeify_config', index.data)
    }
};

export default {
    namespaced: true,
    mutations,
    state,
    actions,
}