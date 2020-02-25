// 2. 导入插件
import Vue from "vue"
// 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


//  导入 nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import VueRouter from 'vue-router'
//  导入login 
import login from '../views/login/login.vue'

//  导入 index
import index from "../views/index/index.vue"

//  导入组内data index
import user from '../views/index/user/user.vue'
import chart from '../views/index/chart/chart.vue'
import company from '../views/index/company/company.vue'
import question from '../views/index/question/question.vue'
import object from '../views/index/object/object.vue'



//3:在vue中全局使用vue-router需要注册
Vue.use(VueRouter);

//4.  实例化   设置路由规则
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: login
    },
    {
      path: "/index",
      component: index,
      children: [
        // 子路由一般不加/
        { path: "user", component: user },
        { path: "chart", component: chart },
        { path: "company", component: company },
        { path: "question", component: question },
        { path: "object", component: object },
      ]
    },
    //{ path: "/data", component: data }
  ]
})

 //导航守卫前
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
   //  开始加载进度条
   NProgress.start();
   
   //  放行
  next()

});

 //  导航守卫后
router.afterEach(() => {
  // to and from are both route objects.
  // 加载完成进度条
  NProgress.done();
})


Vue.config.productionTip = false

//  暴露出去
export default router