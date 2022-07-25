<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav />
    <!-- 局部组件 -->
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- home父组件发请求获取数据传给子组件 -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("home/getFloorList");
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
};
</script>

<style>
</style>