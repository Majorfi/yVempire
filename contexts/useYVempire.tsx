import	React, {ReactElement, useContext, createContext}	from	'react';
import	axios												from	'axios';
import	NProgress											from	'nprogress';
import	{useWeb3}											from	'@yearn/web-lib/contexts';
import	{request, gql}										from	'graphql-request';
import	{toAddress, providers, performBatchedUpdates}		from	'@yearn/web-lib/utils';
import	AAVE_V1												from	'utils/yVempire/AaveV1';
import	AAVE_V2												from	'utils/yVempire/AaveV2';
import	AAVE_V2_FTM											from	'utils/yVempire/AaveV2Ftm';
import	COMPOUND											from	'utils/yVempire/Compound';
import	{rayPow, valueToZDBigNumber, normalize} 			from	'utils/rayMath';
import	{UiPoolDataProvider}								from	'@aave/contract-helpers';

const	PAIRS = [...COMPOUND, ...AAVE_V1, ...AAVE_V2];
const	PAIRS_FTM = [...AAVE_V2_FTM];
const	AAVE_V1_QUERY = gql`{protocolData(lendingPoolAddressProvider: "0xacc030ef66f9dfeae9cbb0cd1b25654b82cfa8d5"){reserves {underlyingAsset liquidityRate decimals priceInMarketReferenceCurrency}}}`;
const	AAVE_V2_QUERY = gql`{reserves(where: {aEmissionPerSecond_gt: 0}) {name underlyingAsset decimals id liquidityRate aEmissionPerSecond aTokenIncentivesIndex  aIncentivesLastUpdateTimestamp totalATokenSupply}}`;

export type TPair = {
	service: number,
	decimals: number,
	underlyingName: string,
	cgID: string,
	underlyingAddress: string,
	image: string,
	description: string,
	uToken: {
		name: string,
		image: string,
		address: string,
		apy: number
	},
	yvToken: {
		name: string,
		image: string,
		address: string,
		apy: number
	}
}

function	calculateAAVEV2APY({liquidityRate}: {liquidityRate: string}): number {
	const	RAY = 1e27;
	const	SECONDS_PER_YEAR = 31536000;
	const	supplyAPY = (rayPow((valueToZDBigNumber(liquidityRate) as any).dividedBy(SECONDS_PER_YEAR).plus(RAY), SECONDS_PER_YEAR) as any).minus(RAY);
	const	normalized = normalize(supplyAPY, 27) || 0;
	return (Number(normalized) * 100);
}

type	TYVempireContext = {
	yVempireData: TPair[],
	yVempireDataFtm: TPair[],
	nonce: number
}
const	YVempireContext = createContext<TYVempireContext>({yVempireData: PAIRS, yVempireDataFtm: PAIRS_FTM, nonce: 0});
export const YVempireContextApp = ({children}: {children: ReactElement}): ReactElement => {
	const	{chainID} = useWeb3();
	const	[yVempireData, set_yVempireData] = React.useState(PAIRS);
	const	[yVempireDataFtm, set_yVempireDataFtm] = React.useState(PAIRS_FTM);
	const	[nonce, set_nonce] = React.useState(0);
	const	getUTokenIsRunning = React.useRef(false);
	const	getUTokenRunNonce = React.useRef(0);

	React.useEffect((): void => {
		if (getUTokenIsRunning.current) {
			getUTokenIsRunning.current = false;
			getUTokenRunNonce.current = getUTokenRunNonce.current + 1;
		}
	}, [chainID]);

	async function fetchReserveAaveV2Ftm(): Promise<unknown> {
		const uiPoolDataProviderAddress = '0x1CCbfeC508da8D5242D5C1b368694Ab0066b39f1';
		const lendingPoolAddressProvider = '0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb';
		const poolDataProviderContract = new UiPoolDataProvider({
			uiPoolDataProviderAddress,
			chainId: 250,
			provider: providers.getProvider(250)
		});
		const data = await poolDataProviderContract.getReservesHumanized({
			lendingPoolAddressProvider
		});
		(data as any).reserves = data.reservesData;
		return data;
	}

	const getUTokenBalancesForChain1 = React.useCallback(async (shouldUseProgress: boolean): Promise<void> => {
		if (getUTokenIsRunning.current)
			return;
		if (shouldUseProgress)
			NProgress.start();
		getUTokenIsRunning.current = true;
		const currentNonce = getUTokenRunNonce.current;

		const	[{data: yearnData}, compoundV2Data, aaveV1Data, aaveV2Data] = await Promise.all([
			axios.get('https://api.yearn.finance/v1/chains/1/vaults/all'),
			axios.get('https://api.compound.finance/api/v2/ctoken'),
			request('https://cache-api-mainnet.aave.com/graphql', AAVE_V1_QUERY),
			request('https://api.thegraph.com/subgraphs/name/aave/protocol-v2', AAVE_V2_QUERY)
		]);


		const	_yVempireData = yVempireData;
		for (const pair of _yVempireData) {
			const	currentYearnVault = yearnData.find((yv: any): boolean => yv.address === pair.yvToken.address);
			pair.yvToken.apy = (currentYearnVault?.apy?.net_apy || 0) * 100;

			if (pair.service === 0) {
				const	compoundV2 = (compoundV2Data.data.cToken).find((cmp2: any): boolean => toAddress(cmp2.underlying_address) === toAddress(pair.underlyingAddress));
				if (compoundV2) {
					pair.uToken.apy = Number(compoundV2.supply_rate.value * 100);
				}
			} else if (pair.service === 1) {
				const	aaveV1 = (aaveV1Data.protocolData.reserves).find((av1: any): boolean => toAddress(av1.underlyingAsset) === toAddress(pair.underlyingAddress));
				if (aaveV1) {
					pair.uToken.apy = Number(aaveV1.liquidityRate) / 1e25;
				}
			} else if (pair.service === 2) {
				const	aaveV2 = (aaveV2Data.reserves).find((av2: any): boolean => toAddress(av2.underlyingAsset) === toAddress(pair.underlyingAddress));
				if (aaveV2) {
					pair.uToken.apy = calculateAAVEV2APY({liquidityRate: aaveV2.liquidityRate});
				}
			}
		}

		getUTokenIsRunning.current = false;
		if (getUTokenRunNonce.current === currentNonce) {
			performBatchedUpdates((): void => {
				set_yVempireData(_yVempireData);
				set_nonce(nonce + 1);
				if (shouldUseProgress)
					NProgress.done();
			});
		}
	}, [yVempireData]);

	const getUTokenBalancesForChain250 = React.useCallback(async (shouldUseProgress: boolean): Promise<void> => {
		if (getUTokenIsRunning.current)
			return;
		if (shouldUseProgress)
			NProgress.start();
		getUTokenIsRunning.current = true;
		const currentNonce = getUTokenRunNonce.current;

		const	[{data: yearnData}, aaveV2Data] = await Promise.all([
			axios.get('https://api.yearn.finance/v1/chains/250/vaults/all'),
			fetchReserveAaveV2Ftm()
		]);

		const	_yVempireDataFtm = yVempireDataFtm;
		for (const pair of _yVempireDataFtm) {
			const	currentYearnVault = yearnData.find((yv: any): boolean => yv.address === pair.yvToken.address);
			pair.yvToken.apy = (currentYearnVault?.apy?.net_apy || 0) * 100;

			if (pair.service === 2) {
				const	aaveV2 = ((aaveV2Data as any).reserves).find((av2: any): boolean => toAddress(av2.underlyingAsset) === toAddress(pair.underlyingAddress));
				if (aaveV2) {
					pair.uToken.apy = calculateAAVEV2APY({liquidityRate: aaveV2.liquidityRate});
				}
			}
		}

		getUTokenIsRunning.current = false;
		if (getUTokenRunNonce.current === currentNonce) {
			performBatchedUpdates((): void => {
				set_yVempireDataFtm(_yVempireDataFtm);
				set_nonce(nonce + 1);
				if (shouldUseProgress)
					NProgress.done();
			});
		}
	}, [yVempireDataFtm]);

	const getUTokenBalancesForChain = React.useCallback(async (): Promise<void> => {
		if ([0, 1, 1337].includes(chainID)) {
			await getUTokenBalancesForChain1(true);
			getUTokenBalancesForChain250(false);
		} else if (chainID === 250) {
			await getUTokenBalancesForChain250(true);
			getUTokenBalancesForChain1(false);
		}
	}, [getUTokenBalancesForChain1, getUTokenBalancesForChain250, chainID]);

	React.useEffect((): void => {
		getUTokenBalancesForChain();
	}, [getUTokenBalancesForChain]);

	return (
		<YVempireContext.Provider value={{yVempireData, yVempireDataFtm, nonce}}>
			{children}
		</YVempireContext.Provider>
	);
};


export const useYVempire = (): TYVempireContext => useContext(YVempireContext);
export default useYVempire;
