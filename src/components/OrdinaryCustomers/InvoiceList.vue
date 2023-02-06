<template>
  <a-modal width="auto" v-model:visible="visible" @ok="handleExit" okText="Exit">
    <template #title>
      Invoice List
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
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
