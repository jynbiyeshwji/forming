export default {
	currentAactiveTag(state) {
		let tag = state.navTags.find(item => {
			return item.active === true
		})
		return tag ? tag.id : ''
	},
	navTagIndexs(state) {
		return state.navTags.map(item => {
			return item.id
		})
	},
	// navTagsLength(state) {
	// 	this.navTagsLength = state.navTags.length
	// }
	
	// TablePaging
	getGroup1Length(state) {
		return state.checkboxGroup1.length
	}
}