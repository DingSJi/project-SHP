import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    // console.log(result);
    if (result.code) {
      commit('GETCARTLIST', result.data)
    }
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code === 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('Fail'))
    }
  },
  // 修改某一个购物车产品选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code === 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('Fail'))
    }
  },
  //删除全部勾选商品
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(element => {
      let promise = element.isChecked === 1 ? dispatch('deleteCartListBySkuId', element.skuId) : '';
      //将每一次返回的promise添加到数组
      PromiseAll.push(promise)
    });
    //只要全部的promise都成功，则返回成功，否则失败
    return Promise.all(PromiseAll)
  },
  //修改全部产品选中状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}