<template>
  <div>
    <el-dialog fullscreen title="收货地址" :visible.sync="dialogFormVisible" class="questionAdd">
      <el-form :model="form">

         <el-form-item label="学科" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="阶段" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <!--   级联 -->
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//  导入 级联
import { regionDataPlus } from "element-china-area-data";

export default {
  data() {
    return {
      //  级联
      value: [],
      options: regionDataPlus,
      formLabelWidth: "307px",
      form: "",
      dialogFormVisible: false
    };
  }
};
</script>

<style lang="less">
.questionAdd{
.el-input{
  width: 364px;
}
}

</style>