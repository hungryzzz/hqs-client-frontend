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
    <div class="search-wapper">
      <a-input-search
        v-model:modelValue="searchStr"
        :style="{width:'400px'}" 
        placeholder="Please enter sort number" 
        allow-clear 
        search-button 
        :max-length="20"
        @search="getSortList">
        <!-- @change="v => searchStr = v" -->
        <template #button-icon>
          <icon-search/>
        </template>
        <template #button-default>
          Search
        </template>
      </a-input-search>&nbsp;&nbsp;&nbsp;
      <a-button type="primary" @click="handleSearchStrClear">
        <template #icon>
          <IconCloseCircle />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>Clear</template>
      </a-button>
    </div>
    
    <div v-for="item in this.sortList" :key="item">
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
      sortList: [],
      searchStr: "",
    }
  },
  methods: {
    async getSortList(){
      // console.log("aaa", this.searchStr);
      this.sortList = await PoDetailService.getSortList(this.searchStr);
      // console.log(this.sortList);
    },
    handleSearchStrClear() {
      if (this.searchStr.length === 0) {
        return;
      }
      this.searchStr = "";
      console.log("handleSearchStrClear from header");
      this.getSortList();
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
.search-wapper {
  text-align: right;
  padding: 20px 4% 0px;
}
</style>