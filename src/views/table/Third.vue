<template>
	<div class="parent">
		<!-- 查询条件 -->
		<form-condition></form-condition>
		<!-- 导出按钮 -->
		<export-button/>
		<!-- <Upload></Upload> -->
		<!-- 新增按钮 -->
		<el-button 
			type="primary" 
			icon="el-icon-plus" 
			size="small"
			@click="showAddDialog"
			style="margin-left: 10px;"
		/></el-button>
		<el-button 
			type="primary" 
			icon="el-icon-edit" 
			size="small"
			@click="showEditDialog"
		></el-button>
		<el-button
			type="primary" 
			icon="el-icon-delete" 
			size="small"
			@click="itemDelete"
		></el-button>
		<!-- 表格 + 分页 -->
		<table-paging></table-paging>
		<!-- 新增对话框 -->
		<add-dialog 
			:dialog-form-visible="isShowAdd" 
			@closeDialogForm="closeDialogForm"
		/>
		<edit-dialog 
			:dialog-form-visible="isShowEdit" 
			@closeDialogForm="closeDialogForm"
		/>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	
	import TablePaging from 'components/common/pagination/TablePaging'
	import ExportButton from 'components/common/exportButton/ExportButton'
	
	import AddDialog from './childComps/AddDialog'
	import EditDialog from './childComps/EditDialog'
	import FormCondition from './childComps/FormCondition'
	
	export default {
		name: 'Third',
		components: {
			TablePaging,
			ExportButton,
			AddDialog,
			EditDialog,
			FormCondition
		},
		data() {
			return {
				checkAll: false,
				isShowAdd: false,
				isShowEdit: false
			}
		},
		computed: {
			...mapGetters(['getGroup1Length'])
		},
		methods: {
			...mapActions(['removeGroupData']),
			// 弹出新增对话框
			showAddDialog() {
				if (!this.isShowAdd) {
					this.isShowAdd = true
				}
			},
			// 弹出编辑对话框
			showEditDialog() {
				if (this.getGroup1Length == 0) {
					// this.$message.error('只能选择一条信息进行编辑')
					this.$message({
						message: '至少选择一条信息进行编辑',	// 提示信息
						type: 'warning',										// 弹出框类型
						duration: 1500											// 显示时间
					})
				} else if (this.getGroup1Length > 1) {
					this.$message({
						message: '只能选择一条信息进行编辑',
						type: 'warning',
						duration: 1500
					})
				} else {
					if (!this.isShowAdd) {
						this.isShowEdit = true
					}
				}
			},
			// 删除所选子项
			itemDelete() {
				if (this.getGroup1Length == 0) {
					this.$message({
						message: '至少选择一条信息进行删除',
						type: 'error',
						duration: 1500
					})
				} else if (this.getGroup1Length > 1) {
					this.$message({
						message: '只能选择一条信息进行删除',
						type: 'error',
						duration: 1500
					})
				} else {
					// 删除数据
					this.removeGroupData(this.$store.state.checkboxGroup1[0]).then(res => {
						this.$message({
							message: res,
							type: 'success',
							duration: 1500
						})
					})
				}
			},
			// 关闭对话框
			closeDialogForm() {
				this.isShowAdd = false
				this.isShowEdit = false
			}
		}
	}
</script>

<style scoped>
	/* .form-condition {
		background-color: #eee;
	} */
	
	.parent {
		position: relative;
	}
</style>
