<template>
	<div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts theme
	import resize from './mixins/resize.js'
	
	export default {
		name: 'LineChart',
		mixins: [resize],
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			height: {
				type: String,
				default: '350px'
			},
			width: {
				type: String,
				default: '100%'
			},
			chartData: {
				type: Object,
				require: true,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				chart: null
			}
		},
		watch: {
			// 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
			chartData: {
				deep: true,
				handler(val) {
					this.setOptions(val)
				}
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
				this.setOptions(this.chartData)
			},
			setOptions({ expectedData, actualData} = {}) {
				this.chart.setOption({
					xAxis: {
					  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					  boundaryGap: false,	// 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
					  axisTick: {	// 是否显示坐标轴刻度
					    show: true
					  }
					},
					grid: {
					  left: 10,
					  right: 10,
					  bottom: 20,
					  top: 30,
					  containLabel: true
					},
					tooltip: {
					  trigger: 'axis',
					  axisPointer: {	// 指示器类型
					    type: 'cross'	// 十字准星指示器
					  },
					  padding: [5, 10]
					},
					yAxis: {
					  axisTick: {	// 是否显示坐标轴刻度
					    show: false
					  }
					},
					legend: {
					  data: ['expected', 'actual']
					},
					series: [{
					  name: 'expected', 
						smooth: true,
						type: 'line',
						itemStyle: {
					    normal: {
					      color: '#FF005A',
					      lineStyle: {
					        color: '#FF005A',
					        width: 2
					      }
					    }
					  },
					  data: expectedData,
					  animationDuration: 2800,	// 初始动画的时长
					  animationEasing: 'cubicInOut'	// 初始动画的缓动效果
					},
					{
					  name: 'actual',
					  smooth: true,
					  type: 'line',
					  itemStyle: {
					    normal: {
					      color: '#3888fa',
					      lineStyle: {
					        color: '#3888fa',
					        width: 2
					      },
					      areaStyle: {
					        color: '#f3f8ff'
					      }
					    }
					  },
					  data: actualData,
					  animationDuration: 2800,	// 初始动画的时长
					  animationEasing: 'quadraticOut'	// 初始动画的缓动效果
					}]
				})
			}
		}
	}
</script>

<style>
</style>
