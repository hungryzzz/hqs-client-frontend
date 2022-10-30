<!--
 * @Created on: 2022-10-17 19:48:12
 * @LastEditTime: 2022-10-20 22:44:31
 * @Author: fduxuan
 * 
 * @Desc:   普通用户的
 * 
-->
<template>
  <div>
    <div class="modal-title">
        <IconList /> Daily Summary Report
    </div>
    <div v-for="item in this.sortList">
        <SortCard :sortNum="item" id="item"></SortCard>
    </div>
    

  </div>
</template>

<script>
// User@Vekan.com
// H8GRN2A7
import SortCard from "../components/OrdinaryCustomers/SortCard.vue"
import PoDetailService from "../models/PoListService"
export default {
  name: "OrdinaryCustomers",
  props: {},
  components: {SortCard},
  data() {
    return {
      sortList: []
    }
  },
  methods: {
    async getSortList(){
      this.sortList = await PoDetailService.getSortList()
    }
  },
  mounted() {
      this.getSortList()
  },
  unmounted() {},
  watch: {}
}
</script>

<style scoped>
.modal-title {
  background-color: rgb(var(--primary-6));
  color: white;
  line-height: 38px;
  font-weight: 600;
  text-align: left;
  padding: 0 5%;
}
</style>