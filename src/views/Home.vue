<template>
  <div class="table-wrapper">
    <a-space direction="vertical" size="large" style="width: 100%">
      <a-table 
        :columns="columns" 
        :data="poList" 
        :span-method="dataSpanMethod" 
        :bordered="{wrapper: true, cell: true}"
        column-resizable
        :pagination="false"
        :table-layout-fixed="true">
        <template #status="{ record, rowIndex }">
          <a-tag :color="record.status === 'CLOSE' ? '#f53f3f' : '#168cff'">{{ record.status }}</a-tag>
        </template>
        <template #po_num="{ record, rowIndex }">
          <span class="text-bold">{{ record.po_num }}</span>
        </template>
        <template #sort_num="{ record, rowIndex }">
          <a-link icon status="success" @click="handleModalOpen(record)">{{ record.sort_num }}</a-link>
        </template>
        <template #part_num="{ record, rowIndex }">
          <a-space direction="vertical">
            <a-tag v-for="(p, index) of record.part_num" :key="index">
              {{ p }}
            </a-tag>
          </a-space>
        </template>
        <template #remaining="{ record, rowIndx }">
          <a-tag v-if="parseInt(record.remaining) === 0" color="#00b42a">{{ record.remaining }}%</a-tag>
          <a-tag v-else color="#ffb400">{{ record.remaining }}%</a-tag>
        </template>
        <template #unit_price="{ record, rowIndex }">
          <span class="text-bold">{{ record.unit_price }}</span>
        </template>
        <template #line_amount="{ record, rowIndex }">
          <span class="text-bold">{{ record.line_amount }}</span>
        </template>
        <template #billing="{ record, rowIndex }">
          <a-checkbox value="1"></a-checkbox>
        </template>
      </a-table>
    </a-space>
    <DetailModal
      :visible="detailModalVisible"
      @handleModalClose="handleModalClose" />
  </div>
</template>

<script>

import { PoListHeader, SpanHeader } from '../config/PoListHeader.js';
import DetailModal from '../components/DetailModal.vue';

export default {
  name: "Home",
  components: {
    DetailModal,
  },
  setup() {
    const dataSpanMethod = ({ record, column }) => {
      if (record["start_date"] === record["po_date"] && SpanHeader.indexOf(column.dataIndex) !== -1) {
        return {
          rowspan: record.line_sum,
          colspan: 1,
        }
      }
    };
    const columns = PoListHeader.map(co => ({ 
      title: co[0], 
      dataIndex: co[1].toLowerCase(), 
      slotName: co[1].toLowerCase(),
      width: co[2],
      fixed: co[3],
      align: "center",
    }));

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
          "po_num": "490032832189",
          "sort_num": "102407",
          "part_num": ["15645243-97-B", "15645243-97-C"],
          "start_date": "10/26/21",
          "line_num": "10",
          "po_date": "10/26/21",
          "po_stop_date": "11/26/21",
          "unit_price": "$3.45",
          "part_limit": "2800",
          "line_amount": "$43934.00",
          "part_completed": "2800",
          "part_remaining": "0",
          "remaining": "0.00",
          "line_sum": 4,
        },
        {
          id: "sdj029301jdk",
          status: "CLOSE",
          "po_num": "490032832189",
          "sort_num": "102407",
          "part_num": ["15645243-97-B", "15645243-97-C"],
          "start_date": "10/26/21",
          "line_num": "30",
          "po_date": "11/26/21",
          "po_stop_date": "12/26/21",
          "unit_price": "$3.45",
          "part_limit": "232100",
          "line_amount": "$433213934.00",
          "part_completed": "2800",
          "part_remaining": "0",
          "remaining": "0.00",
        },
        {
          id: "sdjks31mkk",
          status: "CLOSE",
          "po_num": "490032832189",
          "sort_num": "102407",
          "part_num": ["15645243-97-B", "15645243-97-C"],
          "start_date": "10/26/21",
          "line_num": "40",
          "po_date": "12/26/21",
          "po_stop_date": "01/26/22",
          "unit_price": "$3.45",
          "part_limit": "98300",
          "line_amount": "$43932134.00",
          "part_completed": "2800",
          "part_remaining": "0",
          "remaining": "0.00",
        },
        {
          id: "sd39109ljdk",
          status: "CLOSE",
          "po_num": "490032832189",
          "sort_num": "102407",
          "part_num": ["15645243-97-B", "15645243-97-C"],
          "start_date": "10/26/21",
          "line_num": "50",
          "po_date": "01/26/22",
          "po_stop_date": "02/26/22",
          "unit_price": "$3.45",
          "part_limit": "2800",
          "line_amount": "$43934.00",
          "part_completed": "2800",
          "part_remaining": "400",
          "remaining": "53.32",
        },
        {
          id: "sd231jksjdk",
          status: "AVTIVATE",
          "po_num": "490032832189",
          "sort_num": "102407",
          "part_num": ["15645243-97-B", "15645243-97-C"],
          "start_date": "10/26/21",
          "line_num": "10",
          "po_date": "10/26/21",
          "po_stop_date": "11/26/21",
          "unit_price": "$3.45",
          "part_limit": "2800",
          "line_amount": "$43934.00",
          "part_completed": "2800",
          "part_remaining": "0",
          "remaining": "0.00",
          "line_sum": 3,
        },
        {
          id: "sdj02219301jdk",
          status: "AVTIVATE",
          "po_num": "490032832189",
          "sort_num": "102407",
          "part_num": ["15645243-97-B", "15645243-97-C"],
          "start_date": "10/26/21",
          "line_num": "30",
          "po_date": "11/26/21",
          "po_stop_date": "12/26/21",
          "unit_price": "$3.45",
          "part_limit": "232100",
          "line_amount": "$433213934.00",
          "part_completed": "2800",
          "part_remaining": "0",
          "remaining": "0.00",
        },
        {
          id: "sd00jks31mkk",
          status: "AVTIVATE",
          "po_num": "490032832189",
          "sort_num": "102407",
          "part_num": ["15645243-97-B", "15645243-97-C"],
          "start_date": "10/26/21",
          "line_num": "40",
          "po_date": "12/26/21",
          "po_stop_date": "01/26/22",
          "unit_price": "$3.45",
          "part_limit": "98300",
          "line_amount": "$43932134.00",
          "part_completed": "2800",
          "part_remaining": "100",
          "remaining": "31.40",
        },
      ],
      detailModalVisible: false,
    }
  },
  methods: {
    handleModalOpen(record) {
      this.detailModalVisible = true;
    },
    handleModalClose() {
      this.detailModalVisible = false;
    }
  },
  mounted() {}
}
</script>

<style scoped>
.table-wrapper {
  padding: 15px 10px;
}
.text-bold {
  font-weight: 500;
}
.line-header-style {
  background-color: #ff7d00;
}
</style>