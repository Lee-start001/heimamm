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

// 导入vuex-store
import store from '../store/index.js'

//  导入组内data index
import user from '../views/index/user/user.vue'
import chart from '../views/index/chart/chart.vue'
import business from '../views/index/business/business.vue'
import question from '../views/index/question/question.vue'
import object from '../views/index/object/object.vue'

//导入axios请求
import { info } from "@/api/index.js";
//  导入token
import { removetoken } from "@/utilis/token.js";

//单独引入 Message：
import { Message } from 'element-ui';




//3:在vue中全局使用vue-router需要注册
Vue.use(VueRouter);

//4.  实例化   设置路由规则
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: login,
      meta: { title: "登录" }
    },
    { path: "/login", redirect: '/' },


    {
      path: "/index",
      component: index,
      meta: { title: "注册" },
      children: [
        // 子路由一般不加/
        { path: "user", component: user, meta: { title: "用户列表" } },
        { path: "chart", component: chart, meta: { title: "数据概览" } },
        { path: "business", component: business, meta: { title: "企业列表" } },
        { path: "question", component: question, meta: { title: "题库列表" } },
        { path: "object", component: object, meta: { title: "学科列表" } },
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

  // 先判断是否是登录  是登陆就直接放行
  if (to.path == '/') {
    //  放行
    next();
  } else {
    //  在进入页面之前 判断 token值 真假  
    // 获取登录用户的信息
    info().then(res => {
      // console.log(res);

      //  判断该token参数
      if (res.data.code == 200) {

        // 把获取的信息  存放在vuex中
        store.commit('changeUsername', res.data.data.username);
        store.commit('changeAvatar', process.env.VUE_APP_URL + '/' + res.data.data.avatar);


        //  放行
        next();

      } else {
        //  提示登录信息错误
        Message.error('登录状态异常 请重新登录');
        //  并删除本地异常token值
        removetoken();

        //  手动关闭进度条
        NProgress.done();

        // 放行至登录页面
        next('/');
      }

    });
  }



  //  放行
  //  next();


});

//  导航守卫后
router.afterEach((to) => {
  // to and from are both route objects.
  // 加载完成进度条
  NProgress.done();


  //  加载完页面显示页面标题
  document.title = to.meta.title;
})


Vue.config.productionTip = false

//  暴露出去
export default router