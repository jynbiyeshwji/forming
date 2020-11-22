import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/Home')
const Login = () => import('components/common/login/Login')

const First = () => import('views/basic/First')
const Second = () => import('views/basic/Second')
const Third = () => import('views/table/Third')
const Fourth = () => import('views/form/FormImport')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
	{
		path: '',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login,
		name: '登录'
	},
	{
		path: '/home',
		component: Home,
		name: '首页',
		children: [
			{
				path: '/first',
				component: First,
				name: '选项一',
				meta: {requiresAuth: true}
			},
			{
				path: '/second',
				component: Second,
				name: '选项二'
			},
			{
				path: '/third',
				component: Third,
				name: '选项三'
			},
			{
				path: '/fourth',
				component: Fourth,
				name: '选项四'
			}
		]
	},
]

const router = new VueRouter({
	routes,
	// 使用history模式，默认hash模式
	mode: 'history'
})

// 3.导出router
export default router
