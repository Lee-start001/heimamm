<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div class="text item">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="学科">
            <el-select v-model="formInline.subject" placeholder="请选择学科">
              <el-option
                v-for="(item, index) in subList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="阶段">
            <el-select v-model="formInline.step" placeholder="请选择阶段">
              <el-option label="初级" value="1"></el-option>
              <el-option label="中级" value="2"></el-option>
              <el-option label="高级" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="企业">
            <el-select v-model="formInline.enterprise" placeholder="请选择企业">
              <el-option
                v-for="(item, index) in busList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="题型">
            <el-select v-model="formInline.type" placeholder="请选择题型">
              <el-option label="单选" value="1"></el-option>
              <el-option label="多选" value="2"></el-option>
              <el-option label="简答题" value="3"></el-option>
            </el-select>
          </el-form-item>

   <br>

          <el-form-item label="难度">
            <el-select v-model="formInline.difficulty" placeholder="请选择难度">
              <el-option label="简单" value="1"></el-option>
              <el-option label="一般" value="2"></el-option>
              <el-option label="困难" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="作者">
            <el-input class="user_name" v-model="formInline.username"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="formInline.status" placeholder="请选择状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="日期" class="create_time">
            <el-date-picker v-model="formInline.create_date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        
<br>

          <el-form-item label="标题" style="width:388px" >
            <el-input style="width:388px" v-model="formInline.title" class="title_input"></el-input>
          </el-form-item>

          <el-form-item class="add_btn">
            <el-button type="primary">查询</el-button>
            <el-button>清除</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="$refs.questionAdd.dialogFormVisible=true">新增试题</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!--  下面表格 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="subject_name" label="学科.阶段">
          <template slot-scope="scope">{{scope.row |questionstep() }}</template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">单选</span>
            <span v-else-if="scope.row.type==2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>

        <el-table-column prop="enterprise_name" label="企业"></el-table-column>

        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{scope.status==1?"启用":"禁用"}}</template>
        </el-table-column>

        <el-table-column prop="reads" label="访问量"></el-table-column>

        <el-table-column prop="status" label="操作">
          <template>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">启用</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        background
        :current-page="page"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!--   对话框  -->
    <questionAdd ref="questionAdd"/>
  </div>
</template>

<script>
//  导入
import { questionList } from "@/api/question.js";
import { subjectList } from "@/api/object.js";
import { businessList } from "@/api/business.js";
import questionAdd from "./components/questionAdd.vue";

export default {
  components: {
    questionAdd
  },
  data() {
    return {
      //  企业列表
      busList: "",
      //  学科列表
      subList: "",
      //  日期
      value1: "",
      tableData: [],
      page: 1,
      size: 5,
      total: 0,
      formInline: {}
    };
  },
  created() {
    //  获取 学科数据 列表
    subjectList({}).then(res => {
      this.subList = res.data.data.items;
      //console.log(res);
      //console.log(res.data.data.items);
    });

    //  获取企业列表
    businessList({}).then(res => {
      //console.log(res);
      this.busList = res.data.data.items;
    });

    //  获取题目列表
    questionList({
      page: this.page,
      limit: this.size
    }).then(res => {
      //console.log(res);
      this.tableData = res.data.data.items;
      this.total = res.data.data.pagination.total;
    });
  },

  //  过滤器
  filters: {
    questionstep(val) {
      let step = "";
      if (val.step == 1) {
        step = "初级";
      } else if (val.step == 2) {
        step = "中级";
      } else {
        step = "高级";
      }

      return val.subject_name + "." + step;
    }
  }
};
</script>

<style lang="less">
.demo-form-inline{
.el-form-item:not(:last-child) .el-form-item__content {
    width: 150px;
  }
.el-pagination {
  margin-top: 31px;
  text-align: center;
}

 /* 找到标题那一栏里面的内容，设置他的内容为宽度388 */
  .el-form-item.title-item .el-form-item__content {
    width: 388px;
  }

  //  日期
.el-form-item .el-form-item__content .el-date-editor {
    width: 150px;
  }
  
  .add_btn{
    margin-left: 15px;
  }
}

</style>