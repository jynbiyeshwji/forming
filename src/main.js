import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'normalize.css/normalize.css'	// a modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App), 
	router,
	store
}).$mount('#app')
