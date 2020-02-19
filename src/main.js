import Vue from 'vue'
import App from './App.vue'


//导入基础样式表
import './style/base.css'

Vue.config.productionTip = false

import router from './router/index'
new Vue({
  //5. 全局注入vue
  router,
  render: h => h(App),
}).$mount('#app')
