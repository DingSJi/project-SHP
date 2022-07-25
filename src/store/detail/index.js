import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'

const state = {
  goodInfo: {},
  // 游客临时身份id
  uuid_token: getUUID()
}
const actions = {
  async getGoodInfo({ commit }, skuid) {
    let result = await reqGoodsInfo(skuid)
    if (result.code === 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  //将产品添加到购物车  服务器没有返回其他数据 只返回成功信息 不用commit
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // console.log(result);
    if (result.code === 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const getters = {
  categoryView(state) {
    //{}防止传入undefined
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}