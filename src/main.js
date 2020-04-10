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
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import 'mavon-editor/dist/highlightjs/styles/atom-one-dark.min.css'
Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.prototype.url = "https://admin.ahriknow.com"
// Vue.prototype.url = 'http://127.0.0.1:8001'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.interceptors.request.use(
	request => {
		request.cancelToken = source.token
		request.headers['token'] = localStorage.getItem('token')
		return request
	},
	error => {
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(
	response => {
		if (response.data.code === 0) {
			source.cancel()
			localStorage.clear('user')
			window.location.replace('/#/auth')
			return Promise.reject({ message: '登录超时' })
		}
		return response
	},
	error => {
		if (axios.isCancel(error)) {
			return new Promise(() => {})
		} else {
			return Promise.reject(error)
		}
	}
)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
