const	AAVE_V1 = [
	{
		service: 1,
		decimals: 18,
		underlyingName: 'DAI',
		cgID: 'dai',
		underlyingAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
		image: '/tokens/0x6b175474e89094c44da98b954eedeac495271d0f.svg',
		description: 'DAI is an Ethereum-based stablecoin whose issuance and development is managed by the Maker Protocol and MakerDAO. The price of DAI is soft-pegged to the U.S. dollar and is collateralized by a mix of other cryptocurrencies that are deposited into smart-contract vaults every time new DAI is minted.',
		uToken: {
			name: 'aDAI - v1',
			image: '/uTokens/0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d.svg',
			address: '0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d',
			apy: 0
		},
		yvToken: {
			name: 'yvDAI',
			image: '/yvTokens/0xdA816459F1AB5631232FE5e97a05BBBb94970c95.svg',
			address: '0xdA816459F1AB5631232FE5e97a05BBBb94970c95',
			apy: 0
		}
	},
	{
		service: 1,
		decimals: 6,
		underlyingName: 'USDC',
		cgID: 'usd-coin',
		underlyingAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
		image: '/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg',
		description: 'USD Coin is a stablecoin that is pegged to the U.S. dollar on a 1:1 basis. Every unit of this cryptocurrency in circulation is backed up by $1 that is held in reserve, in a mix of cash and short-term U.S. Treasury bonds. The Centre consortium, which is behind this asset, says USDC is issued by regulated financial institutions.',
		uToken: {
			name: 'aUSDC - v1',
			image: '/uTokens/0x9bA00D6856a4eDF4665BcA2C2309936572473B7E.svg',
			address: '0x9bA00D6856a4eDF4665BcA2C2309936572473B7E',
			apy: 0
		},
		yvToken: {
			name: 'yvUSDC',
			image: '/yvTokens/0x5f18C75AbDAe578b483E5F43f12a39cF75b973a9.svg',
			address: '0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE',
			apy: 0
		}
	},
	{
		service: 1,
		decimals: 6,
		underlyingName: 'USDT',
		cgID: 'tether',
		underlyingAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
		image: '/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.svg',
		description: 'USDT is a centralized stablecoin that mirrors the price of the U.S. dollar, issued by Hong Kong-based company Tether. The token’s peg to the USD is achieved via maintaining a sum of commercial paper, fiduciary deposits, cash, reserve repo notes, and treasury bills in reserves that is equal in USD value to the number of USDT in circulation.',
		uToken: {
			name: 'aUSDT - v1',
			image: '/uTokens/0x71fc860F7D3A592A4a98740e39dB31d25db65ae8.svg',
			address: '0x71fc860F7D3A592A4a98740e39dB31d25db65ae8',
			apy: 0
		},
		yvToken: {
			name: 'yvUSDT',
			image: '/yvTokens/0x7Da96a3891Add058AdA2E826306D812C638D87a7.svg',
			address: '0x7Da96a3891Add058AdA2E826306D812C638D87a7',
			apy: 0
		}
	},
	{
		service: 1,
		decimals: 18,
		underlyingName: 'WETH',
		cgID: 'ethereum',
		underlyingAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
		image: '/tokens/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.svg',
		description: 'WETH refers to an ERC-20 compatible version of ether. ERC-20 is a technical standard developed after the release of ETH that allow tokens created on the Ethereum blockchain to interact with each other. \nIn order for ETH to be exchanged with other ERC-20s it needs to be wrapped into WETH. 1 ETH = 1 WETH.',
		uToken: {
			name: 'aWETH - v1',
			image: '/uTokens/0x3a3A65aAb0dd2A17E3F1947bA16138cd37d08c04.svg',
			address: '0x3a3A65aAb0dd2A17E3F1947bA16138cd37d08c04',
			apy: 0
		},
		yvToken: {
			name: 'yvWETH',
			image: '/yvTokens/0xa258C4606Ca8206D8aA700cE2143D7db854D168c.svg',
			address: '0xa258C4606Ca8206D8aA700cE2143D7db854D168c',
			apy: 0
		}
	},
	{
		service: 1,
		decimals: 8,
		underlyingName: 'WBTC',
		cgID: 'wrapped-bitcoin',
		underlyingAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
		image: '/tokens/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599.svg',
		description: 'Wrapped Bitcoin is a tokenized version of Bitcoin. The Wrapped Tokens project was founded as a joint project of three organizations: BitGo, Kyber Network and Ren. BitGo also serves as the entity that holds WBTC tokens and the keys needed to mint more of them. WBTC is backed by Bitcoin at a 1:1 ratio.',
		uToken: {
			name: 'aWBTC - v1',
			image: '/uTokens/0xFC4B8ED459e00e5400be803A9BB3954234FD50e3.svg',
			address: '0xFC4B8ED459e00e5400be803A9BB3954234FD50e3',
			apy: 0
		},
		yvToken: {
			name: 'yvWBTC',
			image: '/yvTokens/0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E.svg',
			address: '0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E',
			apy: 0
		}
	},
	{
		service: 1,
		decimals: 18,
		underlyingName: 'SUSD',
		cgID: 'nusd',
		underlyingAddress: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
		image: '/tokens/0x57Ab1ec28D129707052df4dF418D58a2D46d5f51.svg',
		description: 'Hegic is an on-chain options trading protocol that is powered by hedge contracts and liquidity pools on Ethereum (ETH). A hedge contract is an options-like, on-chain contract that gives the holder or buyer a right to buy or sell an asset at a certain price (strike) as well as imposes an obligation on the writer or seller to buy or sell an asset at a certain time period. HEGIC tokens are used for protocol governance and can be staked for protocol fees.',
		uToken: {
			name: 'aSUSD - v1',
			image: '/uTokens/0x625aE63000f46200499120B906716420bd059240.svg',
			address: '0x625aE63000f46200499120B906716420bd059240',
			apy: 0
		},
		yvToken: {
			name: 'yvSUSD',
			image: '/yvTokens/0xa5cA62D95D24A4a350983D5B8ac4EB8638887396.svg',
			address: '0x5a770DbD3Ee6bAF2802D29a901Ef11501C44797A',
			apy: 0
		}
	},
	{
		service: 1,
		decimals: 18,
		underlyingName: 'LINK',
		cgID: 'chainlink',
		underlyingAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
		image: '/tokens/0x514910771AF9Ca656af840dff83E8264EcF986CA.svg',
		description: 'Through a decentralized oracle network, Chainlink allows blockchains to securely interact with external data feeds, events and payment methods, providing the critical off-chain information needed by complex smart contracts. The Chainlink Network is driven by a large open-source community.',
		uToken: {
			name: 'aLINK - v1',
			image: '/uTokens/0xA64BD6C70Cb9051F6A9ba1F163Fdc07E0DfB5F84.svg',
			address: '0xA64BD6C70Cb9051F6A9ba1F163Fdc07E0DfB5F84',
			apy: 0
		},
		yvToken: {
			name: 'yvLINK',
			image: '/yvTokens/0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2.svg',
			address: '0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2',
			apy: 0
		}
	},
	{
		service: 1,
		decimals: 18,
		underlyingName: 'SNX',
		cgID: 'havven',
		underlyingAddress: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
		image: '/tokens/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F.svg',
		description: 'Synthetix is a decentralized finance (DeFi) protocol that provides on-chain exposure to a wide variety of crypto and non-crypto assets. The protocol is based on the Ethereum (ETH) blockchain and offers users access to highly liquid synthetic assets (synths). Synths track and provide returns on the underlying asset without requiring one to directly hold the asset. SNX tokens are used for protocol governance and can also be used as collateral to mint synths.',
		uToken: {
			name: 'aSNX - v1',
			image: '/uTokens/0x328C4c80BC7aCa0834Db37e6600A6c49E12Da4DE.svg',
			address: '0x328C4c80BC7aCa0834Db37e6600A6c49E12Da4DE',
			apy: 0
		},
		yvToken: {
			name: 'yvSNX',
			image: '/yvTokens/0xF29AE508698bDeF169B89834F76704C3B205aedf.svg',
			address: '0xF29AE508698bDeF169B89834F76704C3B205aedf',
			apy: 0
		}
	},
	{
		service: 1,
		decimals: 18,
		underlyingName: 'UNI',
		cgID: 'uniswap',
		underlyingAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
		image: '/tokens/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984.svg',
		description: 'UNI is the governance token for Uniswap, an Automated Market Market DEX on the Ethereum blockchain. The UNI token allows token holders to participate in the governance of the protocol. Key decisions such as usage of the treasury or future upgrades can be decided through a governance vote.',
		uToken: {
			name: 'aUNI - v1',
			image: '/uTokens/0xB124541127A0A657f056D9Dd06188c4F1b0e5aab.svg',
			address: '0xB124541127A0A657f056D9Dd06188c4F1b0e5aab',
			apy: 0
		},
		yvToken: {
			name: 'yvUNI',
			image: '/yvTokens/0xFBEB78a723b8087fD2ea7Ef1afEc93d35E8Bed42.svg',
			address: '0xFBEB78a723b8087fD2ea7Ef1afEc93d35E8Bed42',
			apy: 0
		}
	},
	{
		service: 1,
		decimals: 18,
		underlyingName: 'YFI',
		cgID: 'yfi',
		underlyingAddress: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
		image: '/tokens/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e.svg',
		description: 'Yearn Finance is a suite of products in Decentralized Finance (DeFi) that provides yield aggregation, a decentralized money market, and several other DeFi building blocks on the Ethereum blockchain. The protocol is maintained by various independent developers and is governed by YFI holders.',
		uToken: {
			name: 'aYFI - v1',
			image: '/uTokens/0x12e51E77DAAA58aA0E9247db7510Ea4B46F9bEAd.svg',
			address: '0x12e51E77DAAA58aA0E9247db7510Ea4B46F9bEAd',
			apy: 0
		},
		yvToken: {
			name: 'yvYFI',
			image: '/yvTokens/0xdb25cA703181E7484a155DD612b06f57E12Be5F0.svg',
			address: '0xdb25cA703181E7484a155DD612b06f57E12Be5F0',
			apy: 0
		}
	}
];

export default AAVE_V1;