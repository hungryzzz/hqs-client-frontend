<!--
 * @Created on: 2022-10-08 09:44:35
 * @LastEditTime: 2022-10-08 15:39:18
 * @Author: fduxuan
 * 
 * @Desc:  
 * 
-->
<template>
  <div class="table-wrapper">
    <a-space direction="vertical" size="large" style="width: 100%">
      <ByUnit v-if="byUnit"></ByUnit>
      <ByHour v-else></ByHour>
    </a-space>
  </div>
  <!--
  <a-tabs style="margin: 10px" type="card">
    
    <a-tab-pane key="1">
      <template #title>
        <icon-layers /> <span style="font-weight: bold">By Uint</span>
      </template>
      <div class="tab-content-wrapper">
        <ByUnit></ByUnit>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2">
      <template #title>
        <icon-clock-circle/> <span style="font-weight: bold">By Hour</span>
      </template>
      <div class="tab-content-wrapper">
        <ByHour></ByHour>
      </div>
    </a-tab-pane>
  </a-tabs>-->
</template>

<script>
import ByUnit from "../components/PoListJob/ByUnit.vue";
import ByHour from "../components/PoListJob/ByHour.vue";
export default {
  name: "PoListJob",
  props: {},
  components: {ByUnit, ByHour},
  computed: {
    byUnit() {
      return this.$store.state.byUnit;
    }
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  unmounted() {},
  watch: {}
}
</script>

<style scoped>
.table-wrapper {
  padding: 5px;
}


/* 一堆魔改使得标签像飞书的sheet */
::v-deep(.arco-tabs-content){
    padding-top: 0;
    border: 0;
}

::v-deep(.arco-tabs-nav){
    border-bottom: 0;
    padding-left: 3%
}

::v-deep(.arco-tabs-nav::before){
    content:"📚";
    /* content:"xx"; */
    background-color: white;
    top: 8px;
    right: 97%;
    font-size: 20px
}

::v-deep(.arco-tabs-tab){
    border-bottom: 0;
}

::v-deep(.arco-tabs-tab-active){
    background-color: #f2f3f5;
    border-bottom: 0;
}

::v-deep(.arco-tabs-tab-active:hover){
    background-color: #f2f3f5;
    border-bottom: 0;
}


/* #show-tab-icon  */
.tab-content-wrapper {
  height: calc(100vh - 140px);
  overflow: scroll;
}
</style>