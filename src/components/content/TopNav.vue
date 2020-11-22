<template>
	<div>
		<el-tag
			class="tags"
			v-for="(tag, index) in navTags"
			:key="index"
			closable
			:type="tag.type"
			@close="closeTag(index)"
			@click="activeTag(tag.id, tag)"
		>
			{{tag.title}}
		</el-tag>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		name: 'TopNav',
		computed: {
			...mapState(['navTags', 'navTagsLength'])
		},
		mounted() {
			console.log('mounted');
			
		},
		methods: {
			closeTag(index) {
				if (this.navTags[index].active) {
					if (index === this.navTags.length-1 && index !== 0) {	//关闭处于末尾的活跃状态的tag
						let tag = this.navTags[index-1]
						this.activeTag(tag.id, tag)
					} else if (index === 0 && this.navTags.length == 1) {	// 只有一个tag标签
						this.$router.push('/home')
					} else {	// 关闭中间处于活跃状态的tag
						let tag = this.navTags[index+1]
						this.activeTag(tag.id, tag)
					}
				}
				// 关闭选中标签
				this.$store.commit('closeTag', index)
			},
			activeTag(id, tag) {
				// 当前路由路径非要跳转的路由路径
				if (this.$route.path !== id) {
					this.$router.push(id)
					this.$store.commit('activeTag', tag)
				}
			}
		}
	}
</script>

<style>
</style>
