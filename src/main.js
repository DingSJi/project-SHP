import Vue from 'vue'
import App from './App.vue'

import { Icon, Button, MessageBox } from 'element-ui';
Vue.use(Icon)
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.config.productionTip = false

//定义全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagiantion from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagiantion.name, Pagiantion)

//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//测试
// import { reqCategoryList } from '@/api'
// reqCategoryList()
// import { reqGetSearchInfo } from '@/api'
// console.log(reqGetSearchInfo({}));
// import { reqGoodsInfo } from '@/api'
// console.log(reqGoodsInfo(1));


import '@/mock/mockServer'
import 'swiper/css/swiper.css'
//统一接口api文件夹里的所有请求函数
import * as API from '@/api'

import VueLazyload from 'vue-lazyload'
import loading from '@/assets/loading.gif'
Vue.use(VueLazyload, {
  loading
})

//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins, { name: 'upper' })
//引入表单验证插件（只需要执行里面的代码）
import "@/plugins/validate"

new Vue({
  render: h => h(App),
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this
    //组件可以直接使用API里的请求函数，不用再在组件里引入
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  //注册仓库 组件实例会多一个$store属性
  store
}).$mount('#app')
