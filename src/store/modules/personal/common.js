import storge from '@/util/storage'
const urlPath = process.env.VUE_APP_PUBLIC_RUL;
const state = {
    config: [] || storge.getConfig(),
    urlPath: urlPath,//路径
}
const mutations = {
  modeify_config(state,arg){
    state.config = arg;
  },
  
}
const actions = {
  /**
   * 头部
   * @param {*} param0 
   * @param {*} arg 
   */
  async StoreGetConfig({ commit },arg){
      commit('modeify_config',index.data)
  }

}

export default {
  namespaced: true, 
  mutations,
  state,
  actions,
}