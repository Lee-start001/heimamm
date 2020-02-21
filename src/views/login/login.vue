<template>
  <div class="login-wrap">
    <!--   登录 左侧盒子 -->
    <div class="box1">
      <div class="title-box">
        <img src="./images/login-icon9.png" alt />
        <span class="heima">黑马面面</span>
        <span class="line"></span>
        <span class="mian">登录页面</span>
      </div>
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入手机号" prefix-icon="el-icon-search"></el-input>
        </el-form-item>

        <el-form-item prop="psw">
          <el-input
            v-model="ruleForm.psw"
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="ruleForm.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="login-img" src="./images/login_code.png" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="checked">
          <el-checkbox v-model="ruleForm.checked" class="agree">
            <span>
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </span>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="login-btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 注册表单 -->
    <!-- 使用组件 -->
    <reg></reg>


    <!-- 右侧图片 -->
    <img src="./images/login_banner_ele.png" alt />
  </div>
</template>

<script>
//  导入组件
import reg from "./components/register.vue";
export default {
  //  注册组件
  components: {
    reg
  },
  data() {
    return {
      ruleForm: {
        name: "",
        psw: "",
        code: "",
        checked: ""
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        psw: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        checked: [
          // 多选框没有失去焦点，只有值改变事件
          // 因为checkbox其实他不可能值为空，除非你强行赋值为空
          // 所以我们不能拿值是否为空来做验证了
          // { required:true, message:'必须勾选同意用户协议',trigger:"change"},

          // 只有值为true才满足条件，否则代表不匹配
          {
            pattern: /true/,
            message: "必须勾选同意用户协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  // 登录盒子
  .box1 {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-top: 44px;
    padding-left: 43px;
    padding-right: 46px;
    box-sizing: border-box;

    // 给顶部题目一个盒子
    .title-box {
      display: flex;
      align-items: center;
      margin-bottom: 29px;

      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }

      .heima {
        font-size: 24px;
        margin-right: 16px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
      .mian {
        font-size: 22px;
        margin-left: 12px;
      }
    }
  }

  .agree {
    display: flex;
    align-items: center;
  }

  .login-img {
    width: 100%;
    height: 42px;
    vertical-align: top;
  }
  .login-btn {
    width: 100%;

    &:nth-child(2) {
      margin-left: 0px;
      margin-top: 26px;
    }
  }
  // 登录页图片
}
</style>