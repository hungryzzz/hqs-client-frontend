<!--
 * @Created on: 2022-09-15 23:38:33
 * @@LastEditTime: 2022-09-16 02:20:48
 * @@Author: ring
 * 
 * @@Desc: 
 * 
-->
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from "./components/Config/Header.vue";
import Login from "./components/Login.vue";

</script>

<template>
  <div>
    <Header />
    <div v-if="ifLogin">
      <router-view></router-view>
    </div>
    <Login v-else />
    
  </div>
  
</template>

<script>
export default {
  name: "App",
  data () {
    return {
      ifLogin: true,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
</style>
