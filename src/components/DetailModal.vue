<!--
 * @Created on: 2022-09-19 00:56:53
 * @@LastEditTime: 2022-09-28 12:02:27
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
    <a-space direction="vertical" size="large" style="width: 100%">
      <a-row justify="space-between" align="center">
        <a-col :span="4">
          <a-tag size="large" color="rgba(72, 16, 97, 70%)">T-SORT#&nbsp;&nbsp;{{ sortNum }}</a-tag>
        </a-col>
        
        <a-col :span="12">
          <a-row align="center" justify="end">
            <a-range-picker
              style="width: 254px;"
              @select="onDateRangeSelect"
              :placeholder="['Start Date', 'End Date']"
              :disabledDate="disabledDate"
              @clear="onDateRangeClear"
            />
            &nbsp;&nbsp;
            <a-button type="primary" @click="handleSearchBtnClick">Search</a-button>&nbsp;&nbsp;&nbsp;
            <!--<a-button type="primary">
              <template #icon>
                <IconDownload />
              </template>
              <template #default>Export Report</template>
            </a-button>-->
          </a-row>
          
        </a-col>

        
      </a-row>
      
      <a-table
        :columns="columns" 
        :data="detailData" 
        :span-method="dataSpanMethod" 
        :bordered="{wrapper: true, cell: true}"
        column-resizable
        :pagination="false"
        :hoverable="false"
        :table-layout-fixed="true">
        <template #part_num="{ record, rowIndex }">
          <a-tag>{{ record.part_num }}</a-tag>
        </template>
      </a-table>
    </a-space>
  </a-modal>
</template>

<script>

import { DetailTableHeader, DetailSpanHeader } from '../config/PoListHeader.js';
import { formatDate } from '../utils.js';
import PoDetailService from '../models/PoDetailService.js';

const DetailTableCellStyle = {
  "Fall Out Rate": { backgroundColor: 'rgb(245, 226, 226)' },
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
  components:{

  },
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
          rowspan: 6,
          colspan: 1,
        }
      }
    };
    
    return {
      dataSpanMethod,
    }
  },
  data() {
    return {
      searchDate: getDefaultDateRange(),
      // columns,
      detailData: [],
      dateRange: [],
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
            bodyCellStyle: (record) => DetailTableCellStyle[record.items],
          }
        } else {
          column = {
            ...column,
            children: this.searchDate.map(d => ({ 
              title: d.split("-").slice(1).join("/"), 
              dataIndex: d, 
              width: 110, 
              align: "center", 
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
</style>