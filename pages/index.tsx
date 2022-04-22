import	React, {ReactElement}								from	'react';
import	{ethers}											from	'ethers';
import	Image												from	'next/image';
import	{Card, Button, SearchBox, Switch, AlertBanner}		from	'@yearn/web-lib/components';
import	* as utils											from	'@yearn/web-lib/utils';
import	{useUI, useWeb3, useBalances}						from	'@yearn/web-lib/contexts';
import	{LinkOut}											from	'@yearn/web-lib/icons';
import	{findBySearch}										from	'utils/filters';
import	useYVempire, {TPair}								from	'contexts/useYVempire';
import	{DeltaSelector, TDeltaPossibilities}				from	'components/DeltaSelector';
import	{checkAllowance, approveToken, migrateBachTokens}	from	'utils/actions';

function PendingLoader(): ReactElement {
	return (
		<div className={'flex absolute inset-0 justify-center items-center'}>
			<svg className={'animate-spin text-button-filled-text'} width={24} height={24} xmlns={'http://www.w3.org/2000/svg'} fill={'none'} viewBox={'0 0 24 24'}>
				<circle className={'opacity-25'} cx={'12'} cy={'12'} r={'10'} stroke={'currentColor'} strokeWidth={'4'}></circle>
				<path className={'opacity-100'} fill={'currentColor'} d={'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'}></path>
			</svg>
		</div>
	);
}

type 	TListTokens = [address: string, decimals: number]
type	TMigrateBox = {
	pair: TPair,
	balance: string,
	rawBalance: ethers.BigNumber,
	retrieveBalances: (tokensForChain: TListTokens[]) => void,
	onForceRerender: () => void
}
function	MigrateBox({pair, balance, rawBalance, retrieveBalances, onForceRerender}: TMigrateBox): ReactElement {
	const	{toast} = useUI();
	const	{provider} = useWeb3();
	const	[txStatus, set_txStatus] = React.useState({none: true, pending: false, success: false, error: false});

	let		deltaClassName = 'text-[#22c55e]';
	const	delta = pair.yvToken.apy - pair.uToken.apy;
	if (delta < 0) {
		deltaClassName = 'text-alert-error-primary';
	}

	async function	onApproveTx(): Promise<void> {
		set_txStatus({none: false, pending: true, success: false, error: false});
		const	hasAllowance = await checkAllowance({
			provider,
			contractAddress: pair.uToken.address,
			amount: rawBalance,
			from: process.env.VAULT_SWAPPER_ADDR as string
		});
		if (hasAllowance) {
			onMigrateTx();
		} else {
			const	pendingToast = toast.loading('Approving token ...');
			await	approveToken({
				provider,
				contractAddress: pair.uToken.address,
				amount: rawBalance,
				from: process.env.VAULT_SWAPPER_ADDR as string
			}, ({error}): void => {
				toast.dismiss(pendingToast);
				if (error) {
					toast.error('Impossible to approve token');
					set_txStatus({none: false, pending: false, success: false, error: true});
					return;
				}
				toast.success('Token approved!');
				onMigrateTx();
			});
		}
	}

	async function	onMigrateTx(): Promise<void> {
		const	pendingToast = toast.loading('Migrating token ...');
		await	migrateBachTokens({
			provider,
			contractAddress: process.env.VAULT_SWAPPER_ADDR as string,
			batch: [[pair.service, pair.uToken.address]]
		}, async ({error}): Promise<void> => {
			if (error) {
				toast.dismiss(pendingToast);
				toast.error('Impossible to migrate token');
				set_txStatus({none: false, pending: false, success: false, error: true});
				return;
			}
			await retrieveBalances([[utils.toAddress(pair.uToken.address), pair.decimals]]);
			onForceRerender();
			toast.dismiss(pendingToast);
			toast.success('Token migrated!');
			set_txStatus({none: false, pending: false, success: true, error: false});
			
		});
	}

	return (
		<Card className={'flex flex-col px-4'}>
			<div className={'flex flex-row justify-between items-center pb-4 w-full'}>
				<h3 className={'text-base font-bold'}>
					{pair.underlyingName}
				</h3>
				<a href={`https://etherscan.io/token/${pair.underlyingAddress}`} target={'_blank'} rel={'noreferrer'}>
					<LinkOut
						className={'w-4 h-4 transition-colors cursor-pointer text-icons-primary hover:text-icons-variant'}/>
				</a>
			</div>
			<div className={'grid grid-cols-12 gap-x-4 w-full'}>
				<div className={'flex flex-col col-span-4'}>
					<div className={'aspect-square flex justify-center items-center rounded-lg bg-background'}>
						<Image width={40} height={40} src={pair.image} />
					</div>
				</div>
				<div className={'col-span-8'}>
					<div className={'flex flex-row justify-between items-center'}>
						<div className={'text-sm'}>{'APY'}</div>
						<div className={'text-base font-bold tabular-nums text-light-primary'}>
							{`${utils.format.amount(pair.yvToken.apy)}%`}
						</div>
					</div>
					<div className={'flex flex-row justify-between items-center'}>
						<div className={'text-sm'}>{'Delta'}</div>
						<div className={`text-base font-bold tabular-nums ${deltaClassName}`}>{
							delta > 0 ? ` + ${utils.format.amount(delta)}%` : `${utils.format.amount(delta)} %`
						}</div>
					</div>
					<div className={'flex flex-row justify-between items-center'}>
						<div className={'text-sm'}>{'Balance'}</div>
						<div className={'text-base font-bold tabular-nums text-right'}>{`${utils.format.amount(balance || 0)}`}</div>
					</div>
				</div>
			</div>
			<div className={'mt-2 mb-6'}>
				<h3 className={'mt-4 mb-2 text-base font-bold'}>
					{'About'}
				</h3>
				<p className={'w-full text-sm line-clamp-5 text-light-texts'}>
					{pair.description}
				</p>
			</div>
			<div className={'mt-auto'}>
				<Button
					onClick={onApproveTx}
					disabled={rawBalance.eq(ethers.BigNumber.from(0))}
					variant={'filled'}
					className={`w-full relative ${txStatus.pending ? 'text-primary/0' : ''}`}>
					<>
						{txStatus.pending ? <PendingLoader /> : null}
						{pair.service === 0 ? 'Migrate from Compound' : pair.service === 1 ? 'Migrate from Aave V1' : 'Migrate from Aave V2'}
					</>
				</Button>
			</div>
		</Card>
	);
}

function	Index(): ReactElement {
	const	{chainID} = useWeb3();
	const	{balancesOf, rawBalancesOf, retrieveBalances} = useBalances();
	const	{yVempireData, yVempireDataFtm, nonce: dataNonce} = useYVempire();
	const	basePairs = React.useRef(yVempireData);
	const	[filteredPairData, set_filteredPairData] = React.useState<TPair[]>([]);
	const	[searchTerm, set_searchTerm] = React.useState('');
	const	[isOnlyWithBalance, set_isOnlyWithBalance] = React.useState(false);
	const	[deltaSelector, set_deltaSelector] = React.useState<TDeltaPossibilities>('plus');
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
					<div>
						<DeltaSelector
							selectedLevel={deltaSelector}
							onSelect={(s): void => set_deltaSelector((c): TDeltaPossibilities => c === s ? 'plus' : s)} />
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
