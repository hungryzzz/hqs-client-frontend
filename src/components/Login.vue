<!--
 * @Created on: 2022-09-16 00:18:28
 * @@LastEditTime: 2022-09-29 00:34:46
 * @@Author: ring
 * 
 * @@Desc: login page
 * 
-->
<template>
    <div class="login-view">
      <div class="half-side left-side">
        <div class="side-content">
          <a-space direction="vertical" size="large">
            <a-image :src="LoginLogo" width="200" style="border-radius: 100%" />
            <div class="side-font">Welcome</div>
          </a-space>
          
          
        </div>
        
      </div>
      <div class="half-side right-side">
        <div class="side-content">
          

          <a-space direction="vertical" size="large">
            <div class="side-font">LOGIN TO HQS</div>
            <a-input 
              :style="{width:'320px'}" 
              placeholder="Please enter your email" 
              allow-clear 
              size="large"
              @change="value => handleInputChange(value, 'email')">
              <template #prefix>
                <icon-email />
              </template>
            </a-input>
            <a-input-password
              @change="value => handleInputChange(value, 'password')"
              :style="{width:'320px'}" 
              placeholder="Please enter your password" 
              size="large" 
              allow-clear />

            <a-button type="primary" long @click="handleLoginBtnClick">LOGIN</a-button>
          </a-space>
          
        </div>

      </div>
    </div>
</template>

<script>
import LoginLogo from '../assets/login-logo.png';
import UserService from '../models/UserService.js';
export default {
  name: "Login",
  components:{

  },
  data(){
    return {
      LoginLogo,
      email: "",
      password: "",
    }
  },
  props: {

  },

  methods:{
    async handleLoginBtnClick() {
      console.log(this.email, this.password);
      const res = await UserService.login(this.email, this.password);
      this.$store.commit("setIsLogin", true);
    },
    handleInputChange(value, field_name) {
      this[field_name] = value;
    },
    async checkLogin() {
      const res = await UserService.checkLogin();
      this.$store.commit("setIsLogin", res !== "未登录");
    }
  },

  mounted(){
    this.checkLogin();
  },
}
</script>

<style scoped>
.login-view {
  display: flex;
}
.half-side {
  height: calc(100vh - 55px);
  position: relative;
}
.side-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.side-font {
  font-size: 35px;
  line-height: 50px;
  font-weight: 900;
}

.left-side {
  width: 55%;
  background-color: rgb(var(--primary-6));
  color: white;
}


.right-side {
  width: 45%;
  color: #333333;
  text-align: left;
}


</style>
