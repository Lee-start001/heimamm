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



//导入axios请求
import { info } from "@/api/index.js";
//  导入token
import { removetoken } from "@/utilis/token.js";

//单独引入 Message：
import { Message } from 'element-ui';


//  导入children
import children from './childrenRoutes.js'

//3:在vue中全局使用vue-router需要注册
Vue.use(VueRouter);

//4.  实例化   设置路由规则
const router = new VueRouter({
  routes: [

    {
      path: "/",
      component: login,
      meta: {
        title: "登录",
        roles: ['超级管理员', '管理员', '老师', '学生'],
      }
    },
    { path: "/login", redirect: '/' },


    {
      path: "/index",
      component: index,
      meta: {
        title: "注册",
        roles: ['超级管理员', '管理员', '老师', '学生']
      },
      //  index页面子组件
      children
    },
    //{ path: "/data", component: data }
  ]
})



// 定义白名单数组
let whiteUrl = ['/', '/guanggao']

//导航守卫前
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  //  开始加载进度条
  NProgress.start();

  // 先判断是否是登录  是登陆就直接放行
  if (whiteUrl.includes(to.path)) {
    //  放行
    next();
  } else {
    //  在进入页面之前 判断 token值 真假  
    // 获取登录用户的信息
    info().then(res => {
      console.log(1);

      console.log(res);

      // 权限管理
      //   判断状态码是否为1  若是则放行
      if (res.data.data.status == 1) {

        //  判断该token参数
        if (res.data.code == 200) {

          // 把获取的信息  存放在vuex中
          store.commit('changeUsername', res.data.data.username);
          store.commit('changeAvatar', process.env.VUE_APP_URL + '/' + res.data.data.avatar);
          // 把当前账号的身份保存在vuex
          store.commit('changeRole',res.data.data.role)
          //   如果是从登录页面跳转过来 才提示成功
          if (from.path == '/') {
            //  提示登陆成功
            Message.success("登陆成功");
          }

          //  判断 是否有求权限进入点击的子路由页面
        if (to.meta.roles.includes(res.data.data.role)) {
          console.log(to.meta.roles);
          
          // 
          
          // 必须满足所有条件才可 放行  
          next();
        } else {
          //  提示无权限访问该页面
          Message.error('账号无权限访问该页面');
          // 打回原来页面
          next(from.path);
          //  并且手动关闭进度条
          NProgress.done();
        }

        } else {
          //  若不是则提示账号异常 并返回登录页
          Message.error('账号异常 请联系管理员');
          //  并返回登录页
          next('/');
          //  手动关闭进度条
          NProgress.done();

        }

        
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