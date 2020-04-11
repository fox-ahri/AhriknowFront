import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Index/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/auth',
		name: 'auth',
		component: () => import('../views/Auth/Auth.vue')
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
				component: Home
			},
			{
				path: 'book',
				name: 'index-book',
				component: () => import('../views/Index/Notebook/Book.vue')
			},
			{
				path: 'read',
				name: 'index-read',
				component: () => import('../views/Index/Notebook/Read.vue')
			}
		]
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
				component: () => import('../views/Admin/Person/Department.vue'),
				meta: {
					jur: '部门管理'
				}
			},
			{
				path: 'role',
				name: 'role',
				component: () => import('../views/Admin/Person/Role.vue'),
				meta: {
					jur: '角色管理'
				}
			},
			{
				path: 'jurisdiction',
				name: 'jurisdiction',
				component: () => import('../views/Admin/Person/Jurisdiction.vue'),
				meta: {
					jur: '权限管理'
				}
			},
			{
				path: 'user',
				name: 'user',
				component: () => import('../views/Admin/Person/User.vue'),
				meta: {
					jur: '用户管理'
				}
			},
			/* ---------------------------------- Notebook ---------------------------------- */
			{
				path: 'book',
				name: 'book',
				component: () => import('../views/Admin/Notebook/Book.vue'),
				meta: {
					jur: '笔记'
				}
			},
			{
				path: 'tag',
				name: 'tag',
				component: () => import('../views/Admin/Notebook/Tag.vue'),
				meta: {
					jur: '标签'
				}
			},
			/* ---------------------------------- Setting ---------------------------------- */
			{
				path: 'index-show',
				name: 'index-show',
				component: () => import('../views/Admin/Setting/IndexShow.vue'),
				meta: {
					jur: '首页展示'
				}
			},
			/* ---------------------------------- Setting ---------------------------------- */
			{
				path: 'restapi-project',
				name: 'restapi-project',
				component: () => import('../views/Admin/Restapi/Project.vue'),
			},
			{
				path: 'restapi-url',
				name: 'restapi-url',
				component: () => import('../views/Admin/Restapi/Url.vue'),
			},
			{
				path: 'restapi-opera',
				name: 'restapi-opera',
				component: () => import('../views/Admin/Restapi/Opera.vue'),
			}
		]
	},
	{
		path: '/admin/edit',
		name: 'edit',
		component: () => import('../views/Admin/Notebook/Edit.vue'),
		meta: {
			jur: '笔记'
		}
	}
]

const router = new VueRouter({
	routes
})

import store from '../store/index'

router.beforeEach((to, from, next) => {
	if (to.hasOwnProperty('meta') && to.meta.hasOwnProperty('jur')) {
		if (store.state.jurisdictions.indexOf(to.meta.jur) > -1) {
			next()
		} else {
			next('/admin/welcome')
		}
	} else {
		next()
	}
})

// this.axios
// .get(`${this.url}/admin/person/jur/`)
// .then(res => {
//   if (res.data.code === 200) {
// 	if (res.data.data.indexOf('狸知云笔记') < 0) {
// 	  this.$router.push('/admin')
// 	  return
// 	}
// 	this.$store.commit('jurisdictions', res.data.data)
//   } else {
// 	console.log(res.data.msg)
//   }
// })
// .catch(err => {
//   this.$message.error(err.message)
// })

export default router
