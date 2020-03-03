//  导入 vue
import Vue from 'vue'

//  导入moment
import moment from 'moment'

Vue.filter('formatTime', function (val) {
    // 处理日期格式需要一个moment库
    return moment(val).format('YYYY-MM-DD')
})

//  再去main.js里 导入



