<template>
  <el-select v-model="business" placeholder="请选择企业" @change="selChange">
    <el-option v-for="(item, index) in busList" :key="index" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
import { businessList } from "@/api/business.js";
export default {
  //  父传子
  props: {
    value: {
      default: ""
    }
  },
  data() {
    return {
      business: this.value,
      busList: []
    };
  },
  //  下拉框改变事件
  methods: {
    selChange() {
      this.$emit("input", this.busList);
    }
  },

  created() {
    //  获取企业列表
    businessList({}).then(res => {
      //console.log(res);
      this.busList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>