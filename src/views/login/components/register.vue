<template>
  <el-dialog center title="用户注册" :visible.sync="dialogFormVisible" width="603px">
    <el-form :model="form" :rules="rules" ref="regForm">
      <!--  文件上传 -->
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" prop="picCode" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.picCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="res_code" :src="picUrl" alt @click="getNewcode" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button :disabled="sec!=0" @click="getPhoneCode">{{sec!==0?this.sec+'秒':'获取用户验证码'}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="checkAll">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script>
//  导入
//import axios from "axios";
//  导入封装好的方法
import { getMsg, register } from "@/api/reg.js";

export default {
  data() {
    return {
      //  上传后  头像图片的路径
      imageUrl: "",

      //  头像图片上传的本地接口
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      // 图形验证码的 接口
      picUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 注册页面是否可见

      dialogFormVisible: false,

      formLabelWidth: "65px",

      //  设置一个more的时间 sec 为0

      sec: 0,
      form: {
        // 头像
        avatar: "",
        // 用户名
        name: "",
        // 邮箱
        email: "",
        // 手机号
        phone: "",
        //密码
        password: "",
        // 图片验证码
        picCode: "",
        // 手机验证码
        rcode: ""
      },

      //  校验规则
      rules: {
        //  头像 校验规则
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "请输入正确邮箱",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "请输入正确手机号码",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            required: true,
            min: 5,
            max: 12,
            message: "长度在 5到 12 个字符",
            trigger: "change"
          }
        ],
        picCode: [{ required: true, message: "请输入图形码", trigger: "blur" }],
        rcode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },

  //  方法
  methods: {
    //  校验所有元素

    checkAll() {
      this.$refs.regForm.validate(v => {
        if (v) {
          register({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("注册成功");
              // 关闭 注册窗口
              this.dialogFormVisible = false;
              //  清空主页页面内容
              this.$refs.regForm.resetFields();
              // 因为图片不属于表单内容 需手动清空
               this.imageUrl='',
              //  注册成功后 跳转至页面
              this.$router.push('/index')
            } else{
               this.$message.error(res.data.message);
            }
          });
        } 
      });
    },

    // 上传成功调用的钩子
    // res就是响应报文
    // file就是文件信息
    handleAvatarSuccess(res, file) {
      //console.log(res);
      //console.log(file);

      this.imageUrl = URL.createObjectURL(file.raw);

      //  上传的时候给avatar赋值
      this.form.avatar = res.data.file_path;
      //    单独对头像进行校验
      this.$refs.regForm.validateField("avatar");
    },

    // 上传之前调用的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //   获取新的图片验证码
    getNewcode() {
      //   点击图片时  重新再次访问地址  因为有浏览器缓存机制   所以在后面加上一个时间
      //  方法1  随机数
      // this.picUrl =
      //   process.env.VUE_APP_URL + "/captcha?type=sendsms" + Math.random();

      //  方法2  时间戳  (常用)
      this.picUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&sb=" + Date.now();
    },

    // 获取手机验证码
    getPhoneCode() {
      //  console.log(this.form.phone)

      // 在前端判输入的手机号格式是否正确
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        return this.$message.error("手机号码格式不正确");
      }

      //  判断验证码是否正确   为了减少服务器压力
      if (this.form.picCode.length != 4) {
        return this.$message.error("验证码格式不正确");
      }

      //  点击获取按钮时 设置时间为60s
      this.sec = 60;

      // 设置一个计时器
      let timeId = setInterval(() => {
        this.sec--;

        //  如果时间到0  在关闭计时器
        if (this.sec == 0) {
          (this.code_btn = false), clearInterval(timeId);
        }
      }, 1000);

      //  点击的时候   发送 axios请求
      // axios({
      //   url: process.env.VUE_APP_URL + "/sendsms",
      //   method: "post",
      //   data: {
      //     code: this.form.piccode,
      //     phone: this.form.phone
      //   },
      //   // 允许携带cookie
      //   withCredentials: true
      // })
      getMsg({
        code: this.form.picCode,
        phone: this.form.phone
      }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          // 获取验证码成功
          // alert('获取验证码成功，验证码为' + res.data.data.captcha)
          this.$message.success(
            "获取验证码成功，验证码为" + res.data.data.captcha
          );
        } else {
          // alert(res.data.message)
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style>
.el-dialog__header {
  background: linear-gradient(
    225deg,
    rgba(2, 198, 252, 1),
    rgba(22, 148, 253, 1)
  );
}
.res_code {
  width: 100%;
  vertical-align: top;
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
.avatar-uploader {
  text-align: center;
}
</style>
