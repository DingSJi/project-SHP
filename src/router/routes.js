//引入路由组件
/* import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder' */

//当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
//如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
const Home = () => {
  return import('@/pages/Home')
}

export default [
  //重定向，访问'/'重定向到首页
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: { show: true }
  },
  {
    path: '/search/:keyWord?',  //占位符后的？代表params参数可传可不传（不加问号不传params参数会出现路径错误(/search丢失)）
    component: () => import('@/pages/Search'),
    meta: { show: true },
    name: "search",//使用params用对象传递参数时需要用到name!
  },
  {
    path: '/detail/:skuid',
    component: () => import('@/pages/Detail'),
    meta: { show: true }
  },
  {
    path: '/addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true },
    name: 'addcartsuccess'
  },
  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true },
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { show: false }
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { show: false }
  },
  {
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') {
        next()
      } else {
        //中断当前导航 重置到from路由对应的地址 从哪来回哪去
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true },
    //这里的独享守卫写到了组件守卫中
  },
  {
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    //二级路由
    children: [
      {
        path: 'myorder',
        component: () => import('@/pages/Center/myOrder')
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/Center/groupOrder')
      },
      {
        //重定向到我的订单
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },

]