import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const state = {
	// navMenu
	isNavMenuOpen: false,
	navTags: [],
	navTagsLength: 0,
	// TablePaging
	checkboxGroup1: [],	// 存放分页表格选中的数据
	currentTableData: [],	// 当前页加载的数据
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

// 3.挂载
export default store
