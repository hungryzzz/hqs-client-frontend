<!--
 * @Created on: 2023-02-13 00:12:44
 * @@LastEditTime: 2023-03-01 01:09:22
 * @@Author: fduxuan
 * 
 * @@Desc: 
 * 
-->
<template>
  <a-modal width="auto" v-model:visible="visible" @ok="handleExit" okText="Exit" :hide-cancel="true">
    <template #title>
      Invoice List
    </template>
    <div>Invoice will be sent by mannual, if any question, please contact cs@hqsautomotive.com.</div>
  </a-modal>
</template>

<script>

export default {
  name: "InvoiceList",
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  components: {},
  data() {
    return {

    }
  },
  methods: {
    handleExit() {
      this.$emit("handleInvoiceListClose");
    }
  },
  mounted() {}
}
</script>

<style scoped>

</style>
