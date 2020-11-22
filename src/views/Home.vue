<template>
	<div>
		<nav-bar/>
		<div class="main"
			:style="marginLeft"
		>
			<div class="header">
				<Header/>
			</div>
			<div class="tabs">
				<top-nav/>
			</div>
			<el-main class="content-main">
				<keep-alive>
					<router-view/>
				</keep-alive>
			</el-main>
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/content/NavBar'
	import Header from 'components/content/Header'
	import TopNav from 'components/content/TopNav'
	import First from 'views/basic/First'
	
	import { mapState, mapGetters } from 'vuex'
	
	export default {
		name: 'Home',
		components: {
			NavBar,
			Header,
			TopNav,
			First
		},
		computed: {
			...mapState(['isNavMenuOpen']),
			...mapGetters(['navTagIndexs']),
			marginLeft() {
				return {'margin-left': this.isNavMenuOpen ? '64px' : '200px'}
			}
		}
	}
</script>

<style scoped>
	.header-title {
		display: inline-block;
		font-size: 24px;
	}
	
	.main {
		margin-left: 200px;
	}
	
	.header {
		height: 40px;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
	
	.content-main {
		background: #fff;
		margin: 10px;
	}
	
	.tabs {
		background: #fff;
	}
</style>
