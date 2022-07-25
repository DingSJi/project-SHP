import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
//使用插件
Vue.use(VueRouter);
// 引入store
import store from '@/store'

//重写push|replace方法（解决多次点击搜索控制台报错问题）
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
  // console.log(this);
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}
//配置路由
let router = new VueRouter({
  mode: 'hash',
  routes,
  // 跳转后页面滚动行为控制
  scrollBehavior(to, from, savedPosition) {
    //代表滚动条在最上方
    return { y: 0 }
  }
})

// 全局守卫 前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    //已登录不能跳转login路由
    if (to.path === '/login') {
      next('/home')
    } else {
      //跳转到别的路由为了防止页面刷新出现用户信息丢失的情况，需要重新派发action获取信息
      if (name) {
        next()
      } else {
        try {
          await store.dispatch("user/getUserInfo");
          next()
        } catch (error) {
          //token失效了获取不到用户信息（清除token 重新登录）
          await store.dispatch('user/userLogout')
          next('/login')
        }
      }
    }
  } else {
    //未登录情况(交易 支付(pay,paysuccess) 个人中心相关页面不可以跳转)
    let toPath = to.path
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
      //把未登录时想去的路由路径存到query(redirect作为一个占位符名字任意)
      next('./login?redirect=' + toPath)
    } else {
      next()
    }
  }
})

export default router