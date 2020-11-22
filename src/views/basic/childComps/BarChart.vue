<template>
	<div :class="className" :style="{width:width,height:height}"></div>
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons')
	import resize from './mixins/resize.js'
	
	const animationDuration = 1000
	
	export default {
		name: 'BarChart',
		mixins: [resize],
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '300px'
			}
		},
		data() {
			return {
				chart: null
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initChart()
			})
		},
		methods: {
			initChart() {
				this.chart = echarts.init(this.$el, 'macarons')
				
				this.chart.setOption({
					tooltip: {
					  trigger: 'axis',
					  axisPointer: { // 坐标轴指示器，坐标轴触发有效
					    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					  }
					},
					grid: {
					  top: 10,
					  left: '2%',
					  right: '2%',
					  bottom: '3%',
					  containLabel: true
					},
					xAxis: [{
					  type: 'category',
					  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					  axisTick: {	// 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
					    alignWithLabel: true  
					  }
					}],
					yAxis: [{
					  type: 'value',
					  axisTick: {	// 是否显示坐标轴刻度
					    show: false 
					  }
					}],
					series: [{
					  name: 'pageA',
					  type: 'bar',
					  stack: 'vistors', // 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置
					  barWidth: '60%',  // 柱条的宽度，不设时自适应
					  data: [79, 52, 200, 334, 390, 330, 220],
					  animationDuration
					}, {
					  name: 'pageB',
					  type: 'bar',
					  stack: 'vistors',
					  barWidth: '60%',
					  data: [80, 52, 200, 334, 390, 330, 220],
					  animationDuration
					}, {
					  name: 'pageC',
					  type: 'bar',
					  stack: 'vistors',
					  barWidth: '60%',
					  data: [30, 52, 200, 334, 390, 330, 220],
					  animationDuration
					}]
				})
			}
		}
	}
</script>

<style>
</style>
