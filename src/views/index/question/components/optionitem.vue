<template>
  <div class="option_box">
    <el-radio v-if="isRadio" :label="label"></el-radio>
      <el-checkbox v-else :label="label"></el-checkbox>
    <el-input class="input" v-model="this.selfText" @input="onInput"></el-input>
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="this.imageUrl" :src="this.imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    text: String,
    image: String,
    isRadio: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      selfText: this.text,
      imageUrl: this.image,
      uploadUrl: process.env.VUE_APP_URL + "/question/upload"
    };
  },

  methods: {
    //  输入框改变事件
    onInput() {
      //把selfText传递给父组件就行了
      // console.log(this.selfText);
      this.$emit("upload:text", this.selfText);
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //res就是服务器响应内容 赋值给父组件就可以了（传值）
      this.$emit("update:image", res.data.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" ||"image/png"||"image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.option_box {
  display: flex;
  align-items: center;
  margin-top: 45px;

  .input {
    width: 476px;
    height: 40px;
    margin-right: 20px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>