<template>
  <el-select v-model="subject" placeholder="请选择学科" @change="selChange">
    <el-option v-for="(item, index) in subList" :key="index" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
//  导包
import { subjectList } from "@/api/object.js";
export default {

    //   父传子
    props:{
        value:{
            default:""
        }
    },
  data() {
    return {
subject:this.value,
      subList: []
    };
  },
  //子传父 

  methods:{
      //  下拉框的值改变事件
      selChange(){
          // 子组件以参数的形式传递给父组件信息
         this.$emit('input',this.subList)
      }
  },
  created() {
    //  获取 学科数据 列表
    subjectList({}).then(res => {
      this.subList = res.data.data.items;
      //console.log(res);
      //console.log(res.data.data.items);
    });
  }
};
</script>
<style>
</style>