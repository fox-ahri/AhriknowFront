import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.config.productionTip = false
// Vue.prototype.url = "https://api.ahriknow.com/ahri-auth"
Vue.prototype.url = 'http://127.0.0.1:8000'

axios.interceptors.request.use(
	request => {
		request.headers['token'] = localStorage.getItem('token')
		return request
	},
	function(error) {
		return Promise.reject(error)
	}
)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
