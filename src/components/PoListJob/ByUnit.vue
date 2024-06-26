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
        :table-layout-fixed="true"
        :sticky-header="true">
        <template #status="{ record, rowIndex }">
          <a-tag :color="statusColorMap[record.status]">{{ record.status }}</a-tag>
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
          <a-tag v-if="record.remaining === 0" color="#f53f3f">0.00%</a-tag>
          <a-tag v-else-if="record.remaining < 0.85" color="#ffb400">{{ parseFloat(record.remaining*100).toFixed(2) }}%</a-tag>
          <a-tag v-else color="#00b42a">{{ parseFloat(record.remaining*100).toFixed(2) }}%</a-tag>
        </template>
        <template #unit_price="{ record, rowIndex }">
          <span class="text-bold">${{ record.unit_price }}</span>
        </template>
        <template #line_amount="{ record, rowIndex }">
          <span class="text-bold">${{ record.line_amount }}</span>
        </template>
        <template #billing="{ record, rowIndex }">
          <a-checkbox :model-value="Boolean(record.billing)"></a-checkbox>
        </template>
        <template #empty>
          <a-empty>
            <template #image>
              <icon-empty />
            </template>
            No data.
          </a-empty>
        </template>
      </a-table>
    </a-space>
    <DetailModal
      :visible="detailModalVisible"
      :sortNum="selectedPoDetailSortNum"
      @handleModalClose="handleModalClose" />
  </div>
</template>

<script>

import { PoListHeader, SpanHeader } from '../../config/PoListHeader.js';
import DetailModal from './DetailModal.vue';
import PoListService from '../../models/PoListService.js';

export default {
  name: "ByUnit",
  components: {
    DetailModal,
  },
  setup() {
    const dataSpanMethod = ({ record, column }) => {
      if (record["line_sum"] !== undefined && SpanHeader.indexOf(column.dataIndex) !== -1) {
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

    const statusColorMap = {
      ACTIVE: "#168cff",
      CLOSED: "#f53f3f",
      PENDING: "#86909c",
    };

    return {
      dataSpanMethod,
      columns,
      statusColorMap,
    }
  },
  data() {
    return {
      poList: [],
      detailModalVisible: false,
      selectedPoDetailSortNum: "",
    }
  },
  methods: {
    handleModalOpen(record) {
      this.detailModalVisible = true;
      this.selectedPoDetailSortNum = record.sort_num;
    },
    handleModalClose() {
      this.detailModalVisible = false;
    },
    async init() {
      const res = await PoListService.find();
      this.poList = res;
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>
.table-wrapper {
  /* padding: 15px 10px; */
}
.text-bold {
  font-weight: 500;
}
.line-header-style {
  background-color: #ff7d00;
}
</style>