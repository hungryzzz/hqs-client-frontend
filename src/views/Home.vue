<!--
   Created on 2021/11/16 2:09 下午

   @Author: fduxuan

   Desc:  主页面

 -->

<template>
    <div style="padding-top: 30px">
      <a-card title="标注注意事项">
        <a-row justify="center" style="margin-bottom: 20px">
           将问句中的部分词删去，使得删去后的子句和原句具有一致的语义  ||

           一般删除句中的<mark>虚词, 助动词，冠词, 介词</mark>等等不重要的词语 || 但不一定，要自己判断
        </a-row>

        <div class="example">
          <span style="font-size: 110%; ">Example 1: 去除了疑问词以及冠词</span> <br><br>
          <span style="color: red">Q: What's the name of Tom's sister?</span> ------> <span style="color: green">T: Name of Tom's sister ?</span>
        </div>
        <div class="example">
          <span style="font-size: 110%; ">Example 2: 去除了助动词以及动词(start)</span> <br><br>
          <span style="color: red">Q: When did Beyonce start becoming popular ?</span> ------> <span style="color: green">T: When Beyonce becoming popular ?</span>
        </div>
        <div class="example">
          <span style="font-size: 110%; ">Example 3: 更长的句子，去除部分修饰</span> <br><br>
          <span style="color: red">Q: Their third album, Survivor, sold how many during its first week?</span> ------> <span style="color: green">T: Album, Survivor, sold how many during first week?</span>
        </div>

        综上，如何判定比较主观，实现的目标：最大可能地删词，并保留原意

        <a-divider></a-divider>
        <p>1. 为避免冲突，在标注前选择对应的范围，everybody 不同</p>
        <p>2. 点击开始标注后，进入标注流程，当前标注未提交时无法点击下一个（无法返回上一个已标注的😶）</p>
        <p>3. 查看已标注的在主页，点击条目最右的info</p>
      </a-card>

      <br><br>
      <a-button type="primary" status="success" @click="$router.push({'path': '/start'})">💖💖💖 民工已了解，点击进入主页 💖💖💖</a-button>

      <br><br>
      <p style="color: #2a91ea">❥(^_-) 标注有情，友谊无价 ❥(^_-)</p>
    </div>

</template>

<script>
import Display from "../components/wikiqa/Display.vue";
export default {
    name: "Home",
    components:{
      Display

    },
    data(){
        return{}
    },
    props: {

    },

    methods:{

    },

    mounted(){

    },
}
</script>

<style scoped>
.example{
  font-weight: bold; border: 1px solid #d9dee5; padding: 1%; margin-bottom: 10px;
}
</style>
