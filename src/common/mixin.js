import FileSaver from 'file-saver'
import XLSX from 'xlsx'

import tableData from 'views/table/index'

// import ExportButton from 'components/common/exportButton/ExportButton'

export const exportButton = {
	data() {
		return {
			// 导表按钮
			buttonDisable: false,	// 导表按钮是否禁用
			exportTime: 3,	//秒数
			exportCount: null,	//计时器
		}
	},
	components: {
		// ExportButton
	},
	methods: {
		// 导表按钮3秒内不能重复点击, 3秒后恢复
		exportButton() {
			this.buttonDisable = true;
			this.exportTime = 3;
			// setInterval()每1秒内调用函数
			this.exportCount = setInterval(() => {
				this.exportTime--;
				if (this.exportTime == 0) {
					// 当exportTime == 0时，停止调用setInterval()
					clearInterval(this.exportCount)
					this.buttonDisable = false;
				}
			}, 1000)
		},
		// 导出表格所用
		exportExcel() {
			this.exportButton();
			// 设置当前日期
			let time = new Date();
			let year = time.getFullYear();
			let month = time.getMonth() + 1;
			let day = time.getDate();
			let name = year + "" + month + "" + day;
			// console.log(name);
			/* generate workbook object from table */ 
			var wb = XLSX.utils.table_to_book(document.querySelector('.table'));
			/* get binary string as output */ 
			var wbout = XLSX.write(wb, {
				bookType: "xlsx",	// 要生成的文件类型
				bookSST: true,	// 是否生成Shared String Table,开启生成速度会下降
				type: "array"
			});
			try{
				// name+'.xlsx'表示导出的excel表格的名字
				FileSaver.saveAs(
					new Blob([wbout], {
						type: "application/octet-stream"
					}),
					name+'.xlsx'
				);
			} catch(e) {
				//TODO handle the exception
				if (typeof console !== "undefined") console.log(e, wbout);
			}
			return wbout;
		}
	}
}

// export const pagingButton = {
// 	data() {
// 		return {
// 			tableData,
// 			// 分页
// 			currentTableData: [],	// 当前页加载的数据
// 			cpageCount: null,	// 当前页数据条数
// 			pageSize: 5, // 每页显示条目个数
// 			currentPage: 1	,// 当前页
// 			cpageFirstIndex: null,	// 当前页第一条数据的下标
// 			cpageLastIndex: null	// 当前页最后一条数据的下标
// 		}
// 	},
// 	created() {
// 		this.tableData.forEach((item, i) => {
// 			if (this.cpageCount < this.pageSize) {
// 				this.cpageCount++
// 				this.currentTableData.push(item)
// 			}
// 		})
// 	},
// 	methods: {
// 		// 显示当前页数据
// 		showCurrentPageData() {
// 			this.cpageFirstIndex = this.pageSize * (this.currentPage - 1)
// 			this.cpageLastIndex = this.pageSize * this.currentPage - 1
// 			this.currentTableData = []
// 			this.cpageCount = 0
			
// 			this.tableData.forEach((item, i) => {
// 				if (i >= this.cpageFirstIndex && i <= this.cpageLastIndex && this.cpageCount < this.pageSize) {
// 					this.cpageCount++
// 					this.currentTableData.push(item)
// 				}
// 			})
// 			this.$emit('showData', this.currentTableData)
// 		},
// 		// 每页条数pageSize 改变时会触发
// 		handleSizeChange(pageSize) {
// 			this.pageSize = pageSize
// 			this.showCurrentPageData()
// 		},
// 		// 当前页currentPage 改变时会触发
// 		handleCurrentChange(page) {
// 			this.currentPage = page
// 			this.showCurrentPageData()
// 		},
// 		// 点击上一页按钮改变当前页后触发
// 		handlePrevClick() {
			
// 		},
// 		// 点击下一页按钮改变当前页后触发
// 		handleNextClick() {
			
// 		}
// 	}
// }
