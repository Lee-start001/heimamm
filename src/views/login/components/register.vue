<template>
  <el-dialog center title="用户注册" :visible.sync="dialogFormVisible" width="603px">
    <el-form :model="form" :rules="rules">
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

      <el-form-item label="图形码" prop="piccode" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.piccode" autocomplete="off"></el-input>
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
            <el-button
              :disabled="code_btn"
              @click="getPhoneCode"
            >{{(sec!=0)?this.sec+'秒':'获取用户验证码'}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script>
//  导入
import axios from "axios";
export default {
  data() {
    return {
      picUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      dialogFormVisible: false,
      //  设置一个more的时间 sec 为0
      code_btn: false,
      sec: 0,
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        piccode: "",
        rcode: ""
      },
      formLabelWidth: "65px",
      rules: {
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
        piccode: [{ required: true, message: "请输入图形码", trigger: "blur" }],
        rcode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },

  //  方法
  methods: {
    getNewcode() {
      //   点击图片时  重新再次访问地址  因为有浏览器缓存机制   所以在后面加上一个时间
      //  方法1  随机数
      // this.picUrl =
      //   process.env.VUE_APP_URL + "/captcha?type=sendsms" + Math.random();

      //  方法2  时间戳  (常用)
      this.picUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + Date.now();
    },
    getPhoneCode() {
      //  console.log(this.form.phone)
      // 点击的时候
      (this.code_btn = true),
        //  点击获取按钮时 设置时间为60s
        (this.sec = 60);

      // 设置一个计时器
      let timeId = setInterval(() => {
        this.sec--;

        //  如果时间到0  在关闭计时器
        if (this.sec == 0) {
          (this.code_btn = false), clearInterval(timeId);
        }
      }, 100);

      //  点击的时候   发送 axios请求
      axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: {
          code: "this.form.piccode",
          phone: "this.form.phone"
        },
        // 允许携带cookie
        withCredentials: true
      }).then(res => {
        window.console.log(res);
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
</style>
