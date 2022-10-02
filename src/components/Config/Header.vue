<!--
 * @Created on: 2022-09-15 23:38:33
 * @@LastEditTime: 2022-09-29 00:37:38
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
    <a-button v-if="ifLogin" class="sign-in-btn" type="outline" @click="handleLogoutBtnClick">
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
import UserService from '../../models/UserService.js';

export default {
  name: "Header",
  components: {
  },
  data() {
    return {
      logo: logo,
    }
  },
  computed: {
    ifLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    async handleLogoutBtnClick() {
      await UserService.logout();
      this.$store.commit("setIsLogin", false);
    },
  },
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
