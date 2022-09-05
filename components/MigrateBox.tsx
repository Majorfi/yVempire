import	React, {ReactElement}								from	'react';
import	{ethers}											from	'ethers';
import	Image												from	'next/image';
import	{Card, Button}										from	'@yearn-finance/web-lib/components';
import	* as utils											from	'@yearn-finance/web-lib/utils';
import	{useUI, useWeb3}									from	'@yearn-finance/web-lib/contexts';
import	{LinkOut}											from	'@yearn-finance/web-lib/icons';
import	{TPair}												from	'contexts/useYVempire';
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
			{/* <div className={'mt-2 mb-6'}>
				<h3 className={'mt-4 mb-2 text-base font-bold'}>
					{'About'}
				</h3>
				<p className={'w-full text-sm line-clamp-5 text-light-texts'}>
					{pair.description}
				</p>
			</div> */}
			<div className={'mt-6'}>
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

export default MigrateBox;