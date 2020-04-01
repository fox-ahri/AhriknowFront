import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/auth',
		name: 'auth',
		component: () => import('../views/Auth/Auth.vue')
	},
	{
		path: '/admin',
		alias: '/',
		name: 'admin',
		component: Admin,
		redirect: '/admin/welcome',
		children: [
			{
				path: 'welcome',
				name: 'welcome',
				component: () => import('../views/Admin/Welcome.vue')
      },
      {
				path: 'userinfo',
				name: 'userinfo',
				component: () => import('../views/Admin/Person/Userinfo.vue')
			},
      {
				path: 'department',
				name: 'department',
				component: () => import('../views/Admin/Person/Department.vue')
			},
      {
				path: 'role',
				name: 'role',
				component: () => import('../views/Admin/Person/Role.vue')
			},
      {
				path: 'jurisdiction',
				name: 'jurisdiction',
				component: () => import('../views/Admin/Person/Jurisdiction.vue')
			},
      {
				path: 'user',
				name: 'user',
				component: () => import('../views/Admin/Person/User.vue')
      },
      /* ---------------------------------- Notebook ---------------------------------- */
      {
				path: 'book',
				name: 'book',
				component: () => import('../views/Admin/Notebook/Book.vue')
			},
		]
	},
	{
		path: '/admin/edit',
		name: 'edit',
		component: () => import('../views/Admin/Notebook/Edit.vue')
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
]

const router = new VueRouter({
	routes
})

export default router
