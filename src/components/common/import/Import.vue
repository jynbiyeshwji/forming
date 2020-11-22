<template>
	<el-upload
		class="upload-demo"
		ref="upload"
		:limit="1"
		name="articleImage"
		:file-list="fileList"
		:on-success="onSuccessData"
		action="http://192.168.1.113:9305/upload/image/uploadImg"
		:before-upload="beforeUpload">
		<el-button slot="trigger" type="primary">导入</el-button>
		<a href="http://10.250.148.119/excel/設備表.xlsx" rel="external nofollow" download="模板">
			<el-button type="success">下载模板</el-button>
		</a>
		<el-button 
			style="margin-left: 10px;" 
			size="small" type="success" 
			@click="submitUpload"
		>
			上传到服务器
		</el-button>
		<div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过5MB</div>
		<span slot="tip" class="el-upload-list__item-name">{{fileName}}</span>
	</el-upload> 
</template>

<script>
	export default {
		name: 'Import',
		data() {
			return {
				fileList: [],
				fileName: ''
			}
		},
		methods: {
			// 文件上传成功时触发的钩子函数
			onSuccessData(response, file, fileList) {
				console.log(response)
				console.log(file)
				console.log(fileList)
			},
			// 文件上传时的验证,自定义验证规则,
			beforeUpload(file){
				// debugger(打断点)
				console.log(file,'文件');
				this.files = file;
				const extension = file.name.split('.')[1] === 'xls'
				const extension2 = file.name.split('.')[1] === 'xlsx'
				const isLt2M = file.size / 1024 / 1024 < 5
				if (!extension && !extension2) {
					this.$message.warning('上传模板只能是 xls、xlsx格式!')
					return
				}
				if (!isLt2M) {
					this.$message.warning('上传模板大小不能超过 5MB!')
					return
				}
				this.fileName = file.name;
				// return false // 返回false不会自动上传
			},
			// 手动上传文件到服务器
			submitUpload() {
				console.log('上传'+this.files.name)
				if(this.fileName == "") {
					this.$message.warning('请选择要上传的文件！')
					return false
				}
				let fileFormData  = new FormData();
				fileFormData.append('articleImage', this.files, this.fileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
				let requestConfig = {
					headers: {
					'Content-Type': 'multipart/form-data'
					},
				}
				this.$axios.post(`/upload/image/uploadImg`, fileFormData, requestConfig)
				.then((res) => {
					console.log('上传数据后返或数据')
					console.log(res)
					 if (data && data.code === 0) {
						 this.$message({
							 message: '操作成功',
							 type: 'success',
							 duration: 1500,
							 onClose: () => {
							 this.visible = false
							 this.$emit('refreshDataList')
							 }
							})
					} else {
					this.$message.error(data.msg)
					}
				}) 
			},
		}
	}
</script>

<style>
</style>
