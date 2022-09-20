<!--
 * @Created on: 2022-09-19 00:56:53
 * @@LastEditTime: 2022-09-21 01:25:06
 * @@Author: ring
 * 
 * @@Desc: po detail
 * 
-->
<template>
  <a-modal v-model:visible="visible" hide-cancel @ok="handleModalClose" :closable="false" ok-text="CLOSE" fullscreen>
    <template #title>
      <div class="modal-title">
        <IconList /> Daily Summary Report
      </div>
    </template>
    <a-table>
    </a-table>
  </a-modal>
</template>

<script>
export default {
    name: "DetailModal",
    components:{

    },
    props: {
      visible: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data(){
        return {
        }
    },
    props: {

    },

    methods:{
      handleModalClose () {
        this.$emit("handleModalClose");
      }
    },

    mounted(){

    },
}
</script>

<style scoped>
.modal-title {
  background-color: rgb(var(--primary-6));
  color: white;
  line-height: 38px;
  font-weight: 600;
  width: 100%;
  padding: 0 10px;
}
</style>