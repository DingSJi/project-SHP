//API进行统一管理
import requests from "./request";
import mockRequests from './mockRequest.js'

//发请求 axios返回结果是Promise对象

//三级联动接口  api/product/getBaseCategoryList  GET 无参数
//获取三级菜单数据
export const reqCategoryList = () => requests({
  url: '/product/getBaseCategoryList',
  method: 'get'
})

//获取banner（home首页轮播图）
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块数据 /api/list POST
/* 
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */
export const reqGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'post',
  data: params
})

// 获取产品详情信息 /api/item/{skuId} GET
export const reqGoodsInfo = (skuId) => requests({
  url: `/item/${skuId}`,
  method: 'get'
})

//将产品添加到购物车中(也可以修改数量) /api/cart/addToCart/{skuId}/{skuNum}   POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
})

// 获取购物车列表数据 /api/cart/cartList GET
export const reqCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})

// 删除购物车产品 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})

// 修改商品选中状态 /api/cart/checkCart/{skuId}/{isChecked} GET
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

// 获取验证码 /api/user/passport/sendCode/{phone} GET
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

// 注册接口 /api/user/passport/register POST  {phone,password,code}
export const reqUserRegister = (data) => requests({
  url: '/user/passport/register',
  data,
  method: 'post'
})

// 登录接口 /api/user/passport/login POST {phone,password}
export const reqUserLogin = (data) => requests({
  url: '/user/passport/login',
  data,
  method: 'post'
})

//获取用户信息（需要带着用户token）/api/user/passport/auth/getUserInfo  GET
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})

// 退出登录 /api/user/passport/logout GET
export const reqLogOut = () => requests({
  url: '/user/passport/logout',
  method: 'get'
})

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList GET
export const reqAddressInfo = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
})

//获取商品清单  /api/order/auth/trade GET
export const reqOrderInfo = () => requests({
  url: '/order/auth/trade',
  method: 'get'
})

//提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo} POST  {traderNo,consignee,consigneeTel,deliveryAddress,paymentWay,orderComment,orderDetailList}
export const reqSubmitOrder = (tradeNo, data) => requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'post'
})

//获取订单支付信息 /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId) => requests({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
})

//获取支付状态  /api/payment/weixin/queryPayStatus/{orderId}  GET
export const reqPayStatus = (orderId) => requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
})

// 获取个人中心数据 /api/order/auth/{page}/{limit}  GET
export const reqMyOrderList = (page, limit) => requests({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})