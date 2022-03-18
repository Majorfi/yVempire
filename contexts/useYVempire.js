import	React, {useContext, createContext}		from	'react';
import	axios									from	'axios';
import	{request, gql}							from	'graphql-request';
import	{toAddress}								from	'utils';
import	AAVE_V1									from	'utils/yVempire/AaveV1';
import	AAVE_V2									from	'utils/yVempire/AaveV2';
import	AAVE_V2_FTM								from	'utils/yVempire/AaveV2Ftm';
import	COMPOUND								from	'utils/yVempire/Compound';
import	{rayPow, valueToZDBigNumber, normalize} from 'utils/rayMath';


import {ethers} from 'ethers';
import {
	UiPoolDataProvider,
	UiIncentiveDataProvider,
	ChainId,
} from '@aave/contract-helpers';




function getProvider(chain = 'ethereum') {
	return new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');
}

const	PAIRS = [...COMPOUND, ...AAVE_V1, ...AAVE_V2];
const	AAVE_V1_QUERY = gql`{protocolData(lendingPoolAddressProvider: "0xacc030ef66f9dfeae9cbb0cd1b25654b82cfa8d5"){reserves {underlyingAsset liquidityRate decimals priceInMarketReferenceCurrency}}}`;
const	AAVE_V2_QUERY = gql`{reserves {name underlyingAsset decimals id liquidityRate aEmissionPerSecond aTokenIncentivesIndex  aIncentivesLastUpdateTimestamp totalATokenSupply}}`;

function	calculateAAVEV2APY({liquidityRate}) {
	const	RAY = 1e27;
	const	SECONDS_PER_YEAR = 31536000;
	const supplyAPY = rayPow(valueToZDBigNumber(liquidityRate).dividedBy(SECONDS_PER_YEAR).plus(RAY), SECONDS_PER_YEAR).minus(RAY);

	return (normalize(supplyAPY, 27) * 100);
}

const	YVempireContext = createContext();
export const YVempireContextApp = ({children}) => {
	const	[yVempireData, set_yVempireData] = React.useState(PAIRS);
	const	[yVempireDataFtm, set_yVempireDataFtm] = React.useState(AAVE_V2_FTM);

	async function fetchReserveAaveV2Ftm() {
		const uiPoolDataProviderAddress = '0x1CCbfeC508da8D5242D5C1b368694Ab0066b39f1';
		const lendingPoolAddressProvider = '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb';
		const poolDataProviderContract = new UiPoolDataProvider({uiPoolDataProviderAddress, provider: getProvider()});
		const data = await poolDataProviderContract.getReservesHumanized({
			lendingPoolAddressProvider,
		});
		data.reserves = data.reservesData;
		return data;
	}


	const retrieveUTokenBalancesForChain1 = React.useCallback(async () => {
		const	[{data: yearnData}, compoundV2Data, aaveV1Data, aaveV2Data] = await Promise.all([
			axios.get('https://api.yearn.finance/v1/chains/1/vaults/all'),
			axios.get('https://api.compound.finance/api/v2/ctoken'),
			request('https://cache-api-mainnet.aave.com/graphql', AAVE_V1_QUERY),
			request('https://api.thegraph.com/subgraphs/name/aave/protocol-v2', AAVE_V2_QUERY)
		]);


		const	_yVempireData = yVempireData;
		for (let index = 0; index < _yVempireData.length; index++) {
			const	pair = _yVempireData[index];
			const	currentYearnVault = yearnData.find(yv => yv.address === pair.yvToken.address);
			_yVempireData[index].yvToken.apy = (currentYearnVault?.apy?.net_apy || 0) * 100;

			if (pair.service === 0) {
				const	compoundV2 = (compoundV2Data.data.cToken).find(cmp2 => toAddress(cmp2.underlying_address) === toAddress(pair.underlyingAddress));
				if (compoundV2) {
					_yVempireData[index].uToken.apy = Number(compoundV2.supply_rate.value * 100);
					console.warn(_yVempireData[index].uToken.apy);
				}
			} else if (pair.service === 1) {
				const	aaveV1 = (aaveV1Data.protocolData.reserves).find(av1 => toAddress(av1.underlyingAsset) === toAddress(pair.underlyingAddress));
				if (aaveV1) {
					_yVempireData[index].uToken.apy = Number(aaveV1.liquidityRate) / 1e25;
				}
			} else if (pair.service === 2) {
				const	aaveV2 = (aaveV2Data.reserves).find(av2 => toAddress(av2.underlyingAsset) === toAddress(pair.underlyingAddress));
				if (aaveV2) {
					_yVempireData[index].uToken.apy = calculateAAVEV2APY({liquidityRate: aaveV2.liquidityRate});
				}
			}
			set_yVempireData(p => {p[index] = _yVempireData[index]; return p;});
		}
	}, [yVempireData]);

	const retrieveUTokenBalancesForChain250 = React.useCallback(async () => {
		const	[{data: yearnData}, aaveV2Data] = await Promise.all([
			axios.get('https://api.yearn.finance/v1/chains/250/vaults/all'),
			fetchReserveAaveV2Ftm()
		]);


		const	_yVempireDataFtm = yVempireDataFtm;
		for (let index = 0; index < _yVempireDataFtm.length; index++) {
			const	pair = _yVempireDataFtm[index];
			const	currentYearnVault = yearnData.find(yv => yv.address === pair.yvToken.address);
			_yVempireDataFtm[index].yvToken.apy = (currentYearnVault?.apy?.net_apy || 0) * 100;

			if (pair.service === 2) {
				const	aaveV2 = (aaveV2Data.reserves).find(av2 => toAddress(av2.underlyingAsset) === toAddress(pair.underlyingAddress));
				if (aaveV2) {
					_yVempireDataFtm[index].uToken.apy = calculateAAVEV2APY({liquidityRate: aaveV2.liquidityRate});
				}
			}
			set_yVempireDataFtm(p => {p[index] = _yVempireDataFtm[index]; return p;});
		}
	}, [yVempireDataFtm]);

	React.useEffect(() => {
		retrieveUTokenBalancesForChain1();
		retrieveUTokenBalancesForChain250();
	}, [retrieveUTokenBalancesForChain1, retrieveUTokenBalancesForChain250]);

	return (
		<YVempireContext.Provider value={{yVempireData, yVempireDataFtm}}>
			{children}
		</YVempireContext.Provider>
	);
};

export const useYVempire = () => useContext(YVempireContext);
export default useYVempire;
