const	AAVE_V2 = [
	{
		service: 2,
		chainID: 250,
		decimals: 18,
		underlyingName: 'DAI',
		cgID: 'dai',
		underlyingAddress: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
		image: '/tokens/0x6b175474e89094c44da98b954eedeac495271d0f.svg',
		description: 'DAI is an Ethereum-based stablecoin whose issuance and development is managed by the Maker Protocol and MakerDAO. The price of DAI is soft-pegged to the U.S. dollar and is collateralized by a mix of other cryptocurrencies that are deposited into smart-contract vaults every time new DAI is minted.',
		uToken: {
			name: 'aDAI',
			image: '/uTokens/0x028171bca77440897b824ca71d1c56cac55b68a3.svg',
			address: '0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE',
			apy: 0,
		},
		yvToken: {
			name: 'yvDAI',
			image: '/yvTokens/0xdA816459F1AB5631232FE5e97a05BBBb94970c95.svg',
			address: '0x637eC617c86D24E421328e6CAEa1d92114892439',
			apy: 0,
		}
	},
	{
		service: 2,
		chainID: 250,
		decimals: 6,
		underlyingName: 'USDC',
		cgID: 'usd-coin',
		underlyingAddress: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
		image: '/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg',
		description: 'USD Coin is a stablecoin that is pegged to the U.S. dollar on a 1:1 basis. Every unit of this cryptocurrency in circulation is backed up by $1 that is held in reserve, in a mix of cash and short-term U.S. Treasury bonds. The Centre consortium, which is behind this asset, says USDC is issued by regulated financial institutions.',
		uToken: {
			name: 'aUSDC',
			image: '/uTokens/0xBcca60bB61934080951369a648Fb03DF4F96263C.svg',
			address: '0x625E7708f30cA75bfd92586e17077590C60eb4cD',
			apy: 0,
		},
		yvToken: {
			name: 'yvUSDC',
			image: '/yvTokens/0x5f18C75AbDAe578b483E5F43f12a39cF75b973a9.svg',
			address: '0xEF0210eB96c7EB36AF8ed1c20306462764935607',
			apy: 0,
		}
	},
	{
		service: 2,
		chainID: 250,
		decimals: 6,
		underlyingName: 'USDT',
		cgID: 'tether',
		underlyingAddress: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
		image: '/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.svg',
		description: 'USDT is a centralized stablecoin that mirrors the price of the U.S. dollar, issued by Hong Kong-based company Tether. The token’s peg to the USD is achieved via maintaining a sum of commercial paper, fiduciary deposits, cash, reserve repo notes, and treasury bills in reserves that is equal in USD value to the number of USDT in circulation.',
		uToken: {
			name: 'aUSDT',
			image: '/uTokens/0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811.svg',
			address: '0x6ab707Aca953eDAeFBc4fD23bA73294241490620',
			apy: 0,
		},
		yvToken: {
			name: 'yvUSDT',
			image: '/yvTokens/0x7Da96a3891Add058AdA2E826306D812C638D87a7.svg',
			address: '0x148c05caf1Bb09B5670f00D511718f733C54bC4c',
			apy: 0,
		}
	},
	{
		service: 2,
		chainID: 250,
		decimals: 18,
		underlyingName: 'WETH',
		cgID: 'ethereum',
		underlyingAddress: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
		image: '/tokens/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.svg',
		description: 'WETH refers to an ERC-20 compatible version of ether. ERC-20 is a technical standard developed after the release of ETH that allow tokens created on the Ethereum blockchain to interact with each other. \nIn order for ETH to be exchanged with other ERC-20s it needs to be wrapped into WETH. 1 ETH = 1 WETH.',
		uToken: {
			name: 'aWETH',
			image: '/uTokens/0x030bA81f1c18d280636F32af80b9AAd02Cf0854e.svg',
			address: '0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8',
			apy: 0,
		},
		yvToken: {
			name: 'yvWETH',
			image: '/yvTokens/0xa258C4606Ca8206D8aA700cE2143D7db854D168c.svg',
			address: '0xCe2Fc0bDc18BD6a4d9A725791A3DEe33F3a23BB7',
			apy: 0,
		}
	},
	{
		service: 2,
		chainID: 250,
		decimals: 8,
		underlyingName: 'WBTC',
		cgID: 'wrapped-bitcoin',
		underlyingAddress: '0x321162Cd933E2Be498Cd2267a90534A804051b11',
		image: '/tokens/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599.svg',
		description: 'Wrapped Bitcoin is a tokenized version of Bitcoin. The Wrapped Tokens project was founded as a joint project of three organizations: BitGo, Kyber Network and Ren. BitGo also serves as the entity that holds WBTC tokens and the keys needed to mint more of them. WBTC is backed by Bitcoin at a 1:1 ratio.',
		uToken: {
			name: 'aWBTC',
			image: '/uTokens/0x9ff58f4fFB29fA2266Ab25e75e2A8b3503311656.svg',
			address: '0x078f358208685046a11C85e8ad32895DED33A249',
			apy: 0,
		},
		yvToken: {
			name: 'yvWBTC',
			image: '/yvTokens/0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E.svg',
			address: '0xd817A100AB8A29fE3DBd925c2EB489D67F758DA9',
			apy: 0,
		}
	},
	{
		service: 2,
		chainID: 250,
		decimals: 18,
		underlyingName: 'CRV',
		cgID: 'crv',
		underlyingAddress: '0x1E4F97b9f9F913c46F1632781732927B9019C68b',
		image: '/tokens/0x1E4F97b9f9F913c46F1632781732927B9019C68b.png',
		description: 'Curve Finance is an Automated Market Maker (AMM) based Decentralised Exchange (DEX). Unlike Uniswap, its main focus is only to swap between assets that are supposed to have the same value. Locked CRV tokens are used for protocol governance and also receive half of Curve\'s trading fees.',
		uToken: {
			name: 'aCRV',
			image: '/uTokens/0x513c7E3a9c69cA3e22550eF58AC1C0088e918FFf.svg',
			address: '0x513c7E3a9c69cA3e22550eF58AC1C0088e918FFf',
			apy: 0,
		},
		yvToken: {
			name: 'yvCRV',
			image: '/yvTokens/0x0446acaB3e0242fCf33Aa526f1c95a88068d5042.svg',
			address: '0x0446acaB3e0242fCf33Aa526f1c95a88068d5042',
			apy: 0,
		}
	},
	{
		service: 2,
		chainID: 250,
		decimals: 18,
		underlyingName: 'LINK',
		cgID: 'chainlink',
		underlyingAddress: '0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8',
		image: '/tokens/0x514910771AF9Ca656af840dff83E8264EcF986CA.svg',
		description: 'Through a decentralized oracle network, Chainlink allows blockchains to securely interact with external data feeds, events and payment methods, providing the critical off-chain information needed by complex smart contracts. The Chainlink Network is driven by a large open-source community.',
		uToken: {
			name: 'aLINK',
			image: '/uTokens/0xa06bC25B5805d5F8d82847D191Cb4Af5A3e873E0.svg',
			address: '0x191c10Aa4AF7C30e871E70C95dB0E4eb77237530',
			apy: 0,
		},
		yvToken: {
			name: 'yvLINK',
			image: '/yvTokens/0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2.svg',
			address: '0xf2d323621785A066E64282d2B407eAc79cC04966',
			apy: 0,
		}
	},
	{
		service: 2,
		chainID: 250,
		decimals: 18,
		underlyingName: 'WFTM',
		cgID: 'fantom',
		underlyingAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
		image: '/tokens/0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83.svg',
		description: 'Fantom is a smart contract platform that intends to solve the scalability issues of existing public distributed ledger technologies. The aim is to allow applications built on top of the Fantom Opera Chain to enjoy instant transactions and near zero transaction costs for all users.',
		uToken: {
			name: 'aWFTM',
			image: '/uTokens/0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97.svg',
			address: '0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97',
			apy: 0,
		},
		yvToken: {
			name: 'yvWFTM',
			image: '/yvTokens/0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0.svg',
			address: '0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0',
			apy: 0,
		}
	}

];

export default AAVE_V2;