<template>
  <div>
    <el-dialog fullscreen title="新增题库测试" :visible.sync="dialogFormVisible" class="questionAdd">
      <el-form :model="form">
        <el-form-item label="学科" :label-width="formLabelWidth">
          <subjectList v-model="form.subject" />
        </el-form-item>

        <el-form-item label="阶段" :label-width="formLabelWidth">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业" :label-width="formLabelWidth">
          <businessList v-model="form.enterprise"></businessList>
        </el-form-item>

        <!--   级联 -->
        <el-form-item label="城市" :label-width="formLabelWidth">
          <cityArea v-model="form.city"></cityArea>
        </el-form-item>

        <el-form-item label="题型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio label="1">单选</el-radio>
            <el-radio label="2">多选</el-radio>
            <el-radio label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="难度" :label-width="formLabelWidth">
          <el-radio-group v-model="form.difficulty">
            <el-radio label="1">简单</el-radio>
            <el-radio label="2">一般</el-radio>
            <el-radio label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--   分割线 -->
        <el-form-item label-width="0px">
          <el-divider></el-divider>
        </el-form-item>

        <!-- 富文本  -->
        <el-form-item label="试题标题" :label-width="formLabelWidth">
          <!-- 我们封装的富文本 -->
          <myEditor v-model="form.title" />
        </el-form-item>

        <!--  选项 -->
        <!--  单选 -->
        <el-form-item v-if="form.type==1" label="单选" :label-width="formLabelWidth">
          <el-radio-group v-model="form.single_select_answer">
            <!--   导入组件 -->
            <optionitem
              v-for="(item, index) in form.select_options"
              :key="index"
              :label="item.label"
              :text.sync="item.text"
              :image.sync="item.image"
            />
          </el-radio-group>
        </el-form-item>
        <!-- 复选 -->
        <el-form-item v-else-if="form.type==2" label="多选" :label-width="formLabelWidth">
          <div>
            <el-checkbox-group v-model="form.multiple_select_answer">
              <optionitem
                :isRadio="false"
                v-for="(item,index) in form.select_options"
                :key="index"
                :label="item.label"
                :text.sync="item.text"
                :image.sync="item.image"
              />
            </el-checkbox-group>
          </div>
        </el-form-item>
        <!-- 文本域 -->

        <el-form-item v-else label="简答" :label-width="formLabelWidth">
          <el-input v-model="form.short_answer" type="textarea" :rows="2"></el-input>
        </el-form-item>

        <!--   分割线 -->
        <el-form-item label-width="0px">
          <el-divider></el-divider>
        </el-form-item>

        <!-- 视频文件上传 -->

        <el-form-item label="解析视频" :label-width="formLabelWidth">
          <videoUpload :video.sync="form.video" />
        </el-form-item>

        <!--   分割线 -->
        <el-form-item label-width="0px">
          <el-divider></el-divider>
        </el-form-item>

        <!-- 答案解析 -->
        <el-form-item label="答案解析" :label-width="formLabelWidth">
          <!-- 我们封装的富文本 -->
          <myEditor v-model="form.answer_analyze" />
        </el-form-item>

        <!--  试题备注 -->
        <el-form-item prop="remark" label="试题备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" type="textarea" :rows="2"></el-input>
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
//  导入组件
import cityArea from "./cityArea.vue";
//  导入富文本
import myEditor from "./myEditor.vue";

// 导入组件
import optionitem from "./optionitem.vue";
//  导入组件
import videoUpload from "./videoUpload.vue";

export default {
  components: {
    cityArea,
    myEditor,
    optionitem,
    videoUpload
  },
  data() {
    return {
      form: {
        // 上传视频url
        video: "",
        //  默认为1  单选
        type: "1",
        // 单选框答案
        single_select_answer: "",
        // 多选框答案  为数组格式
        multiple_select_answer: [],
        //  简答题
        short_answer: "",
        //  单选内容
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      //  预览图片
      imageUrl: "",

      formLabelWidth: "280px",
      // 对话框是否显示
      dialogFormVisible: false
    };
  },
  methods: {}
};
</script>

<style lang="less">
.questionAdd {
  .el-input {
    width: 364px;
  }

  .avatar-uploader {
    text-align: left;
  }
  .el-dialog__header {
    text-align: left;

    .el-dialog__title {
      color: white;
    }
  }
}
</style>