import Mock from "mockjs";
//webpack对外默认暴露有图片，json格式
import banner from './banner.json'
import floor from './floor.json'

/* mock使用方法
  1.src下创建mock文件夹
  2.准备json数据
  3.把mock需要的图片放到public文件夹中（public会原封不动打包到dist文件夹）
  4.创建mockServer.js
  5.在入口文件引入执行
*/

//第一个参数请求地址，第二个参数请求的数据
Mock.mock('/mock/banner', {
  code: 200,
  data: banner
})
Mock.mock('/mock/floor', {
  code: 200,
  data: floor
})