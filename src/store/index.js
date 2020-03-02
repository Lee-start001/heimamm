//  导包
import Vue from 'vue'
import Vuex from 'vuex'

//  注册 
Vue.use(Vuex)

// 实例化
const store = new Vuex.Store({
    //数据
    state:{
      username:"",
      avatar:"",
      role:""
    },
    //  方法
    mutations:{
        //获取用户名
        changeUsername(state,val){
            state.username=val
        },
         //获取头像
        changeAvatar(state,val){
            state.avatar=val
        }, 
        changeRole(state,val){
            state.role=val
        }
    }
})
  
//  暴露出去
export default store