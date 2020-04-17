export default [
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
		meta: {
			jur: '部门管理',
		},
	},
	{
		path: 'role',
		name: 'role',
		component: () => import('../views/Admin/Person/Role.vue'),
		meta: {
			jur: '角色管理',
		},
	},
	{
		path: 'jurisdiction',
		name: 'jurisdiction',
		component: () => import('../views/Admin/Person/Jurisdiction.vue'),
		meta: {
			jur: '权限管理',
		},
	},
	{
		path: 'user',
		name: 'user',
		component: () => import('../views/Admin/Person/User.vue'),
		meta: {
			jur: '用户管理',
		},
	},
	/* ---------------------------------- Notebook ---------------------------------- */
	{
		path: 'book',
		name: 'book',
		component: () => import('../views/Admin/Notebook/Book.vue'),
		meta: {
			jur: '笔记',
		},
	},
	{
		path: 'tag',
		name: 'tag',
		component: () => import('../views/Admin/Notebook/Tag.vue'),
		meta: {
			jur: '标签',
		},
	},
	/* ---------------------------------- Setting ---------------------------------- */
	{
		path: 'index-show',
		name: 'index-show',
		component: () => import('../views/Admin/Setting/IndexShow.vue'),
		meta: {
			jur: '首页展示',
		},
	},
	/* ---------------------------------- Rest Api ---------------------------------- */
	{
		path: 'restapi-project',
		name: 'restapi-project',
		component: () => import('../views/Admin/Restapi/Project.vue'),
		meta: {
			jur: '接口管理',
		},
	},
	{
		path: 'restapi-url',
		name: 'restapi-url',
		component: () => import('../views/Admin/Restapi/Url.vue'),
		meta: {
			jur: '接口管理',
		},
	},
	{
		path: 'restapi-opera',
		name: 'restapi-opera',
		component: () => import('../views/Admin/Restapi/Opera.vue'),
		meta: {
			jur: '接口管理',
		},
	},
	/* ---------------------------------- Database ---------------------------------- */
	{
		path: 'database-db',
		name: 'database-db',
		component: () => import('../views/Admin/Database/Db.vue'),
		meta: {
			jur: '数据库',
		},
	},
	/* ---------------------------------- Blog ---------------------------------- */
	{
		path: 'blog/tag',
		name: 'blog-tag',
		component: () => import('../views/Admin/Blog/Tag.vue'),
		meta: {
			jur: '标签管理',
		},
	},
	{
		path: 'blog/category',
		name: 'blog-category',
		component: () => import('../views/Admin/Blog/Category.vue'),
		meta: {
			jur: '分类专栏',
		},
	},
]
