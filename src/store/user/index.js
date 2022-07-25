import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  //退出登录后，清除本地相应数据（state,localStorage）
  CLEAR(state) {
    state.userInfo = {}
    state.token = ''
    removeToken()
  }
}
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    // 这个接口验证码会返回，正常情况是后端把验证码发到用户手机
    let result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  //用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    console.log(result);
    if (result.code === 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('失败'))
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    //服务器发送token 是用户的唯一标识
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      //持久化存储token（vuex是非持久化存储，一刷新数据会消失）
      // 当页面刷新，会首先执行请求拦截器，拦截器会在请求头添加本仓库state中的token，vuex会去找本地存储中的token
      setToken(result.data.token)
      return 'OK'
    } else {
      return Promise.reject(new Error('Fail'))
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    // console.log(result);
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    //向服务器发请求通知服务器清除token
    let result = await reqLogOut()
    if (result.code === 200) {
      // actions不能修改state，交给mutation去清除state相关数据
      commit('CLEAR')
      return 'OK'
    } else {
      return Promise.reject(new Error('Fail'))
    }
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}