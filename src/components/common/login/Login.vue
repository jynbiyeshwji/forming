<template>
	<!-- 登录 -->
	<div class="loginPage">
		<!-- 图片文字 -->
		<div>
			<!-- <img src="~assets/img/Login.png" alt="MDI成型系统"> -->
		</div>
		<div class="word">
			<span class="agency">随便系统</span>
			<span class="versions">v1.5.10</span>
		</div>
		<!-- 账号密码 -->
		<div class="main">
			<div class="input">
				<span class="label">账号</span>
				<span class="Inputbox">
					<el-input v-model="account" placeholder="请输入账号"></el-input>
				</span>
			</div>
			<div class="input">
				<span class="label">密码</span>
				<span class="Inputbox">
					<el-input v-model="password" placeholder="请输入密码"></el-input>
				</span>
			</div>
			<!-- 多选框 -->
			<div class="checkBox">
				<el-radio v-model="radio" label="1">管理员</el-radio>
				<el-radio v-model="radio" label="2">用户</el-radio>
			</div>
			<!-- 登录 -->
			<div>
				<el-button @click="toHome">登录</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				account: "",	//账号
				password: "",	//密码
				radio: "1"	//选中管理员还是普通用户
			}
		},
		methods: {
			toHome() {
				if (this.account != "" && this.password != "") {
					if (this.radio == "1") {
						if (this.account == "1" && this.password == "1") {
							let info = {}
							info.account = this.account
							info.password = this.password
							// 存储账号的相关信息
							sessionStorage.setItem('info', JSON.stringify(info))
							this.$router.push('/first')
							this.account = ''
							this.password = ''
						} else {
							this.$alert("账号或密码错误", "提示", {
								confirmButtonText: "确定",
								callback: action => {}
							})
							this.account = ''
							this.password = ''
						}
					} else if (this.radio == "2") {
						if (this.account == "2" && this.password == "2") {
							let info = {}
							info.account = this.account
							info.password = this.password
							sessionStorage.setItem('info', JSON.stringify(info))
							this.$router.push('/first')
							this.account = ''
							this.password = ''
						} else {
							this.$alert("账号或密码错误", "提示", {
								confirmButtonText: "确定",
								callback: action => {}
							})
							this.account = ''
							this.password = ''
						}
					}
				} else {
					this.$alert("请输入账号和密码", "提示", {
						confirmButtonText: "确定",
						callback: action => {}
					})
					this.account = ''
					this.password = ''
				}
			}
		}
	}
</script>

<style scoped>
	.loginPage {
		text-align: center;
		margin-top: 6%;
	}
	
	.word {
		margin: 5px;
	}
	
	.agency {
		display: inline-block;
		margin-right: 5px;
		margin-left: 30px;
		font-size: 24px;
	}
	
	.versions {
		font-size: 14px;
		color: gray;
	}
	
	.main {
		width: 340px;
		margin: 50px auto;
	}
	
	.input {
		margin-bottom: 20px;
	}
	
	.label {
		display: inline-block;
		width: 60px;
		font-size: 14px;
		line-height: 32px;
		height: 40px;
		color: #555;
		text-align: center;
		background-color: #eee;
		border: 1px solid #dcdfe6;
		border-collapse: collapse;
		border-right: 0;
		vertical-align: top;
	}
	
	.Inputbox {
		display: inline-block;
		border-collapse: collapse;
		border-left: 0;
		width: 260px;
		vertical-align: top;
	}
	
	.checkBox {
		margin-bottom: 10px;
	}
</style>
