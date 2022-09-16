<template>
  <div>
    <a-space direction="vertical" size="large" style="width: 100%">
      <a-table :columns="columns" :data="poList" :span-method="dataSpanMethod" :bordered="{wrapper: true, cell: true}" />
    </a-space>
  </div>
</template>

<script>
import { PoListHeader, SpanHeader } from '../config/PoListHeader.js';

export default {
  name: "Home",
  components: {},
  props: {},
  setup() {
    const dataSpanMethod = ({ record, column }) => {
      if (record["start date"] === record["po date"] && SpanHeader.indexOf(column.dataIndex) !== -1) {
        return {
          rowspan: record.line_sum,
          colspan: 1,
        }
      }
    };
    const columns = PoListHeader.map(co => ({ title: co, dataIndex: co.toLowerCase() }));
    return {
      dataSpanMethod,
      columns,
    }
  },
  data() {
    return {
      poList: [
        {
          id: "sdjksjdk",
          status: "CLOSE",
          "po#": "490032832189",
          "sort#": "102407",
          "part#": "15645243-97-B,15645243-97-C",
          "start date": "10/26/21",
          "line#": "10",
          "po date": "10/26/21",
          "po stop date": "11/26/21",
          "unit price": "$3.45",
          "part limit": "2800",
          "line amount": "$43934.00",
          "part completed": "2800",
          "part remaining": "0",
          "remaining %": "100%",
          "line_sum": 4,
        },
        {
          id: "sdj029301jdk",
          status: "CLOSE",
          "po#": "490032832189",
          "sort#": "102407",
          "part#": "15645243-97-B,15645243-97-C",
          "start date": "10/26/21",
          "line#": "30",
          "po date": "11/26/21",
          "po stop date": "12/26/21",
          "unit price": "$3.45",
          "part limit": "232100",
          "line amount": "$433213934.00",
          "part completed": "2800",
          "part remaining": "0",
          "remaining %": "100%",
        },
        {
          id: "sdjks31mkk",
          status: "CLOSE",
          "po#": "490032832189",
          "sort#": "102407",
          "part#": "15645243-97-B,15645243-97-C",
          "start date": "10/26/21",
          "line#": "40",
          "po date": "12/26/21",
          "po stop date": "01/26/22",
          "unit price": "$3.45",
          "part limit": "98300",
          "line amount": "$43932134.00",
          "part completed": "2800",
          "part remaining": "0",
          "remaining %": "100%",
        },
        {
          id: "sd39109ljdk",
          status: "CLOSE",
          "po#": "490032832189",
          "sort#": "102407",
          "part#": "15645243-97-B,15645243-97-C",
          "start date": "10/26/21",
          "line#": "50",
          "po date": "01/26/22",
          "po stop date": "02/26/22",
          "unit price": "$3.45",
          "part limit": "2800",
          "line amount": "$43934.00",
          "part completed": "2800",
          "part remaining": "0",
          "remaining %": "100%",
        }
      ],
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style scoped>
</style>