<template>
  <el-container class="container">
    <el-header class="my_header">
      <!-- 左边盒子 -->
      <div class="left">
        <i
          @click="isCollapse = !isCollapse"
          :class="isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold'"
        ></i>
        <img src="./images/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 右边盒子 -->
      <div class="right">
        <!-- 行内访问vuex无需在前面加this. -->
        <img :src="$store.state.avatar" alt />
        <span class="name">{{$store.state.username}}</span>

        <el-button type="primary" size="mini" @click="getout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="my_aside">
        <el-menu router default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/index/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/index/object">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my_main">
        <!--  子路由的路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//  导入
import { logout } from "@/api/index.js";
//  导入token
import { removetoken, gettoken } from "../../utilis/token.js";

export default {
  data() {
    return {
      // 用户名
      username: "",
      // 用户头像
      avatar: "",
      //  是否折叠变量
      isCollapse: false
    };
  },
  created() {
    // 获取登录用户的信息
    // info().then(res => {
    //   // console.log(res);
    //   this.username = res.data.data.username;
    //   // 记得在前面还要拼接基地址，因为返回的头像路径不完整，要拼接
    //   // 还要拼接/，不然就连在一起了
    //   this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    // });
  },

  beforeCreate() {
    if (gettoken() == null) {
      this.$message.error("请先登录");
      this.$router.push("/");
    }
  },
  // 方法
  methods: {
    getout() {
      this.$confirm("是否继续退出?", "是否退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发请求
          logout().then(() => {
            this.$message.success("退出成功！");
            //  删除本地token值
            removetoken();

            //  删除vuex 的数据
            this.$store.commit("changeUsername", "");
            this.$store.commit("changeAvatar", "");
            // 跳转到登录页面

            this.$router.push("/");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less">
.container {
  height: 100%;

  .my_header {
    // background-color: pink;
    height: 60px;
    display: flex;
    justify-content: space-between;

    //  左侧盒子
    .left {
      height: 100%;
      display: flex;
      align-items: center;

      i {
        font-size: 24px;
        margin-right: 22px;
      }

      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }

      span {
        font-size: 22px;
        color: #49a1ff;
      }
    }

    //  右侧盒子
    .right {
      display: flex;
      align-items: center;

      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }

      .name {
        font-size: 14px;
        color: #636363;
        margin-right: 28px;
      }
    }
  }

  .my_main {
    background-color: #E8E9EC;
  }

  //侧边导航栏的伸缩效果优化
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>