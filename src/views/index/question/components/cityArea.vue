<template>
   <el-cascader v-model="value"
    :options="options"
     :props="{ expandTrigger: 'hover',value:'lable' }"
      @change="handleChange"
     ></el-cascader>
</template>

<script>
//  导入 级联
import { regionDataPlus } from "element-china-area-data";

export default {
    //  父传子
    props:{
        value:{
           default:''
        }
    },
  data() {
      return {
           //  级联
      city:this.value,
      options: regionDataPlus,
      }
  },
  methods:{
handleChange(){
    this.$emit('input',this.city)
}
  }
}
</script>

<style>

</style>