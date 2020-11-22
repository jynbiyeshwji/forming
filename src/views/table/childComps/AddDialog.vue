<template>
	<el-dialog 
		title="新增" 
		:visible.sync="dialogFormVisible" 
		:before-close="handleClose"
		:close-on-click-modal="false"
	>
	  <el-form :model="form">
	    <el-form-item label="活动名称" :label-width="formLabelWidth">
	      <el-input v-model="form.name" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="活动区域" :label-width="formLabelWidth">
	      <el-select v-model="form.region" placeholder="请选择活动区域">
	        <el-option label="区域一" value="shanghai"></el-option>
	        <el-option label="区域二" value="beijing"></el-option>
	      </el-select>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="closeDialogForm(1)">取 消</el-button>
	    <el-button type="primary" @click="closeDialogForm(2)">确 定</el-button>
	  </div>
	</el-dialog>
</template>

<script>
	export default {
		props: {
			dialogFormVisible: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px'
			};
		},
		methods: {
			handleClose() {
				// 调用父组件事件
				this.$emit('closeDialogForm')
			},
			closeDialogForm(flag) {
				if (flag === 2) {
					// 调用后台，异步操作
					this.$message({
						message: '新增成功',
						type: 'success'
					})
				}
				// 调用父组件事件
				this.$emit('closeDialogForm')
			}
		}
	}
</script>

<style>
</style>
