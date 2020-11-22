export default {
	toggleMenuOpen(state) {
		state.isNavMenuOpen = !state.isNavMenuOpen
	},
	addTags(state, payload) {
		// 将选中tag加入navTags
		state.navTags.push(payload)
	},
	activeTag(state, payload) {
		payload.active = true
		payload.type = 'success'
		// 当前活跃的tag的active设为true
		state.navTags.filter(item => item.id === payload.id).map(item => {
			return item.active = true, item.type = 'success'
		})
		// 非当前活跃的tag的active设为false
		state.navTags.filter(item => item.id != payload.id).map(item => {
			return item.active = false, item.type = 'info'
		})
	},
	closeTag(state, index) {
		// 删除选中tag
		state.navTags.splice(index, 1)
	},
	emptyNavTags(state) {
		// 清空navTags数据
		state.navTags = []
	},
	
	//TablePaging
	addGroup1(state, payload) {
		state.checkboxGroup1.push(payload)
	},
	removeGroup1(state, payload) {
		// 查找数组中符合条件的元素的索引
		let index = state.checkboxGroup1.findIndex(item => item.ID === payload.ID)
		// 从数组中将该元素删除
		state.checkboxGroup1.splice(index, 1)
	},
	addMultiple(state, payload) {
		state.checkboxGroup1.push(...payload)
	},
	addCTableData(state, payload) {
		state.currentTableData.push(payload)
	}
}