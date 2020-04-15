export default [
	{
		path: 'welcome',
		name: 'tools-welcome',
		component: () => import('../views/Tools/Welcome.vue'),
	},
	{
		path: 'secrecy',
		name: 'tools-secrecy',
		component: () => import('../views/Tools/Secrecy.vue'),
	},
	{
		path: 'image',
		name: 'tools-image',
		component: () => import('../views/Tools/Image.vue'),
	},
]
