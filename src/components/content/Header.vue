<template>
	<el-row>
		<el-col :span="2" class="header-wrap">
			<el-button
				class="no-b" 
				:icon="iconName"
				@click="toggleMenuOpen"
			/>
		</el-col>
		<el-col :span="2" :offset="20" class="header-wrap text-r">
			<el-dropdown>
				<el-button class="no-b">
					<i class="el-icon-user" aria-hidden="true"></i>
					<!-- <el-avatar :size="20" icon="el-icon-user"></el-avatar> -->
					<i class="el-icon-arrow-down"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item icon="el-icon-postcard">
						查看个人信息
					</el-dropdown-item>
					<el-dropdown-item 
						icon="el-icon-switch-button" 
						@click.native="Logout"
					>
						登出
					</el-dropdown-item>
					<el-dropdown-item icon="el-icon-setting">
						修改密码
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-col>
	</el-row>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		name: 'Header',
		computed: {
			...mapState(['isNavMenuOpen', 'navTags']),
			iconName() {
				return this.isNavMenuOpen ? 'el-icon-s-fold' : 'el-icon-s-unfold'
			}
		},
		methods: {
			toggleMenuOpen() {
				this.$store.commit('toggleMenuOpen')
			},
			Logout() {
				this.$store.commit('emptyNavTags')
				this.$router.push('/login')
			}
		}
	}
</script>

<style scoped>
	.no-b {
		border: none!important;
	}
	
	.text-r {
		text-align: right;
	}
</style>
