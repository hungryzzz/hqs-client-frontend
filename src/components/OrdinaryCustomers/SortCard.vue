<!--
 * @Created on: 2022-10-17 20:08:58
 * @LastEditTime: 2022-11-05 15:50:49
 * @Author: fduxuan
 * 
 * @Desc:  
 * 
-->
<template>
  <div class="card-box">
    <a-space style="width: 100%;" direction="vertical" size="large">
      <a-row align="center" justify="space-between">
        <!---------------Sort number ------------->
        <a-col :span="4" align="start">
          <a-tag color="rgba(72, 16, 97, 70%)">SORT#&nbsp;&nbsp;{{ sortNum }}</a-tag>
        </a-col>
        
        <!---------------日期搜索 ------------->
        <a-col :span="20" :wrap="false">
          <a-row align="center" justify="end">
            <a-config-provider :locale="enUS">
              <a-range-picker
                size="small"
                style="width: 254px;"
                @select="onDateRangeSelect"
                :placeholder="['Start Date', 'End Date']"
                :disabledDate="disabledDate"
                @clear="onDateRangeClear"
                :timePickerProps="{hideDisabledOptions: true}"
              />
            </a-config-provider>
            
            &nbsp;&nbsp;
            <a-button size="small" type="primary" @click="handleSearchBtnClick">Search</a-button>&nbsp;&nbsp;&nbsp;
            <a-button size="small" type="primary" @click="onDateRangeClear">
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
            </a-button>&nbsp;&nbsp;&nbsp;
            <a-button size="small" type="primary" @click="handleInvoiceClick">
              <template #icon>
                <icon-list />
              </template>
              <template #default>Invoice</template>
            </a-button>
          </a-row>
          
        </a-col>
      </a-row>     


      <!---------------表格 ------------->
      <!-- <div style="height: calc(100vh - 217px)"> -->
      <div style="width: 100%; overflow-x: scroll;">
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

      <invoice-list 
        :visible="invoiceListVisible"
        @handleInvoiceListClose="handleInvoiceClick"
      />

    </a-space>
  </div>
</template>

<script>
import { DetailTableHeader, DetailSpanHeader } from '../../config/PoListHeader.js';
import { formatDate } from '../../utils.js';
import PoDetailService from '../../models/PoDetailService.js';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import InvoiceList from "./InvoiceList.vue";
import dayjs from "dayjs";

const DetailTableCellStyle = {
  "INSPECTION FULL OUT RATE": { backgroundColor: 'rgba(245, 226, 226, 0.8)', wordBreak: 'break-word' },
  "FULL OUT RATE INCLUDED REWORK": { backgroundColor: 'rgb(245, 226, 226)', wordBreak: 'break-word' },
  "TOTAL": { backgroundColor: 'rgb(253, 244, 211)' },
};

const getDefaultDateRange = () => (
  [...Array(7).keys()].map(index => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + index);
    return formatDate(date);
  }).filter(date => !dayjs(date, "YYYY-MM-DD").isBefore("2023-03-01", "YYYY-MM-DD"))
);


export default {
  name: "SortCard",
  props: {
    sortNum: {
      type: String,
      default() {
        return "100999";
      }
    }
  },
  components: {
    InvoiceList,
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
      detailData: [],
      dateRange: [],
      enUS,
      invoiceListVisible: false,
    }
  },
  computed:{
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
  methods: {
    async getDetailData() {
      // console.log(this.sortNum)
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
      if (dayjs(current).isBefore(dayjs("2023-03-01", "YYYY-MM-DD"))) {
        return true;
      }
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
    handleInvoiceClick() {
      this.invoiceListVisible = !this.invoiceListVisible;
    },
    
  },
  
  mounted() {
    // console.log(this.searchDate);
    this.getDetailData();
  },
  unmounted() {},
  watch: {
    searchDate: async function (value) {
      // console.log("searchdate", value);
      await this.getDetailData();
    },
  }
}
</script>

<style scoped>
/* .limit-modal-body {
  width: 100%;
  min-width: 760px;
  overflow-x: scroll;
  height: calc(100vh - 161px);

} */

.card-box {
  margin: 55px 3%;
  border: 0.5px solid #e5e6eb;
  border-radius: 6px;
  padding: 25px 20px 5px;
  box-shadow: 2px 2px 5px #e5e6eb;
}
</style>