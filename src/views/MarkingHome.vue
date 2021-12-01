<!--
   Created on 2021/11/18 3:34 下午

   @Author: fduxuan

   Desc: 标注主界面

 -->
<template>
  <a-row>
    <a-row style="margin-bottom: 15px" class="flex-text-left">
      <!---------------------------- 默认看未标注  ---------------------------->
<!--      <a-switch v-model="labeled">-->

<!--        <template #checked>已标注</template>-->
<!--        <template #unchecked>未标注</template>-->
<!--      </a-switch>-->


      <a-progress status="success"
                  :percent="progress.percent"
                  size="large"
                  style="width: 30%; ">
      </a-progress>
      <a-tag style="margin-left: 20px; border: 1px solid #000">{{progress.labeled}}/{{progress.labeled+progress.unlabeled}}</a-tag>

<!--      <a-button v-if="labeled" style="margin-left: auto; margin-right: 10px; border-color: #2c3e50 ">上一个</a-button>-->
      <a-button  style="border-color: #2c3e50;margin-left: auto; " @click="getFirstUnLabeled">下一个</a-button>
    </a-row>
    <Marking v-if="this.qid" :qid="qid"></Marking>
    <a-empty v-else description="全部标注完毕" />

  </a-row>

</template>

<script>
import Marking from "../components/wikiqa/Marking.vue";
import QuestionService from "../models/QuestionService";
export default {
  name: "MarkingHome",
  components: {Marking},
  data() {
    return {
      labeled: false, // 默认只看未标注的,
      qid: undefined,
      progress: {
        labeled: 0,
        unlabeled: 0,
        percent: 0
      }
    }
  },
  props: {

  },

  methods: {
    /* 进入页面时，获取未标注和已标注的count */
    async getProgress(){
      this.progress = await QuestionService.progress()
    },

    /* 自动获得第一个要标注的 */
    async getFirstUnLabeled(){
      await this.getProgress()
      let data = await QuestionService.find(
          {
            filter: {'label': false},
            limit: 1
          },
      )
      data = data['results']

      if(data.length===1){
        this.qid = data[0]['id']
      }
    }
  },

  async mounted() {

    await this.getFirstUnLabeled()
  },
}
</script>

<style scoped>
>>>.arco-switch{
  background: #6189b3;
  font-weight: bold;
}
</style>
