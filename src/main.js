import Vue from 'vue'
import App from './App.vue'


// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);

//导入基础样式表
import './style/base.css'

Vue.config.productionTip = false

import router from './router/index'
import store from './store/index'

//  导入组件 学科列表subjectList
import subjectList from './components/subjectList.vue'
import businessList from './components/businessList.vue'
//注册全局组件
Vue.component('subjectList',subjectList)
Vue.component('businessList',businessList)

//  导入全局过滤器  
import '@/filters/filters.js'

 
new Vue({
  //5. 全局注入vue
  router,
  store,
  
  
  render: h => h(App),
}).$mount('#app')
