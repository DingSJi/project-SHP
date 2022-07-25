<template>
  <div>
    <!-- <h1 v-upper="msg"></h1> -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示 在登录注册隐藏 通过meta解决-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  data() {
    return {
      msg: "abc",
    };
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    //vuex发请求，获取数据，存储于仓库
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style>
</style>