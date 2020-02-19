// 2. 导入插件
import Vue from "vue"
// 饿了吗
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
    Vue.use(ElementUI);

import  VueRouter from 'vue-router'
//3:在vue中全局使用vue-router需要注册
Vue.use(VueRouter);

//4.  实例化
const router = new VueRouter({
  routes:[
    
  ]
})

Vue.config.productionTip = false


export default router