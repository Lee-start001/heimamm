
//  导入组内data index
import user from '../views/index/user/user.vue'
import chart from '../views/index/chart/chart.vue'
import business from '../views/index/business/business.vue'
import question from '../views/index/question/question.vue'
import object from '../views/index/object/object.vue'


//暴露出去
export default [

    // 子路由一般不加/
    {
      path: "user", component: user,
      meta: {
        title: "用户列表",
        roles: ['超级管理员', '管理员',],
        icon:"user"
      }
    },

    {
      path: "chart", component: chart,
      meta: {
        title: "数据概览",
        roles: ['超级管理员', '管理员', '老师'],
        icon:"pie-chart"
      }
    },

    {
      path: "business", component: business,
      meta: {
        title: "企业列表",
        roles: ['超级管理员', '管理员', '老师'],
        icon:"office-building"
      }
    },

    {
      path: "question", component: question,
      meta: {
        title: "题库列表",
        roles: ['超级管理员', '管理员', '老师', '学生'],
        icon:"edit-outline"
      }
    },

    {
      path: "object", component: object,
      meta: {
        title: "学科列表",
        roles: ['超级管理员', '管理员', '老师', '学生'],
        icon:"notebook-2"
      }
    },
  ]

  