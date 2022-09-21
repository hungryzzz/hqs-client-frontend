<!--
 * @Created on: 2022-09-19 00:56:53
 * @@LastEditTime: 2022-09-22 01:24:08
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
      <a-row>
        <a-range-picker
          style="width: 254px; marginBottom: 20px;"
        />
        &nbsp;&nbsp;
        <a-button type="primary">Search</a-button>&nbsp;&nbsp;
        <a-button type="primary">
          <template #icon>
            <IconDownload />
          </template>
          <template #default>Export Report</template>
        </a-button>
      </a-row>
      
      <a-table
        :columns="columns" 
        :data="detailData" 
        :span-method="dataSpanMethod" 
        :bordered="{cell: true}"
        column-resizable
        :pagination="false"
        :table-layout-fixed="true">
      </a-table>
    </a-space>
  </a-modal>
</template>

<script>

import { DetailTableHeader, DetailSpanHeader } from '../config/PoListHeader.js';

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
  data(){
    const searchDate = ["09/05", "09/06", "09/07", "09/08", "09/09", "09/10", "09/11", "09/12", "09/13"];
    let columns = DetailTableHeader.map(co => {
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
        }
      } else {
        column = {
          ...column,
          children: searchDate.map(d => ({ title: d, dataIndex: d, width: 110, align: "center" })),
        }
      }
      return column;
    });
    console.log(columns);
    return {
      columns,
      detailData: [
        {
          t_sort_num: "101143",
          part_num: "15645243-97-B",
          start_date: "09-01",
          location: "Livermore",
          items: "OK",
          "09/05": 0,
          "09/06": 0,
          "09/07": 0,
          "09/08": 0,
          "09/09": 0,
          "09/10": 0,
          "09/11": 0,
          "09/12": 0,
          "09/13": 0,
          total: 0,
        },
        {
          t_sort_num: "101143",
          part_num: "15645243-97-B",
          start_date: "09-01",
          location: "Livermore",
          items: "NOK",
          "09/05": 0,
          "09/06": 0,
          "09/07": 0,
          "09/08": 0,
          "09/09": 0,
          "09/10": 0,
          "09/11": 0,
          "09/12": 0,
          "09/13": 0,
          total: 0,
        },
        {
          t_sort_num: "101143",
          part_num: "15645243-97-B",
          start_date: "09-01",
          location: "Livermore",
          items: "REWORK",
          "09/05": 0,
          "09/06": 0,
          "09/07": 0,
          "09/08": 0,
          "09/09": 0,
          "09/10": 0,
          "09/11": 0,
          "09/12": 0,
          "09/13": 0,
          total: 0,
        },
        {
          t_sort_num: "101143",
          part_num: "15645243-97-B",
          start_date: "09-01",
          location: "Livermore",
          items: "HOLD",
          "09/05": 0,
          "09/06": 0,
          "09/07": 0,
          "09/08": 0,
          "09/09": 0,
          "09/10": 0,
          "09/11": 0,
          "09/12": 0,
          "09/13": 0,
          total: 0,
        },
        {
          t_sort_num: "101143",
          part_num: "15645243-97-B",
          start_date: "09-01",
          location: "Livermore",
          items: "Fall Out Rate",
          "09/05": 0,
          "09/06": 0,
          "09/07": 0,
          "09/08": 0,
          "09/09": 0,
          "09/10": 0,
          "09/11": 0,
          "09/12": 0,
          "09/13": 0,
          total: 0,
        },
        {
          t_sort_num: "101143",
          part_num: "15645243-97-B",
          start_date: "09-01",
          location: "Livermore",
          items: "Total Inspected",
          "09/05": 0,
          "09/06": 0,
          "09/07": 0,
          "09/08": 0,
          "09/09": 0,
          "09/10": 0,
          "09/11": 0,
          "09/12": 0,
          "09/13": 0,
          total: 0,
        }
      ],
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