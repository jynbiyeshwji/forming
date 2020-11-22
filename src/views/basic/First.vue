<template>
	<div>
		<el-row>
			<line-chart :chart-data="lineChartData"/>
		</el-row>
		<el-row :gutter="32">
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<pie-chart/>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<bar-chart/>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import LineChart from './childComps/LineChart.vue'
	import PieChart from './childComps/PieChart.vue'
	import BarChart from './childComps/BarChart.vue'
	
	const lineChartData = {
		newVisitis: {
			expectedData: [100, 120, 161, 134, 105, 160, 165],
			actualData: [120, 82, 91, 154, 162, 140, 145]
		}
	}
	
	export default {
		name: 'First',
		components: {
			LineChart,
			PieChart,
			BarChart
		},
		data() {
			return {
				lineChartData: lineChartData.newVisitis
			}
		}
	}
</script>

<style>
</style>
