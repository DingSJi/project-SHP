//对于axios进行二次封装
import axios from "axios";
//引入进度条nprogress 有start和done方法
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'


//创建axios示例
const requests = axios.create({
  baseURL: '/mock',
  //请求超时时间
  timeout: 5000,
});

//请求拦截器
requests.interceptors.request.use((config) => {
  //config配置对象，有一个header请求头属性
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