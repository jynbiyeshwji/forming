module.exports = {
	configureWebpack: {
		resolve: {
			// 配置别名
			alias: {
				// '@': 'src'		默认
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'router': '@/router',
				'views': '@/views',
				'store': '@/store'
			}
		}
	},
	publicPath: './'
}
