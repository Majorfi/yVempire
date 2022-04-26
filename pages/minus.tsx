import	React, {ReactElement}						from	'react';
import	{ethers}									from	'ethers';
import	{Card, SearchBox, Switch, AlertBanner}		from	'@yearn/web-lib/components';
import	* as utils									from	'@yearn/web-lib/utils';
import	{useWeb3, useBalances}						from	'@yearn/web-lib/contexts';
import	{findBySearch}								from	'utils/filters';
import	useYVempire, {TPair}						from	'contexts/useYVempire';
import	{TDeltaPossibilities}						from	'components/DeltaSelector';
import	MigrateBox									from	'components/MigrateBox';

function	Index(): ReactElement {
	const	{chainID} = useWeb3();
	const	{balancesOf, rawBalancesOf, retrieveBalances} = useBalances();
	const	{yVempireData, yVempireDataFtm, nonce: dataNonce} = useYVempire();
	const	basePairs = React.useRef(yVempireData);
	const	[filteredPairData, set_filteredPairData] = React.useState<TPair[]>([]);
	const	[searchTerm, set_searchTerm] = React.useState('');
	const	[isOnlyWithBalance, set_isOnlyWithBalance] = React.useState(false);
	const	[deltaSelector] = React.useState<TDeltaPossibilities>('minus');
	const	[nonce, set_nonce] = React.useState(0); //used to trigger refresh

	/* 🔵 - Yearn Finance ******************************************************
	** This effect update the current basePairs to use based on the currently
	** selected chain.
	** Supported chains are 1 & 250.
	**************************************************************************/
	React.useEffect((): void => {
		if (chainID === 1) {
			basePairs.current = yVempireData;
		} else if (chainID === 250) {
			basePairs.current = yVempireDataFtm;
		}
	}, [chainID, yVempireData, yVempireDataFtm]);

	/* 🔵 - Yearn Finance ******************************************************
	** This effect is triggered every time the vault list or the search term is
	** changed, or the delta selector is updated. It filters the pairs based on
	** that to only work with them.
	**************************************************************************/
	React.useEffect((): void => {
		let		_filteredPairData = [...basePairs.current];

		if (isOnlyWithBalance) {
			_filteredPairData = _filteredPairData.filter((e): boolean => (rawBalancesOf?.[e.uToken.address] || ethers.BigNumber.from(0))?.gt(ethers.BigNumber.from(0)));
		}
		if (deltaSelector === 'plus') {
			_filteredPairData = _filteredPairData.filter((e): boolean => e.yvToken.apy - e.uToken.apy >= 0);
		} else if (deltaSelector === 'minus') {
			_filteredPairData = _filteredPairData.filter((e): boolean => e.yvToken.apy - e.uToken.apy < 0);
		}
		_filteredPairData = _filteredPairData.filter((vault): boolean => findBySearch(vault, searchTerm));
		utils.performBatchedUpdates((): void => {
			set_filteredPairData(_filteredPairData);
		});
	}, [dataNonce, basePairs, searchTerm, isOnlyWithBalance, rawBalancesOf, deltaSelector, nonce]);

	/* 🔵 - Yearn Finance ******************************************************
	** Main render of the page.
	**************************************************************************/
	return (
		<div>
			<div>
				<AlertBanner
					id={'compound_aave_1'}
					title={'Lend to AAVE & Compound through Yearn!'}
					level={'info'}
					canClose={false}
					maxHeight={'max-h-[600px] md:max-h-[300px] mb-4'}>
					<div>
						<p>{'Yearn is using AAVE and Compound as default lenders for it\'s strategies. When you are migrating your assets to the Yearn Vault, some may be redirected to AAVE or Compound, looking for the best yield in the ecosystem to maximise your APRs.'}</p>
					</div>
				</AlertBanner>
			</div>
			<div className={'flex flex-col-reverse mb-5 space-x-0 md:flex-row md:space-x-4'}>
				<div className={'flex flex-col mt-2 space-y-2 w-full md:mt-0'}>
					<SearchBox
						searchTerm={searchTerm}
						onChange={set_searchTerm} />
				</div>
				<div className={'flex flex-row justify-between items-center space-x-2 md:justify-start md:space-x-4'}>
					<div>
						<Card padding={'narrow'}>
							<label className={'component--switchCard-wrapper'}>
								<p className={'text-sm md:text-base text-typo-secondary'}>{'Only possible migrations'}</p>
								<Switch isEnabled={isOnlyWithBalance} onSwitch={set_isOnlyWithBalance} />
							</label>
						</Card>
					</div>
				</div>
			</div>
			<div className={'flex flex-col space-y-4 w-full'}>
				<div className={'grid grid-cols-1 gap-4 md:grid-cols-3'}>
					{
						filteredPairData
							.sort((a: TPair, b: TPair): number => (rawBalancesOf?.[b.uToken.address] || ethers.BigNumber.from(0)).sub(rawBalancesOf?.[a.uToken.address] || ethers.BigNumber.from(0)))
							.map((pair: TPair, index: number): ReactElement => (
								<MigrateBox
									key={`${pair.underlyingAddress}_${index}`}
									pair={pair}
									retrieveBalances={retrieveBalances}
									onForceRerender={(): void => set_nonce(nonce + 1)}
									balance={balancesOf?.[pair.uToken.address] || '0'}
									rawBalance={rawBalancesOf?.[pair.uToken.address] || ethers.BigNumber.from(0)} />
							))
					}
				</div>
			</div>
		</div>
	);
}

export default Index;
