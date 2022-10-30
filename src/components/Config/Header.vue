<!--
 * @Created on: 2022-09-15 23:38:33
 * @@LastEditTime: 2022-10-30 23:51:46
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
    <span class="sign-in-btn" >
      <a-button v-if="ifLogin && ifTesla" :class="byUnit ? 'button-hover' : ''" @click="e => handleChangeUnitOrHour(true)">
        <template #icon>
          <icon-layers />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>By Unit</template>
      </a-button>
      &nbsp;
      <a-button v-if="ifLogin && ifTesla" :class="byUnit ? '' : 'button-hover'" @click="e => handleChangeUnitOrHour(false)">
        <template #icon>
          <icon-clock-circle/>
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>By Hour</template>
      </a-button>
      &nbsp;
      <a-button v-if="ifLogin" type="outline" @click="handleLogoutBtnClick">
        <template #icon>
          <icon-import />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>LOGOUT</template>
      </a-button>
    </span>
    

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
    },
    ifTesla() {
      return this.$store.state.user === 'Tesla';
    },
    byUnit() {
      return this.$store.state.byUnit;
    }
  },
  methods: {
    async handleLogoutBtnClick() {
      await UserService.logout();
      this.$store.commit("setIsLogin", false);
    },
    handleChangeUnitOrHour(flag) {      
      if (flag !== this.byUnit) {
        this.$store.commit("setByUnit", flag);
      }
    } 
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
.button-hover {
  border-color: transparent !important;
  background-color: var(--color-secondary-hover) !important;
}
</style>
