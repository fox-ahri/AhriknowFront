import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Index/Home.vue'

Vue.use(VueRouter)

const routes = [
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
		],
	},
	{
		path: '/admin',
		name: 'admin',
		component: () => import('../views/Admin.vue'),
		redirect: '/admin/welcome',
		children: [
			{
				path: 'welcome',
				name: 'welcome',
				component: () => import('../views/Admin/Welcome.vue'),
			},
			{
				path: 'userinfo',
				name: 'userinfo',
				component: () => import('../views/Admin/Person/Userinfo.vue'),
			},
			{
				path: 'department',
				name: 'department',
				component: () => import('../views/Admin/Person/Department.vue'),
			},
			{
				path: 'role',
				name: 'role',
				component: () => import('../views/Admin/Person/Role.vue'),
			},
			{
				path: 'jurisdiction',
				name: 'jurisdiction',
				component: () => import('../views/Admin/Person/Jurisdiction.vue'),
			},
			{
				path: 'user',
				name: 'user',
				component: () => import('../views/Admin/Person/User.vue'),
			},
			/* ---------------------------------- Notebook ---------------------------------- */
			{
				path: 'book',
				name: 'book',
				component: () => import('../views/Admin/Notebook/Book.vue'),
			},,
			/* ---------------------------------- Setting ---------------------------------- */
			{
				path: 'index-show',
				name: 'index-show',
				component: () => import('../views/Admin/Setting/IndexShow.vue'),
			},
		],
	},
	{
		path: '/admin/edit',
		name: 'edit',
		component: () => import('../views/Admin/Notebook/Edit.vue'),
	},
]

const router = new VueRouter({
	routes,
})

export default router
