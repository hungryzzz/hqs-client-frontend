<!--
 * @Created on: 2022-09-19 00:56:53
 * @LastEditTime: 2022-10-08 09:56:17
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
    <a-space direction="vertical" size="large" class="limit-modal-body">
      <a-row justify="space-between" align="center">
        <a-col :span="4">
          <a-tag color="rgba(72, 16, 97, 70%)">T-SORT#&nbsp;&nbsp;{{ sortNum }}</a-tag>
        </a-col>
        
        <a-col :span="12">
          <a-row align="center" justify="end">
            <a-config-provider :locale="enUS">
              <a-range-picker
                v-model="dateRangeVal"
                size="small"
                style="width: 254px;"
                @select="onDateRangeSelect"
                :placeholder="['Start Date', 'End Date']"
                :disabledDate="disabledDate"
                @clear="onDateRangeClear"
              />
            </a-config-provider>
            
            &nbsp;&nbsp;
            <a-button size="small" type="primary" @click="handleSearchBtnClick">Search</a-button>&nbsp;&nbsp;&nbsp;
            <a-button size="small" type="primary" @click="handleClearBtnClick">
              <template #icon>
                <IconCloseCircle />
              </template>
              <!-- Use the default slot to avoid extra spaces -->
              <template #default>Clear</template>
            </a-button>&nbsp;&nbsp;&nbsp;
            <a-button size="small" type="primary" :href="`/api/sort/export?sort=${sortNum}&start_date=${searchDate[0]}&end_date=${searchDate[searchDate.length-1]}`">
              <template #icon>
                <IconDownload />
              </template>
              <template #default>Export Report</template>
            </a-button>
          </a-row>
          
        </a-col>
      </a-row>
      
      <div style="height: calc(100vh - 217px)">
        <a-table
          size="mini"
          :columns="columns" 
          :data="detailData" 
          :span-method="dataSpanMethod" 
          :bordered="{wrapper: true, cell: true}"
          column-resizable
          :pagination="false"
          :hoverable="false"
          :table-layout-fixed="true"
          :scroll="scrollPercent">
          <template #part_num="{ record, rowIndex }">
            <a-tag>{{ record.part_num }}</a-tag>
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
      </div>
      
    </a-space>
  </a-modal>
</template>

<script>

import { DetailTableHeader, DetailSpanHeader } from '../../config/PoListHeader.js';
import { formatDate } from '../../utils.js';
import PoDetailService from '../../models/PoDetailService.js';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';

const DetailTableCellStyle = {
  "INSPECTION FULL OUT RATE": { backgroundColor: 'rgba(245, 226, 226, 0.8)' },
  "FULL OUT RATE INCLUDED REWORK": { backgroundColor: 'rgb(245, 226, 226)' },
  "TOTAL": { backgroundColor: 'rgb(253, 244, 211)' },
};

const getDefaultDateRange = () => (
  [...Array(7).keys()].map(index => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + index);
    return formatDate(date);
  })
);

export default {
  name: "DetailModal",
  components:{},
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    sortNum: {
      type: String,
      default() {
        return "";
      }
    }
  },
  setup() {
    const dataSpanMethod = ({ record, column }) => {
      if (record.items === "OK" && DetailSpanHeader.indexOf(column.dataIndex) !== -1) {
        return {
          rowspan: 7,
          colspan: 1,
        }
      }
    };

    const scrollPercent = {
      y: "100%",
    };
    
    return {
      dataSpanMethod,
      scrollPercent,
    }
  },
  data() {
    return {
      searchDate: getDefaultDateRange(),
      // columns,
      dateRangeVal: [],
      detailData: [],
      dateRange: [],
      enUS,
    }
  },
  computed: {
    columns: function () {
      return DetailTableHeader.map(co => {
        let column = {
          title: co[0], 
          dataIndex: co[1].toLowerCase(), 
        };
        if (co[0] !== "Date") {
          column = {
            ...column,
            slotName: co[1].toLowerCase(),
            width: co[2],
            fixed: co[3],
            align: "center",
            // cellStyle: { fontSize: '12px' },
            bodyCellStyle: (record) => DetailTableCellStyle[record.items],
          }
        } else {
          column = {
            ...column,
            children: this.searchDate.map(d => ({ 
              title: d.split("-").slice(1).join("/"), 
              dataIndex: d, 
              width: 70, 
              align: "center", 
              // cellStyle: { fontSize: '12px' },
              bodyCellStyle: (record) => DetailTableCellStyle[record.items],
            })),
          }
        }
        return column;
      });
    }
  },
  watch: {
    sortNum: async function (value) {
      if (value.length <= 0) {
        return [];
      }
      await this.getDetailData();
    },
    searchDate: async function (value) {
      await this.getDetailData();
    },
  },
  methods:{
    async getDetailData() {
      const res = await PoDetailService.find(this.sortNum, this.searchDate[0], this.searchDate[this.searchDate.length-1]);
      // console.log("data", Object.values(res).flat());
      this.detailData = Object.values(res).flat();
    },
    handleModalClose () {
      this.$emit("handleModalClose");
      this.onDateRangeClear();
    },
    onDateRangeSelect (valueString, value) {
      this.dateRange = value;
    },
    disabledDate(current) {
      const dates = this.dateRange;
      if (dates && dates.length) {
        const tooLate = dates[0] && Math.abs((new Date(current) - dates[0]) / (24 * 60 * 60 * 1000)) > 30;
        const tooEarly = dates[1] && Math.abs((new Date(current) - dates[1]) / (24 * 60 * 60 * 1000)) > 30;
        return tooEarly || tooLate;
      }
      return false;
    },
    handleSearchBtnClick() {
      const dateRangeLen = Math.abs((this.dateRange[1] - this.dateRange[0]) / (24 * 60 * 60 * 1000)) + 1;
      this.searchDate = [...Array(dateRangeLen).keys()].map(index => {
        const date = new Date(this.dateRange[0]);
        date.setDate(date.getDate() + index);
        return formatDate(date);
      });
    },
    onDateRangeClear() {
      this.dateRange = [];
      this.searchDate = getDefaultDateRange();
    },
    handleClearBtnClick() {
      this.dateRangeVal = [];
      this.onDateRangeClear();
    }
  },

  mounted() {},
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
.limit-modal-body {
  width: 100%;
  min-width: 760px;
  overflow-x: scroll;
  height: calc(100vh - 161px);
}
.small-font {
  font-size: 12px;
}
</style>