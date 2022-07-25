//对于axios进行二次封装
import axios from "axios";
//引入进度条nprogress 有start和done方法
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
// 引入store
import store from '@/store'


//创建axios示例
const requests = axios.create({
  //发请求路径会出现/api
  baseURL: '/api',
  //请求超时时间
  timeout: 5000,
});

//请求拦截器
requests.interceptors.request.use((config) => {
  //config配置对象，有一个header请求头属性
  if (store.state.detail.uuid_token) {
    //给请求头添加字段userTempId
    config.headers.userTempId = store.state.detail.uuid_token
  }
  //需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  //进度条开始动
  nprogress.start();
  return config;
})
//响应拦截器
requests.interceptors.response.use((res) => {
  //进度条结束
  nprogress.done();
  return res.data;
}, (error) => {
  //响应失败回调函数
  return Promise.reject(new Error('fail'))
});

export default requests;