const	AAVE_V2 = [
	{
		service: 2,
		decimals: 18,
		underlyingName: 'DAI',
		cgID: 'dai',
		underlyingAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
		image: '/tokens/0x6b175474e89094c44da98b954eedeac495271d0f.svg',
		description: 'DAI is an Ethereum-based stablecoin whose issuance and development is managed by the Maker Protocol and MakerDAO. The price of DAI is soft-pegged to the U.S. dollar and is collateralized by a mix of other cryptocurrencies that are deposited into smart-contract vaults every time new DAI is minted.',
		uToken: {
			name: 'aDAI',
			image: '/uTokens/0x028171bca77440897b824ca71d1c56cac55b68a3.svg',
			address: '0x028171bca77440897b824ca71d1c56cac55b68a3',
			apy: 0,
		},
		yvToken: {
			name: 'yvDAI',
			image: '/yvTokens/0xdA816459F1AB5631232FE5e97a05BBBb94970c95.svg',
			address: '0xdA816459F1AB5631232FE5e97a05BBBb94970c95',
			apy: 0,
		}
	},
	{
		service: 2,
		decimals: 6,
		underlyingName: 'USDC',
		cgID: 'usd-coin',
		underlyingAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
		image: '/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg',
		description: 'USD Coin is a stablecoin that is pegged to the U.S. dollar on a 1:1 basis. Every unit of this cryptocurrency in circulation is backed up by $1 that is held in reserve, in a mix of cash and short-term U.S. Treasury bonds. The Centre consortium, which is behind this asset, says USDC is issued by regulated financial institutions.',
		uToken: {
			name: 'aUSDC',
			image: '/uTokens/0xBcca60bB61934080951369a648Fb03DF4F96263C.svg',
			address: '0xBcca60bB61934080951369a648Fb03DF4F96263C',
			apy: 0,
		},
		yvToken: {
			name: 'yvUSDC',
			image: '/yvTokens/0x5f18C75AbDAe578b483E5F43f12a39cF75b973a9.svg',
			address: '0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE',
			apy: 0,
		}
	},
	{
		service: 2,
		decimals: 6,
		underlyingName: 'USDT',
		cgID: 'tether',
		underlyingAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
		image: '/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.svg',
		description: 'USDT is a centralized stablecoin that mirrors the price of the U.S. dollar, issued by Hong Kong-based company Tether. The token’s peg to the USD is achieved via maintaining a sum of commercial paper, fiduciary deposits, cash, reserve repo notes, and treasury bills in reserves that is equal in USD value to the number of USDT in circulation.',
		uToken: {
			name: 'aUSDT',
			image: '/uTokens/0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811.svg',
			address: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',
			apy: 0,
		},
		yvToken: {
			name: 'yvUSDT',
			image: '/yvTokens/0x7Da96a3891Add058AdA2E826306D812C638D87a7.svg',
			address: '0x7Da96a3891Add058AdA2E826306D812C638D87a7',
			apy: 0,
		}
	},
	{
		service: 2,
		decimals: 18,
		underlyingName: 'WETH',
		cgID: 'ethereum',
		underlyingAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
		image: '/tokens/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.svg',
		description: 'WETH refers to an ERC-20 compatible version of ether. ERC-20 is a technical standard developed after the release of ETH that allow tokens created on the Ethereum blockchain to interact with each other. \nIn order for ETH to be exchanged with other ERC-20s it needs to be wrapped into WETH. 1 ETH = 1 WETH.',
		uToken: {
			name: 'aWETH',
			image: '/uTokens/0x030bA81f1c18d280636F32af80b9AAd02Cf0854e.svg',
			address: '0x030bA81f1c18d280636F32af80b9AAd02Cf0854e',
			apy: 0,
		},
		yvToken: {
			name: 'yvWETH',
			image: '/yvTokens/0xa258C4606Ca8206D8aA700cE2143D7db854D168c.svg',
			address: '0xa258C4606Ca8206D8aA700cE2143D7db854D168c',
			apy: 0,
		}
	},
	{
		service: 2,
		decimals: 8,
		underlyingName: 'WBTC',
		cgID: 'wrapped-bitcoin',
		underlyingAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
		image: '/tokens/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599.svg',
		description: 'Wrapped Bitcoin is a tokenized version of Bitcoin. The Wrapped Tokens project was founded as a joint project of three organizations: BitGo, Kyber Network and Ren. BitGo also serves as the entity that holds WBTC tokens and the keys needed to mint more of them. WBTC is backed by Bitcoin at a 1:1 ratio.',
		uToken: {
			name: 'aWBTC',
			image: '/uTokens/0x9ff58f4fFB29fA2266Ab25e75e2A8b3503311656.svg',
			address: '0x9ff58f4fFB29fA2266Ab25e75e2A8b3503311656',
			apy: 0,
		},
		yvToken: {
			name: 'yvWBTC',
			image: '/yvTokens/0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E.svg',
			address: '0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E',
			apy: 0,
		}
	},
	{
		service: 2,
		decimals: 18,
		underlyingName: 'SUSD',
		cgID: 'nusd',
		underlyingAddress: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
		image: '/tokens/0x57Ab1ec28D129707052df4dF418D58a2D46d5f51.svg',
		description: 'Hegic is an on-chain options trading protocol that is powered by hedge contracts and liquidity pools on Ethereum (ETH). A hedge contract is an options-like, on-chain contract that gives the holder or buyer a right to buy or sell an asset at a certain price (strike) as well as imposes an obligation on the writer or seller to buy or sell an asset at a certain time period. HEGIC tokens are used for protocol governance and can be staked for protocol fees.',
		uToken: {
			name: 'aSUSD',
			image: '/uTokens/0x6C5024Cd4F8A59110119C56f8933403A539555EB.svg',
			address: '0x6C5024Cd4F8A59110119C56f8933403A539555EB',
			apy: 0,
		},
		yvToken: {
			name: 'yvSUSD',
			image: '/yvTokens/0xa5cA62D95D24A4a350983D5B8ac4EB8638887396.svg',
			address: '0x5a770DbD3Ee6bAF2802D29a901Ef11501C44797A',
			apy: 0,
		}
	},
	{
		service: 2,
		decimals: 18,
		underlyingName: 'LINK',
		cgID: 'chainlink',
		underlyingAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
		image: '/tokens/0x514910771AF9Ca656af840dff83E8264EcF986CA.svg',
		description: 'Through a decentralized oracle network, Chainlink allows blockchains to securely interact with external data feeds, events and payment methods, providing the critical off-chain information needed by complex smart contracts. The Chainlink Network is driven by a large open-source community.',
		uToken: {
			name: 'aLINK',
			image: '/uTokens/0xa06bC25B5805d5F8d82847D191Cb4Af5A3e873E0.svg',
			address: '0xa06bC25B5805d5F8d82847D191Cb4Af5A3e873E0',
			apy: 0,
		},
		yvToken: {
			name: 'yvLINK',
			image: '/yvTokens/0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2.svg',
			address: '0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2',
			apy: 0,
		}
	},
	{
		service: 2,
		decimals: 18,
		underlyingName: 'RAI',
		cgID: 'rai',
		underlyingAddress: '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919',
		image: '/tokens/0x03ab458634910aad20ef5f1c8ee96f1d6ac54919.svg',
		description: 'RAI is a non pegged, ETH backed stable asset built by Reflexer. It is the first asset of its kind that, instead of being pegged to a specific target such as the USD, it freely floats while it’s being influenced by market forces. RAI’s mission is to become a crypto native and governance minimized stable asset that is detached from fiat.',
		uToken: {
			name: 'aRAI',
			image: '/uTokens/0xc9BC48c72154ef3e5425641a3c747242112a46AF.svg',
			address: '0xc9BC48c72154ef3e5425641a3c747242112a46AF',
			apy: 0,
		},
		yvToken: {
			name: 'yvRAI',
			image: '/yvTokens/0x873fB544277FD7b977B196a826459a69E27eA4ea.svg',
			address: '0x873fB544277FD7b977B196a826459a69E27eA4ea',
			apy: 0,
		}
	},
	{
		service: 2,
		decimals: 18,
		underlyingName: 'SNX',
		cgID: 'havven',
		underlyingAddress: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
		image: '/tokens/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F.svg',
		description: 'Synthetix is DeFi protocol that provides on-chain exposure to a wide variety of crypto and non-crypto assets. The protocol offers users access to highly liquid synthetic synths. Synths track and provide returns on the underlying asset without requiring one to directly hold the asset. SNX tokens are used for protocol governance and can also be used as collateral to mint synths.',
		uToken: {
			name: 'aSNX',
			image: '/uTokens/0x35f6B052C598d933D69A4EEC4D04c73A191fE6c2.svg',
			address: '0x35f6B052C598d933D69A4EEC4D04c73A191fE6c2',
			apy: 0,
		},
		yvToken: {
			name: 'yvSNX',
			image: '/yvTokens/0xF29AE508698bDeF169B89834F76704C3B205aedf.svg',
			address: '0xF29AE508698bDeF169B89834F76704C3B205aedf',
			apy: 0,
		}
	},
	{
		service: 2,
		decimals: 18,
		underlyingName: 'UNI',
		cgID: 'uniswap',
		underlyingAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
		image: '/tokens/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984.svg',
		description: 'UNI is the governance token for Uniswap, an Automated Market Market DEX on the Ethereum blockchain. The UNI token allows token holders to participate in the governance of the protocol. Key decisions such as usage of the treasury or future upgrades can be decided through a governance vote.',
		uToken: {
			name: 'aUNI',
			image: '/uTokens/0xB9D7CB55f463405CDfBe4E90a6D2Df01C2B92BF1.svg',
			address: '0xB9D7CB55f463405CDfBe4E90a6D2Df01C2B92BF1',
			apy: 0,
		},
		yvToken: {
			name: 'yvUNI',
			image: '/yvTokens/0xFBEB78a723b8087fD2ea7Ef1afEc93d35E8Bed42.svg',
			address: '0xFBEB78a723b8087fD2ea7Ef1afEc93d35E8Bed42',
			apy: 0,
		}
	},
	{
		service: 2,
		decimals: 18,
		underlyingName: 'YFI',
		cgID: 'yearn-finance',
		underlyingAddress: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
		image: '/tokens/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e.svg',
		description: 'Yearn Finance is a suite of products in Decentralized Finance (DeFi) that provides yield aggregation, a decentralized money market, and several other DeFi building blocks on the Ethereum blockchain. The protocol is maintained by various independent developers and is governed by YFI holders.',
		uToken: {
			name: 'aYFI',
			image: '/uTokens/0x5165d24277cD063F5ac44Efd447B27025e888f37.svg',
			address: '0x5165d24277cD063F5ac44Efd447B27025e888f37',
			apy: 0,
		},
		yvToken: {
			name: 'yvYFI',
			image: '/yvTokens/0xdb25cA703181E7484a155DD612b06f57E12Be5F0.svg',
			address: '0xdb25cA703181E7484a155DD612b06f57E12Be5F0',
			apy: 0,
		}
	},
];

export default AAVE_V2;