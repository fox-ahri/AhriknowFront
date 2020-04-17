import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Index/Home.vue'
import Tools from './tools'
import Admin from './admin'

Vue.use(VueRouter)

const routes = [
	{
		path: '/view',
		name: 'view',
		component: () => import('../views/Visualization.vue'),
	},
	{
		path: '/auth',
		name: 'auth',
		component: () => import('../views/Auth/Auth.vue'),
	},
	{
		path: '/index',
		alias: '/',
		name: 'index',
		component: Index,
		redirect: '/index/home',
		children: [
			{
				path: 'home',
				name: 'home',
				component: Home,
			},
			{
				path: 'book',
				name: 'index-book',
				component: () => import('../views/Index/Notebook/Book.vue'),
			},
			{
				path: 'read',
				name: 'index-read',
				component: () => import('../views/Index/Notebook/Read.vue'),
			},
		],
	},
	{
		path: '/tools',
		name: 'tools',
		component: () => import('../views/Tools/Tools.vue'),
		redirect: '/tools/welcome',
		children: Tools,
	},
	{
		path: '/admin',
		name: 'admin',
		component: () => import('../views/Admin.vue'),
		meta: {
			login: true,
		},
		redirect: '/admin/welcome',
		children: Admin,
	},
	{
		path: '/admin/edit',
		name: 'edit',
		component: () => import('../views/Admin/Notebook/Edit.vue'),
		meta: {
			jur: '笔记',
		},
	},
]

const router = new VueRouter({
	routes,
})

import store from '../store/index'
import axios from 'axios'

router.beforeEach((to, from, next) => {
	if (to.hasOwnProperty('meta') && to.meta.hasOwnProperty('login') && to.meta.login) {
		if (!localStorage.get('token')) {
			next('/auth')
		}
	}
	if (to.hasOwnProperty('meta') && to.meta.hasOwnProperty('jur')) {
		if (store.state.jurisdictions.indexOf(to.meta.jur) > -1) {
			next()
		} else {
			axios
				.get(`https://admin.ahriknow.com/admin/person/jur/`)
				.then(res => {
					if (res.data.code === 200) {
						if (res.data.data.indexOf(to.meta.jur) > -1) {
							next()
							store.commit('jurisdictions', res.data.data)
						} else {
							next('/admin/welcome')
						}
					} else {
						console.log(res.data.msg)
						next('/admin/welcome')
					}
				})
				.catch(err => {
					console.log(err.message)
					next('/admin/welcome')
				})
		}
	} else {
		next()
	}
})

export default router
