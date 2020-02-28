<template>
  <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
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
      <el-button type="primary" @click="sureAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectAdd } from "@/api/object.js";

export default {
  data() {
    return {
      // 控制对话框显示或隐藏的属性
      dialogFormVisible: false,
      // 跟表单绑定的对象
      form: {},
      formLabelWidth: "80px",
      rules: {
        rid: [
          {
            required: true,
            message: "学科编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "学科名称不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    //  增加添加学科事件
    sureAdd() {
      this.$refs.form.validate(v => {
        if (v) {
          subjectAdd(
            //  解构赋值 添加参数
            this.form
          ).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              //  提示新增成功
              this.$message.success("新增成功");
              // 关闭新增弹框
              this.dialogFormVisible = false;
              //  刷新数据
              this.$parent.getList();
            } else {
                // 提示错误信息
              this.$message.error(res.data.message);
            }
          });
        }
      });
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