<template>
  <el-row class="tac">
		<el-col :span="24" class="h100">
			<el-menu 
				ref="mySidemenu"
				class="no-boarder el-menu-vertical-demo h100"
				router
				unique-opened
				@open="handleOpen"
				@close="handleClose"
				:default-active="currentAactiveTag"
				background-color="#545c64"
				text-color="#fff"
				:collapse="isNavMenuOpen"
				active-text-color="#ffd04b"
			>
				<el-submenu 
					v-for="item in menu"
					:index="item.name"
					:key="item.name"
					class="no-boarder"
				>
					<template slot="title">
						<i :class="item.meta.icon"></i>&nbsp;&nbsp;
						<span>{{item.meta.title}}</span>
					</template>
					<el-menu-item-group
						v-for="sub in item.sub"
						:key="sub.name"
						class="over-hide"
					>
						<el-menu-item 
							:index="sub.meta.index" 
							@click="menuItemClick(sub.meta.title, sub.meta.index)"
						>
							{{sub.meta.title}}
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	import menu from 'assets/config/menu-config'
	
	import { mapState, mapGetters } from 'vuex'
	
  export default {
		data() {
			return {
				menu
			}
		},
		computed: {
			...mapState(['isNavMenuOpen', 'navTags']),
			...mapGetters(['currentAactiveTag'])
		},
    methods: {
			handleOpen(key, keyPath) {
				// console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				// console.log(key, keyPath);
			},
			menuItemClick(tag, index) {
				let tags = {}
				tags.title = tag
				tags.active = false
				tags.id = index
				tags.type = 'info'
				this.$store.dispatch('addTags', tags)
			}
		}
  }
</script>

<style scoped>
	.h100 {
		height: 100%;
	}
	
	.tac {
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 9;
	}
	
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
	}
</style>
