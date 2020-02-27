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

new Vue({
  //5. 全局注入vue
  router,
  store,
  
  render: h => h(App),
}).$mount('#app')
