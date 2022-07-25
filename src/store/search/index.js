import { reqGetSearchInfo } from '@/api'
const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  //获取search模块数据
  async getSearchList({ commit }, params = {}) {//默认为空对象
    let result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
const getters = {
  //state是当前仓库中的，并非大仓库的
  goodsList(state) {
    return state.searchList.goodsList || [] //防止因网络或服务器的问题不能获得数据造成undefined的情况
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}