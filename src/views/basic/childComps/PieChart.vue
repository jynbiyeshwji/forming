<template>
	<div :class="className" :style="{width:width,height:height}"></div>
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons')	// echarts theme
	import resize from './mixins/resize.js'
	
	export default {
		name: 'PieChart',
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
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			// 销毁实例，销毁后实例无法再被使用
			this.chart.dispose()
			this.chart = null
		},
		methods: {
			initChart() {
				this.chart = echarts.init(this.$el, 'macarons')
				
				this.chart.setOption({
					tooltip: {	// 提示框组件相关的行为，必须引入提示框组件后才能使用
					  trigger: 'item',
					  formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {	// 图例组件
					  left: 'center',
					  bottom: '10',
					  data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
					},
					series: [
					  {
					    name: 'WEEKLY WRITE ARTICLES',
					    type: 'pie',
					    roseType: 'radius',	// 是否展示成南丁格尔图,'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小
					    radius: [15, 95],
					    center: ['50%', '38%'],
					    data: [
					      { value: 320, name: 'Industries' },
					      { value: 240, name: 'Technology' },
					      { value: 149, name: 'Forex' },
					      { value: 100, name: 'Gold' },
					      { value: 59, name: 'Forecasts' }
					    ],
					    animationEasing: 'cubicInOut',	// 初始动画的缓动效果
					    animationDuration: 2600 // 初始动画的时长
					  }
					]
				})
			}
		}
	}
</script>

<style>
</style>
