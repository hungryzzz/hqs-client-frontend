<!--
   Created on 2021/11/16 1:11 下午

   @Author: fduxuan

   Desc: header
 */
 -->
<template>
  <a-row class="group-header" align="center" style="font-weight: bold;">

    <div style="background: #d3fcd7; height: 40px; width: 43px; border-radius: 5px;">
      <img :src="logo" height="35" />
    </div>


    <!---------------------------- 标题: 自动标注工具  ---------------------------->
    <span style=" font-size: 28px; font-style: italic; margin-left: 20px; cursor: pointer"
          @click="$router.push({ path:'/'}).catch(e=>{console.log(e)})"
    >
      Auto<span style="color: #f6e3b3">Labeling</span>
    </span>

    <!---------------------------- copyright  ---------------------------->
    <span style=" color: #b9c5dd; margin-left: auto; font-weight: bold; font-family: Monaco; font-size: 18px; ">
      Copyright © fduxuan
    </span>

  </a-row>

</template>

<script>

import logo from '../../assets/logo.png'

export default {
  name: "Header",
  components: {},
  data() {
    return {
      logo: logo
    }
  },
  props: {},

  methods: {},

  mounted() {

  },
}
</script>

<style scoped>
/* 全局header */
.group-header{
  height: 50px;
  padding: 5px 20px 5px 20px;
  background: #141a24;
  color: #ffffff;
}
</style>
