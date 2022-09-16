<!--
 * @Created on: 2022-09-15 23:38:33
 * @@LastEditTime: 2022-09-16 23:29:28
 * @@Author: ring
 * 
 * @@Desc: 
 * 
-->
<template>
  <a-row class="group-header" align="center">

    <img :src="logo" height="55" />


    <!---------------------------- 标题: 自动标注工具  ---------------------------->
    <!-- 
    <span style=" font-size: 28px; font-style: italic; margin-left: 20px; cursor: pointer"
          @click="$router.push({ path:'/'}).catch(e=>{console.log(e)})"
    >
      Auto<span style="color: #f6e3b3">Labeling</span>
    </span>
    -->

    <!---------------------------- copyright  ---------------------------->
    <!--
    <span style=" color: #b9c5dd; margin-left: auto; font-weight: bold; font-family: Monaco; font-size: 18px; ">
      Copyright © fduxuan
    </span>
    -->
    <a-button v-if="ifLogin" class="sign-in-btn" type="outline">
      <template #icon>
        <icon-import />
      </template>
      <!-- Use the default slot to avoid extra spaces -->
      <template #default>LOGOUT</template>
    </a-button>

  </a-row>

</template>

<script>

import logo from '../../assets/logo.png';

export default {
  name: "Header",
  components: {
  },
  props: {
    ifLogin: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      logo: logo
    }
  },

  methods: {},

  mounted() {

  },
}
</script>

<style scoped>
/* 全局header */
.group-header{
  height: 55px;
  padding: 0 5%;
  background: #F0F2F5;
  filter: drop-shadow(0 0 5px rgb(0 0 0 / 30%));
}
.sign-in-btn {
  margin-left: auto;
}
</style>
