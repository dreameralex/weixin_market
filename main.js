
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//导入网络请求的包
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

//请求的根目录
$http.baseUrl = 'https://www.uinav.com'

//请求拦截器
$http.beforeRequest = function(options){
	uni.showLoading({
		title: "数据加载中..."
	})
}
//响应拦截器
$http.afterRequest = function(){
	uni.showLoading()
}

//封装弹窗的方法
uni.$showMsg = function(title = '数据请求失败！',duration = 1500){
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif