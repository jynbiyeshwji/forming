<template>
  <div id="app">
		<!-- keep-alive将失活的组件缓存 -->
		<keep-alive>
			<router-view/>
		</keep-alive>
  </div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	/* @import './assets/css/base.css'; */
	
	body {
	  margin: 0;
	  font-size: 14px;
	  background-color: #f1ecec;
	}
</style>
