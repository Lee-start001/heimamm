<template>
  <div>
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱" prop="email">
          <el-input class="normal" v-model="formInline.email"></el-input>
        </el-form-item>

        <!-- 下拉框 -->
        <el-form-item label="角色" prop="role_id">
          <el-select class="normal" v-model="formInline.role_id" placeholder="请选择状态">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="showAdd">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!--  表格 -->
    <el-card class="box-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>

        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row.id)"
            >{{(scope.row.status===1) ? "禁用":"启用"}}</el-button>
            <el-button type="text" @click="userDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--  分页 -->
      <el-pagination
        class="page"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5,10,20,30]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!--  对话框 -->
    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
//   导入组件
import userDialog from "./components/userDialog.vue";
//  导入
//import { subjectList, getStatus, subjectRemove } from "@/api/object.js";
import { userList, userStatus, userRemove } from "@/api/user.js";

// //导包

//import dialog from "./components/dialog.vue";

export default {
  components: {
    userDialog
    //dialog,
  },
  data() {
    return {
      //  创建一个变量 保存当前点击的项的内容
      olditem: "",
      //  表格数据
      tableData: [],
      //  总评论数
      total: 0,
      // 分页的当前页
      page: 1,
      // 页容量
      size: 5,
      // 表单绑定的元素
      formInline: {}
    };
  },
  methods: {
    //  显示对话框
    showAdd() {
      this.$refs.userDialog.dialogFormVisible = true;
      // 还要把表单内容清空
      this.$refs.userDialog.form = {};
    },
    //  添加删除事件
    userDel(item) {
        userRemove(item.id).then(res => {
          //console.log(res);
          if (res.data.code == 200) {
            this.$message.success("删除成功");
            //  判断删除的是不是当前页的最后一条 如果是 page--
            if (this.tableData.length == 1) {
              this.page--;
            }
            //  如果只有一页  最后一条也被删了 让当前页面为1
            if (this.page == 0) {
              this.page = 1;
            }
            //  刷新当前页面
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
    },

    // // 添加编辑事件
    showEdit(item) {
      //  点击按钮弹出编辑框
      this.$refs.userDialog.dialogFormVisible = true;
      // 把 isAdd的值改为false 弹出为 编辑框
      this.$refs.userDialog.isAdd = false;
      if (item != this.olditem) {
        //  把当前点击的项的内容赋值给组件的from
        this.$refs.userDialog.form = { ...item };
        //  并且把当前项的内容给olditem 以判断是否是第二次点击
        this.olditem = item;
      }
    },

    // //  增加清除点击事件
    clearSearch() {
      //  清除表单内容
      this.$refs.formInline.resetFields();
      //默认回到第一页
      this.page = 1;
      this.getList();
    },

    // //  搜索点击事件
    getSearch() {
      //console.log(this.formInline);
      this.getList();
    },

    // // 改变按钮现状
    changeStatus(id) {
      //   //alert(id);
      //   //  发送请求
      userStatus(id).then(() => {
        //  再次调用获取列表数据  刷新页面
        this.getList();
      });
    },

    handleSizeChange(size) {
      //   //  把当前点击的页面赋值给形参

      this.size = size;
      this.page = 1;
      this.getList();
    },

    // //  切换页容量
    handleCurrentChange(page) {
      this.page = page;
      this.getList();
    },

    // //  封装一个函数
    getList() {
      userList({
        page: this.page,
        // 你设置的页容量是多少，我就查出多少
        limit: this.size,

        //rid:this.formInline.rid,
        // name: this.formInline.name,
        // username: this.formInline.username,
        // status: this.formInline.status
        ...this.formInline
      }).then(res => {
        console.log(res);
        // 设置表格数据源
        this.tableData = res.data.data.items;
        // // 设置数据总量
        this.total = res.data.data.pagination.total;
      });
    }
  },

  created() {
    //获取列表数据 调用函数
    this.getList();
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 100px;
}
.normal {
  width: 149px;
}

/*  分页 */
.page {
  text-align: center;
  margin-top: 30px;
}
</style>