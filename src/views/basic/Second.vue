<template>
	<div class="footer" v-show="showTable">
		<!-- 导出按钮 -->
		<export-button class="export-button"/>
		<!-- 表格 -->
		<div class="tableParent">
			<table class="table">
				<tr class="tableTr">
					<td>代理ID</td>
					<td>姓名</td>
					<td>游戏名称</td>
					<td>当日投注总额</td>
					<td>当日派彩总额</td>
					<td>当日税收总额</td>
					<td>当日盈收</td>
					<td>前日盈收</td>
					<td>本月盈收</td>
					<td>累加总盈收</td>
				</tr>
				<tbody
					v-for="(item, index) in tableData5"
					:key="index"
					@click="gameType(item.gameName)"
				>
					<tr :style="item.gameName=='全部'?'backgroundColor:#f2dede':''">
						<td>{{item.id}}</td>
						<td>{{item.name}}</td>
						<td>{{item.gameName}}</td>
						<td>{{item.todayBet}}</td>
						<td>{{item.todayPayout}}</td>
						<td>{{item.todayRevenue}}</td>
						<td>{{item.todayRoyalty}}</td>
						<td>{{item.yesRoyalty}}</td>
						<td>{{item.monthRoyalty}}</td>
						<td>{{item.allRoyalty}}</td>
					</tr>
					<tr class="incomeTr">
						<td colspan="10">
							<template v-if="gameTyper==item.gameName" type="expand">
								<game-income :yxsytj-data="item.children" v-if="gameTyper==item.gameName"/>
							</template>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import GameIncome from './childComps/GameIncome'
	import ExportButton from 'components/common/exportButton/ExportButton'
	
	import tableData from './tableData'
	// import { exportButton } from 'common/mixin'
	
	export default {
		name: 'Second',
		components: {
			GameIncome,
			ExportButton
		},
		// mixins: [exportButton],
		data() {
			return {
				showTable: true, //显示表格和导表按钮
				// 导表
				gameTyper:'',//点击的游戏
				tableData5: tableData,
			}
		},
		methods: {
			// 点击游戏切换游戏类型
			gameType(item) {
				// console.log(item);
				this.gameTyper = this.gameTyper == item ? '' : item;
				if (item == '全部') {
					this.gameTyper = '';
				}
			}
		}
	}
</script>

<style scoped>
	.export-button {
		top: 0;
	}
	
	/* 表格部分 */
	.footer {
		margin: 20px;
		position: relative;
	}
	
	/* 表格 */
	.tableParent {
		margin-top: 10px;
		width: 100%;
	}
	.table{
		width:100%;
		border-collapse: collapse;	/* 合并单元格边框 */
	}
	.tableTr {
		background-color: #dff0d8;
	}
	.tableTr td{
		font-weight: 600;
	}
	.table td {
		padding: 10px;
		border: 1px solid #ddd;
		font-size: 16px;
		text-align: center;
	}
	.incomeTr{
		height:4px;
		background-color:rgb(228, 226, 226);
	}
	.incomeTr td{
		padding:6px;
	}
</style>
