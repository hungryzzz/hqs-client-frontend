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
        <p style="color: grey; text-align: left">{{question.answer}}
          <icon-copy style="cursor: pointer"
                     @click="copy(question.answer)"
          /></p>
        <a-row style="margin-top: 20px; justify-content: space-between" class="flex-text-left" >

          <!---------------------------- keywords  ---------------------------->
          <div style="width: 50%; ">
            <div style="margin-bottom: 10px">关键词</div>
            <a-tag v-for="item in question.keywords"  :key="'keywords_'+item.text"
                   color="#0fc6c2"
                   style="margin-right: 20px;"
            >
              <!---显示原型 ---->
              {{ item.lemma }}
            </a-tag>
          </div>
          <!---------------------------- 疑问词  ---------------------------->
          <div style="width: 25%" >
            <div style="margin-bottom: 10px">疑问词</div>
            <a-tag color="#ff7d00" style="margin-right: 20px" v-if="question.doubt">{{question.doubt}}</a-tag>
          </div>
          <!---------------------------- 附加词  ---------------------------->
          <div style="width: 25%" >
            <div style="margin-bottom: 10px">附加词</div>
            <a-tag v-for="item in question.addition"  :key="'addition_'+item"
                color="#b71de8" style="margin-right: 20px"
            >
              {{item}}
            </a-tag>
          </div>
        </a-row>
      </a-card>

      <!---------------------------- 开始标注  ---------------------------->
      <a-row style="margin-bottom: 20px" class="flex-text-left">
        <a-button type="primary" style="background: #3f84b1; margin-left: auto" @click="save"> 提交 </a-button>
      </a-row>

      <div class="flex-row">
        <!---------------------------- 选择框  ---------------------------->
        <a-card title="Extraction" style="width: 30%">
          <a-checkbox-group direction="vertical" v-model="marking_data.keywords" style="text-align: left;">
            <a-checkbox
                v-for="(item, index) in question.splits"
                :value="index"
                :key="'split_'+item.text"
                style="font-size: 16px"
            >
              {{ item.text }}
            </a-checkbox>

          </a-checkbox-group>
        </a-card>
        <!---------------------------- 附加词语  ---------------------------->
        <a-card title="Additional Words" style="width: 30%">
          <a-input-tag v-model="marking_data.addition"  placeholder="Please Enter or Choose" allow-clear/>
          <!---------------------------- 可能选择的附加词语  ---------------------------->
          <a-row style="margin-top: 20px">
            <a-tag color="green"
                   style="border: 1px solid darkgreen; color: darkgreen; font-size: 14px; cursor: pointer; margin: 0 10px 10px 10px"
                   @click="addAdditionWords(index)"
                   v-for="(item, index) in possible_addition_words"
                   :key="item"
            >
              {{item}}
            </a-tag>
          </a-row>
        </a-card>

        <!---------------------------- 疑问词  ---------------------------->
        <a-card title="Doubt" style="width: 30%; ">
          <a-input v-model="marking_data.doubt" placeholder="Please Enter or Choose" allow-clear></a-input>

          <!---------------------------- 可能选择的疑问词  ---------------------------->
          <a-row style="margin-top: 20px">
            <a-tag color="blue"
                   style="border: 1px solid #004a8b; color: #004a8b; font-size: 14px; cursor: pointer; margin: 0 10px 10px 10px"
                   @click="chooseDoubt(index)"
                   v-for="(item, index) in possible_doubt"
                   :key="item"
            >
              {{item}}
            </a-tag>
          </a-row>
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
            train: {color: 'arcoblue', value: '训练集'},
            test: {color: 'orange', value: '测试集'},
            dev: {color: 'cyan', value: '验证集'},
          },

          possible_addition_words: ['reason', 'time', 'person', 'location', 'way', 'process', 'history', 'result'],
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
      /* 增加附加词 */
      addAdditionWords(index){
        let words = this.possible_addition_words[index]
        this.marking_data.addition.push(words)
      },

      /* 选择疑问词 */
      chooseDoubt(index){
        let word = this.possible_doubt[index]
        this.marking_data.doubt = word
      },

      /* 获得当前question */
      async show(){
        this.question = await QuestionService.show(this.question_id)
      },

      /* 提交标注 */
      async save(){
        if(this.marking_data.keywords.length === 0){this.$message.warning('请抽取关键词')}
        else if (this.marking_data.addition.length===0){this.$message.warning('请填写补充关键词')}
        else if (this.marking_data.doubt === ''){this.$message.warning('请填写疑问词')}
        else{
          let keywords = []
          for(let index of this.marking_data.keywords){
            keywords.push(this.question.splits[index])
          }
          await QuestionService.save(
              this.question_id,
              keywords,
              this.marking_data.addition,
              this.marking_data.doubt
          )
          this.$message.success('成功提交！')
          this.marking_data = {
            keywords: [],
            addition: [],
            doubt: ''
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
