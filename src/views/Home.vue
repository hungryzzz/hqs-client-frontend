<!--
 * @Created on: 2022-10-20 22:38:44
 * @LastEditTime: 2022-10-20 22:43:44
 * @Author: fduxuan
 * 
 * @Desc:  
 * 
-->
<template>
  <div>
    <PoListJob v-if="$store.state.user==='Tesla'"></PoListJob>
    <OrdinaryCustomers v-else></OrdinaryCustomers>
  </div>
</template>

<script>
import OrdinaryCustomers from "./OrdinaryCustomers.vue"
import PoListJob from "./PoListJob.vue"
export default {
  name: "Home",
  props: {},
  components: {OrdinaryCustomers, PoListJob},
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  unmounted() {},
  watch: {}
}
</script>

<style scoped></style>