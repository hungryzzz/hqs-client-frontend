<!--
 * @Created on: 2022-09-15 23:38:33
 * @@LastEditTime: 2022-09-29 00:36:09
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

// User@tesla.com
// BGK8IWDI

export default {
  name: "App",
  data () {
    return {
      // ifLogin: false,
    }
  },
  computed: {
    ifLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {},
  mounted() {}
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
