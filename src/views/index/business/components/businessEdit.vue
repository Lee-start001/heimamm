<template>
  <el-dialog title="学科编辑" :visible.sync="dialogFormVisible">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="eid" label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveBusiness" >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { businessEdit } from "@/api/business.js";

export default {
  data() {
    return {
      // 控制对话框显示或隐藏的属性
      dialogFormVisible: false,
      // 跟表单绑定的对象
      form: {},
      formLabelWidth: "80px",
      rules: {
        eid: [
          {
            required: true,
            message: "企业编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "企业名称不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
      // 添加保存点击事件
   saveBusiness(){
       businessEdit(this.form).then(res=>{
           //console.log(this.form)
           console.log(res)
           if(res.data.code==200){
               // 提示编辑成功
               this.$message.success('编辑成功');
               //  刷新数据
               this.$parent.getList()

           }else{
               this.$message.error(res.data.message);
           }
       })
   }
  }
};
</script>

<style>
.el-dialog__header {
  text-align: center;
}

.dialog-footer {
  text-align: center;
}
</style>