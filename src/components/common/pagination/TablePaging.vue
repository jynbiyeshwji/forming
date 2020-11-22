<template>
	<div>
		<table class="table">
			<tr>
				<td class="grid-content" @click="selectAll">
					<input type="checkbox" :checked="isChecked">
					<!-- <el-checkbox @change="selectAll"/> -->
				</td>
				<td class="grid-content">序号</td>
				<td class="grid-content" v-for="item in theadData">
					{{item}}
				</td>
			</tr>
			<tr 
				v-for="(item, index) in currentTableData" 
				:key="index" 
				@click="selectRow(item)"
			>
				<td class="hcontent">
					<!-- <el-checkbox v-model="isChecked" :key="cpageFirstIndex+index+1" :id="item.ID"/> -->
					<input type="checkbox" :checked="item.checked" :key="cpageFirstIndex+index+1" />
				</td>
				<td class="hcontent">{{cpageFirstIndex+index+1}}</td>
				<td class="hcontent">{{item.ID}}</td>
				<td class="hcontent">{{item.rank}}</td>
				<td class="hcontent">{{item.account}}</td>
				<td class="hcontent">{{item.name}}</td>
				<td class="hcontent">{{item.max}}</td>
				<td class="hcontent">{{item.time}}</td>
				<td class="hcontent">{{item.status}}</td>
				<td class="hcontent">{{item.num}}</td>
				<td class="hcontent">{{item.lastID}}</td>
				<td class="hcontent">{{item.server}}</td>
			</tr>
		</table>
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				@prev-click="handlePrevClick"
				@next-click="handleNextClick"
				:current-page.sync="currentPage"
				:page-sizes="[5, 10, 15, 100]"
				:page-size="pageSize"
				layout="prev, pager, next, sizes, jumper"
				:total="tableData.length"
				background
			/>
		</div>
	</div>
</template>

<script>
	import tableData from 'views/table/index.js'
	
	import { mapState } from 'vuex'
	// import { mapMutations } from 'vuex'
	import { mapActions } from 'vuex'
	// import { pagingButton } from 'common/mixin'
	
	export default {
		name: 'TablePaging',
		computed: {
			...mapState(['checkboxGroup1', 'currentTableData'])
		},
		data() {
			return {
				// 表格
				theadData: ['代理ID', '代理等级', '账号名称', '代理名字', '代理上限额度',
					'注册日期', '状态', '总玩家数量', '上级代理ID', '服务器名称'
				],
				tableData,	// 获取的全部数据
				isChecked: false,	//CheckBox框是否选中
				selectedRow: 0,	//选中行
				// 分页
				// currentTableData: [],	// 当前页加载的数据
				cpageCount: null,	// 当前页条目个数
				pageSize: 5, // 每页显示条目个数
				currentPage: 1,	// 当前页
				cpageFirstIndex: 0,	// 当前页第一条数据的下标
				cpageLastIndex: 0,	// 当前页最后一条数据的下标
				// 其他
				// checkboxGroup1: [],	// 存放选中行的数据
				checkedLength: 0,	// 选中状态下的数据的长度
			}
		},
		mounted() {
			this.cpageLastIndex = this.cpageCount - 1
		},
		watch: {
			// 监听选中状态下的数据长度是否发生改变
			checkedLength() {
				// 当前页数据没有全部被选中
				if (this.checkedLength !== this.cpageCount) {
					this.isChecked = false
				} else {	// 全部被选中
					this.isChecked = true
				}
			},
			currentTableData() {
				// 删除数据时，更新选中数据长度
				this.checkLength()
			}
		},
		created() {
			// 初始化首页数据
			this.tableData.forEach((item, i) => {
				if (this.cpageCount < this.pageSize) {
					this.cpageCount++
					this.addCTableData(item)
					// this.currentTableData.push(item)
				}
			})
		},
		methods: {
			// ...mapMutations(['addCTableData']),
			...mapActions(['addCTableData']),
			checkLength() {
				// 当前页选中状态的数据的长度
				this.checkedLength = this.currentTableData.filter(item => item.checked == true).length
			},
			selectRow(val) {
				this.$store.dispatch('selectRow', val)
				
				// 查找数组checkboxGroup1中是否存在该元素
				// let oldGoods = this.checkboxGroup1.find(item => item.ID === val.ID)
				
				// if (!oldGoods) {	// 不存在
				// 	this.checkboxGroup1.push(val)
				// } else {	// 存在
				// 	// 查找数组中符合条件的元素的索引
				// 	let index = this.checkboxGroup1.findIndex(item => item.ID === val.ID)
				// 	// 从数组中将该元素删除
				// 	this.checkboxGroup1.splice(index, 1)
				// }
				
				// 来回切换选中行的CheckBox的选中状态
				this.currentTableData.filter(item => {
					return item.ID == val.ID
				}).map(item => {
					return item.checked = !item.checked
				})
				
				// 统计当前页处于选中状态下的数据长度
				this.checkLength()
			},
			selectAll() {
				// 点击全选时将本页未选中的加入到checkboxGroup1
				let goods = this.currentTableData.filter(item => {
					return item.checked == false
				})
				this.$store.commit('addMultiple', goods)
				// this.checkboxGroup1.push(...goods)
				
				// 改变选中状态
				this.isChecked = !this.isChecked
				
				// 根据表头的isChecked来判断对那些数据进行操作
				if (this.isChecked) {
					this.currentTableData.filter(item => {
						return item.checked == false
					}).map(item => {
						return item.checked = !item.checked
					})
				} else {
					// 当页数据条目全不选时，将checkboxGroup1置空
					// this.checkboxGroup1 = []
					this.$store.state.checkboxGroup1 = []
					
					// 当页数据条目不全选时
					this.currentTableData.filter(item => {
						return item.checked == true
					}).map(item => {
						return item.checked = !item.checked
					})
				}
				
				// 统计当前页处于选中状态下的数据长度
				this.checkLength()
			},
			// 显示当前页数据
			showCurrentPageData() {
				this.cpageFirstIndex = this.pageSize * (this.currentPage - 1)
				this.cpageLastIndex = this.pageSize * this.currentPage - 1
				// this.currentTableData = []
				this.$store.state.currentTableData = []
				this.cpageCount = 0
				// 当前页选中的数据条目checkboxGroup1初始为空
				// this.checkboxGroup1 = []	
				this.$store.state.checkboxGroup1 = []
				
				// 初始化当前页要显示的数据条目
				this.tableData.forEach((item, i) => {
					if (i >= this.cpageFirstIndex && i <= this.cpageLastIndex && this.cpageCount < this.pageSize) {
						this.cpageCount++
						// this.currentTableData.push(item)
						this.addCTableData(item)
					}
				})
				
				// 统计当前页处于选中状态下的数据长度
				this.checkLength()
				
				// 当页数或者每页条目个数发生变化时，存储仍处于选中状态的数据
				let goods = this.currentTableData.filter(item => {
					return item.checked == true
				})
				// this.checkboxGroup1.push(...goods)
				this.$store.commit('addMultiple', goods)
			},
			// 每页条数pageSize 改变时会触发
			handleSizeChange(pageSize) {
				this.pageSize = pageSize
				this.showCurrentPageData()
			},
			// 当前页currentPage 改变时会触发
			handleCurrentChange(page) {
				this.currentPage = page
				this.showCurrentPageData()
			},
			handlePrevClick() {
			  // 发送ajax请求上一页数据
			},
			handleNextClick() {
			  // 发送ajax请求下一页数据
			}
		}
	}
</script>

<style scoped>
	.table {
		margin: 10px;
		text-align: center;
		line-height: 36px;
		width: 98%;
		border-collapse: collapse;
	}
	
	.grid-content {
		border: 1px solid #ddd;
		min-height: 36px;
		font-size: 16px;
		font-weight: 600;
		background: #dff0d8;
	}
	
	.hcontent {
		background-color: transparent;	/* 背景颜色是透明的，默认 */
		border: 1px solid #ddd;
		font-size: 16px;
		color: #000;
	}
	
	.block {
		text-align: center;
	}
</style>
