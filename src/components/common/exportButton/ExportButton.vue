<template>
	<div class="toexcel">
		<el-button
			:disabled="buttonDisable"
			@click="exportExcel"
			type="primary"
			icon="el-icon-download"
			size="small"
		>
			<!-- 导出 -->
		</el-button>
	</div>
</template>

<script>
	import { exportButton } from 'common/mixin'
	
	export default {
		name: 'ExportButton',
		mixins: [exportButton]
	}
</script>

<style scoped>
	/* 导出按钮 */
	.toexcel {
		cursor: pointer;  /* 光标形状 */
		cursor: hand;
		width: 70px;
		height: 34px;
		/* height: 10px; */
		position: relative;
		top: 30px;
		left: 90%;
		/* right: -10px; */
		/* bottom: 100px; */
	}
</style>
