const Dotenv = require('dotenv-webpack');

module.exports = ({
	experimental: {
		concurrentFeatures: true
	},
	plugins: [new Dotenv()],
	images: {
		domains: [
			'rawcdn.githack.com'
		]
	},
	env: {
		VAULT_SWAPPER_ADDR: '0xEB8D98f9E42a15b0Eb35315F737bdfDa1a8D2Eaa',
		WEBSITE_URI: 'https://vempire.ycorpo.com/',
		YDAEMON_API_URL: 'https://ydaemon.yearn.finance',
		WEBSITE_NAME: 'yVempire',
		WEBSITE_TITLE: 'yVempire',
		WEBSITE_DESCRIPTION: 'Get a better yield',
		PROJECT_GITHUB_URL: 'https://github.com/Majorfi/yVempire',
		USE_WALLET: true,
		USE_PRICES: true,
		USE_NETWORKS: true,
		USE_FEEDBACKS: false,
		USE_PRICE_TRI_CRYPTO: false,
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			250: process.env.RPC_URL_FANTOM || 'https://rpc.ftm.tools',
			42161: process.env.RPC_URL_ARBITRUM || 'https://arbitrum.public-rpc.com'
		},
		CG_IDS: ['ethereum', 'yearn-finance', 'dai', 'usd-coin', 'tether', 'wrapped-bitcoin', 'chainlink', 'uniswap', 'nusd', 'rai', 'havven']
	}
});
