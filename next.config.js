/* eslint-disable @typescript-eslint/explicit-function-return-type */
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV !== 'production'
});
const {PHASE_EXPORT} = require('next/constants');


module.exports = (phase) => withPWA({
	assetPrefix: process.env.IPFS_BUILD === 'true' || phase === PHASE_EXPORT ? './' : '/',
	images: {
		unoptimized: process.env.IPFS_BUILD === 'true' || phase === PHASE_EXPORT, //Exporting image does not support optimization
		domains: [
			'rawcdn.githack.com',
			'raw.githubusercontent.com'
		]
	},
	env: {
		/* 🔵 - Yearn Finance **************************************************
		** Config over the RPC
		**********************************************************************/
		WEB_SOCKET_URL: {
			1: process.env.WS_URL_MAINNET,
			10: process.env.WS_URL_OPTIMISM,
			250: process.env.WS_URL_FANTOM,
			42161: process.env.WS_URL_ARBITRUM
		},
		JSON_RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			10: process.env.RPC_URL_OPTIMISM,
			250: process.env.RPC_URL_FANTOM,
			42161: process.env.RPC_URL_ARBITRUM
		},
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		INFURA_KEY: process.env.INFURA_KEY,

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
		CG_IDS: ['ethereum', 'yearn-finance', 'dai', 'usd-coin', 'tether', 'wrapped-bitcoin', 'chainlink', 'uniswap', 'nusd', 'rai', 'havven']
	}
});
