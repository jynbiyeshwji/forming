export default {
	addTags(context, payload) {
		// 使当前页处于活跃状态
		context.commit('activeTag', payload)
		
		// 判断数组中是否存在数据
		if (context.state.navTags.length === 0) {
			context.state.navTags.push(payload)
		} else {
			// 查找之前数组中是否存在该tag
			let tag = context.state.navTags.find(item => item.id == payload.id)
			if (tag == undefined) {	// 不存在
				context.commit('addTags', payload)
			}
		}
	},
	// TablePaging
	selectRow(context, payload) {
		// 查找数组checkboxGroup1中是否存在该元素
		let oldGoods = context.state.checkboxGroup1.find(item => item.ID === payload.ID)
		
		if (!oldGoods) {	// 不存在， 添加
			context.commit('addGroup1', payload)
		} else {	// 存在， 移除
			context.commit('removeGroup1', payload)
		}
	},
	removeGroupData(context, payload) {
		return new Promise((resolve, reject) => {
			// 查找数组中符合条件的元素的索引
			let index = context.state.checkboxGroup1.findIndex(item => item.ID === payload.ID)
			let index2 = context.state.currentTableData.findIndex(item => item.ID === payload.ID)
			// 从数组中将该元素删除
			context.state.checkboxGroup1.splice(index, 1)
			context.state.currentTableData.splice(index2, 1)
			
			resolve('删除成功!')
		})
	},
	addCTableData(context, payload) {
		// 查找数组currentTableData中是否存在该元素
		let goods = context.state.currentTableData.find(item => item.ID === payload.ID)
		if (!goods) {	// 不存在
			context.commit('addCTableData', payload)
		}
	}
}