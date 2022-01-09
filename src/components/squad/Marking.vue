<!--
   Created on 2021/11/18 1:25 下午

   @Author: fduxuan

   Desc:  标注页面

 -->
<template>
    <a-row v-if="this.question">
      <!---------------------------- 问题基本信息  ---------------------------->
      <a-card style="width: 100%; margin-bottom: 30px">
        <template #title>
          <a-row >
            <a-tag :color="tags[question.tag].color">{{ tags[question.tag].value }}</a-tag>
            <a-tag style="margin-left: 20px" :color="question.label ? 'green' : 'gray'">{{ question.label ? '已标注' : '未标注'}}</a-tag>

          </a-row>
        </template>
        <template #extra>
          <a-tag color="purple">{{question.id}}</a-tag>
        </template>
        <!---------------------------- 问题本身  ---------------------------->
        <span style="font-weight: bold; font-size: 120%">
          {{question.question}}
          <icon-copy style="cursor: pointer"
                     @click="copy(question.question)"
          />
        </span>


        <p style="font-weight: bold; font-size: 120%; color: grey">Context</p>
        <p style="color: grey;text-align: left" v-html="question.context"></p>
        点击复制context <icon-copy style="cursor: pointer"
                   @click="copy(question.context)"
        />
        <a-row style="margin-top: 20px;" class="flex-text-left" >

          标注后:  <span style="color: red; ">{{question.question_labeled}}</span>

        </a-row>
      </a-card>

      <!---------------------------- 开始标注  ---------------------------->
      <a-row style="margin-bottom: 20px" class="flex-text-left">
        <a-button type="primary" style="background: #3f84b1; margin-left: auto" @click="save"> 提交 </a-button>
      </a-row>

      <div class="flex-row">
        <!---------------------------- 选择框  ---------------------------->
        <a-card title="Extraction" style="width: 100%">
          <template #extra>
            <icon-delete @click="marking_data.keywords =[]" />
          </template>
          <a-checkbox-group v-model="marking_data.keywords" style="text-align: left;">
            <a-checkbox
                v-for="(item, index) in question.splits"
                :value="index"
                :key="'split_'+item"
                style="font-size: 16px"
            >
              {{ item }}
            </a-checkbox>

          </a-checkbox-group>
        </a-card>
      </div>


    </a-row>

</template>

<script>
import QuestionService from "../../models/QuestionService";

export default {
    name: "Marking",
    components:{

    },
    data(){
        return{
          question_id: undefined,
          question: undefined,
          tags: {
            train: {color: 'orange', value: '训练集'},
            test: {color: 'cyan', value: '测试集'},
            dev: {color: 'arcoblue', value: '验证集'},
          },

          possible_addition_words: ['reason', 'time', 'person','mechanism', 'feature',
            'location', 'way', 'process', 'history', 'result', 'property', 'definition', 'no'],
          possible_doubt: ['why', 'what', 'who',  'where', 'when', 'which', 'how much', 'how many', 'how', 'whose'],

          // 标注的值
          marking_data: {
            keywords: [],
            addition: [],
            doubt: ''
          }
        }
    },
    props: {
      qid:{
        type: String,
        default(){
          return 'Q0'
        }
      }
    },

    methods:{
      /* 获得当前question */
      async show(){
        this.question = await QuestionService.show(this.question_id)
      },

      /* 提交标注 */
      async save(){
        if(this.marking_data.keywords.length === 0){this.$message.warning('请抽取关键词')}
        else{
          await QuestionService.save(
              this.question_id,
              this.marking_data.keywords,
          )
          this.$message.success('成功提交！')
          this.marking_data = {
            keywords: [],
          }
        }

        this.question = await QuestionService.show(this.question_id)

      },

      copy(message){
        this.$copyText(message).then(e=>{
          this.$message.success('复制成功')
        }, e=>{
          this.$message.error('复制失败')
        })
      }

    },

    async mounted(){
      this.question_id = this.qid
      await this.show()
    },

  watch:{
      async qid(newValue){
        this.question_id = newValue
        await this.show()
      }
  }
}
</script>

<style scoped>
:deep(.arco-card-body){
  /*text-align: left;*/
  font-weight: bold;
}

:deep(.arco-tag){
  font-size: 14px
}

</style>
