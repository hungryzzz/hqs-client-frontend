<!--
   Created on 2021/11/16 5:18 下午

   @Author: fduxuan

   Desc:  展示display

 -->
<template>
    <a-row justify="center">

      <!---------------------------- 搜索  ---------------------------->
      <a-row class="flex-text-left" style="margin-bottom: 20px">
        <a-radio-group style="margin-right: 50px" type="button" v-model="mode" @change="getQuestions">
          <a-radio value="all">全部</a-radio>
          <a-radio value="labeled">已标注</a-radio>
          <a-radio value="unlabeled">未标注</a-radio>
        </a-radio-group>
        <span style="font-weight: bold; color: red; margin-right: 10px"> !! 选择标注范围 !! </span>
        <a-select style="width: 150px" placeholder="选择标注范围" @change="setRange" v-model="range">
          <a-option>1-1000</a-option>
          <a-option>1001-2000</a-option>
          <a-option>2001-3000</a-option>
          <a-option>3001-4000</a-option>
          <a-option>4001-5000</a-option>
          <a-option>5001-6000</a-option>
        </a-select>

        <a-button type="outline" style="margin-left: auto; margin-right: 10px" @click="$router.push({ path:'/labeling'}).catch(e=>{console.log(e)})"> 开始标注 </a-button>
        <a-tooltip content="下载已标注数据">
          <a-button  type="outline" status="danger">
            <a href="/api/marking/download" download="ARLQA.json"><icon-cloud-download slot="icon"/> 下载</a>
          </a-button>
        </a-tooltip>
      </a-row>


      <a-list style="width: 100%; margin-bottom: 40px" >
        <a-list-item v-for="(item, index) in data" :key="index" >
          <a-row class="flex-text-left">
            <!---------------------------- 问题id  ---------------------------->
            <a-tag style="text-align: left;" color="purple">{{item.id}}</a-tag>
            <!---------------------------- 问题本身  ---------------------------->
            <span style="margin-left: 20px; font-weight: bold">{{ item.question }}</span>
            <!---------------------------- train/dev/test  ---------------------------->
            <a-tag style="margin-left: auto" :color="tags[item.tag].color">{{ tags[item.tag].value }}</a-tag>
            <!---------------------------- 是否标注  ---------------------------->
            <a-tag style="margin-left: 20px; margin-right: 20px;" :color="item.label ? 'green' : 'gray'">{{ item.label ? '已标注' : '未标注'}}</a-tag>
            <icon-exclamation-polygon-fill style="font-size: 25px; color: #5c6370; cursor: pointer" @click="openCard(item)"/>
          </a-row>
        </a-list-item>
      </a-list>

      <a-pagination :curent="current_page" :page-size="page_size" :total="total_count" show-page-size show-total
                    @page-size-change="changePageSize" @change="changePage"
      />


      <a-modal :footer="false" :visible="visible"  @cancel="visible=false" style="width: 100%; height: 100%" class="whole-drawer">
        <Marking v-if="visible" :qid="current_question_id"></Marking>
      </a-modal>
    </a-row>

</template>

<script>

import QuestionService from "../../models/QuestionService";
import Marking from "../../components/squad/Marking.vue";

export default {
    name: "Display",
    components:{
      Marking

    },
    data(){
        return{
          visible: false,
          mode: 'all',
          current_page: 1,
          page_size: 10,
          total_count: 0,
          current_question_id: "",
          data: [],
          range: '1-1000',
          tags: {
            train: {color: 'arcoblue', value: '训练集'},
            test: {color: 'cyan', value: '测试集'},
            dev: {color: 'orange', value: '验证集'},
          },


        }
    },
    props: {

    },

    methods:{
      /* 改变每页条目数 */
      async changePageSize(page_size){
        this.page_size = page_size
        this.current_page = 1
        await this.getQuestions()
      },

      /* 获取问题 */
      async getQuestions(){
        let filter = {}

        filter = {'range': this.range}
        if(this.mode==='labeled'){filter['label'] = true}
        else if(this.mode==='unlabeled'){ filter['label'] = false}
        console.log(filter)

        let data = await QuestionService.find({
          filter: filter,
          skip: (this.current_page-1)*this.page_size,
          limit: this.page_size
        })
        this.total_count = data['count']
        this.data = data['results']
      },

      /* 翻页 */
      async changePage(page){
        this.current_page = page
        await this.getQuestions()
      },

      /* 打开问题card */
      openCard(question){
        this.current_question_id = question.id
        this.visible = true
      },

      async setRange(){
        console.log(this.range)
        localStorage.setItem('range', this.range)
        await this.getQuestions()
      }
    },

    async mounted(){
      let range = localStorage.getItem('range')
      if (range==null){range='1-1000'}
      this.range=range
      await this.getQuestions()
    },
}
</script>

<style scoped>
>>>.arco-modal{
  width: 100% !important;
  height: 100% !important
}

</style>
