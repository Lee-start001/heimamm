<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过2mb</div>
    </el-upload>
    <video :src="videoUrl" controls></video>
  </div>
</template>

<script>
export default {
  props:['video'],
  data() {
    return {
      //  存放视频地址
      videoUrl: "",
      //  视频上传的地址
      uploadUrl: process.env.VUE_APP_URL + "/question/upload"
    };
  },
  methods: {
    //  文件上传
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      //  传给父组件
      this.$emit('updata:video',res.data.url)

    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传文件只能是mp4格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
</style>