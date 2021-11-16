<!--
   Created on 2021/11/16 1:11 下午

   @Author: fduxuan

   Desc: header
 */
 -->
<template>
  <a-row class="group-header" align="center">
    <!---------------------------- 标题: 自动标注工具  ---------------------------->
    <span style="font-weight: bold; font-size: 28px; font-style: italic">
      Auto<span style="color: #f6e3b3">Marking</span>
    </span>
    <!---------------------------- copyright  ---------------------------->
    <span style=" color: #b9c5dd; margin-left: auto; font-weight: bold; font-family: Monaco; font-size: 18px; ">
      Copyright © fduxuan
    </span>

  </a-row>

</template>

<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {}
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
  height: 30px;
  padding: 10px 20px 10px 20px;
  background: #141a24;
  color: #ffffff;
}
</style>
