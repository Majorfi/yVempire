import	React			from	'react';
import	Image			from	'next/image';
import	Icon			from	'components/icons/IconLinkOut';
import	useYVempire		from	'contexts/useYVempire';
import	useBalances		from	'contexts/useBalances';
import	{formatAmount}	from	'utils';
import	Card			from	'lib/Card';

function	MigrateBox({title, tokenAddress, tokenImage, yearnAPY, otherAPY, balance, symbol, description, buttonLabel}) {
	return (
		<Card className={'flex flex-col px-4'}>
			<div className={'flex flex-row justify-between items-center pb-4 w-full'}>
				<h2 className={'text-lg font-bold text-light-titles'}>{title}</h2>
				<a href={`https://etherscan.io/token/${tokenAddress}`} target={'_blank'} rel={'noreferrer'}>
					<Icon className={'w-5 h-5 transition-colors cursor-pointer text-light-icons-primary hover:text-light-icons-variant'}/>
				</a>
			</div>
			<h3 className={'my-2 text-base font-bold text-light-titles'}>
				{'Overview'}
			</h3>
			<div className={'grid grid-cols-12 gap-x-4 w-full'}>
				<div className={'flex flex-col col-span-4'}>
					<div className={'aspect-square flex justify-center items-center bg-light-background rounded-lg'}>
						<Image width={40} height={40} src={tokenImage} />
					</div>
				</div>
				<div className={'col-span-8'}>
					<div className={'flex flex-row justify-between items-center'}>
						<div className={'text-sm text-light-titles'}>{'APY'}</div>
						<div className={'text-base font-bold tabular-nums text-light-primary'}>{`${formatAmount(yearnAPY)}%`}</div>
					</div>
					<div className={'flex flex-row justify-between items-center'}>
						<div className={'text-sm text-light-titles'}>{'Delta'}</div>
						<div className={'text-base font-bold tabular-nums text-[#22c55e]'}>{`+ ${formatAmount(yearnAPY - otherAPY)}%`}</div>
					</div>
					<div className={'flex flex-row justify-between items-center'}>
						<div className={'text-sm text-light-titles'}>{'Balance'}</div>
						<div className={'text-base font-bold tabular-nums text-right text-light-titles'}>{`${formatAmount(balance || 0)}`}</div>
					</div>
				</div>
			</div>
			<div className={'mt-2 mb-6'}>
				<h3 className={'mt-4 mb-2 text-base font-bold text-light-titles'}>
					{'About'}
				</h3>
				<p className={'w-full text-sm text-light-texts line-clamp-5'}>
					{description}
				</p>
			</div>
			<div className={'mt-auto'}>
				<button
					disabled={balance === 0}
					className={'p-2 w-full text-base text-center text-white rounded-md transition-colors button-filled'}>
					{buttonLabel}
				</button>
			</div>
		</Card>
	);
}

function	Index() {
	const	{balancesOf} = useBalances();
	const	{yVempireData, yVempireDataFtm} = useYVempire();

	return (
		<div className={'flex flex-col space-y-4 w-full'}>
			<div className={'grid grid-cols-3 gap-4'}>
				{
					yVempireData
						.filter(e => e.yvToken.apy - e.uToken.apy > 0)
						.filter(e => Number(balancesOf[e.uToken.address]) > Number(0))
						.sort((a, b) => balancesOf[b.uToken.address] - balancesOf[a.uToken.address])
						.map((pair, index) => (
							<MigrateBox
								key={`${pair.underlyingAddress}_${index}`}
								title={pair.underlyingName}
								tokenAddress={pair.underlyingAddress}
								tokenImage={pair.image}
								yearnAPY={pair.yvToken.apy}
								otherAPY={pair.uToken.apy}
								balance={Number(balancesOf[pair.uToken.address]) || 0}
								symbol={pair.underlyingName}
								description={pair.description}
								buttonLabel={pair.service === 0 ? 'Migrate from Compound' : pair.service === 1 ? 'Migrate from Aave V1' : 'Migrate from Aave V2'} />
						))
				}
				{
					yVempireDataFtm
						.filter(e => e.yvToken.apy - e.uToken.apy > 0)
						.filter(e => Number(balancesOf[e.uToken.address]) > Number(0))
						.sort((a, b) => balancesOf[b.uToken.address] - balancesOf[a.uToken.address])
						.map((pair, index) => (
							<MigrateBox
								key={`${pair.underlyingAddress}_${index}`}
								title={pair.underlyingName}
								tokenAddress={pair.underlyingAddress}
								tokenImage={pair.image}
								yearnAPY={pair.yvToken.apy}
								otherAPY={pair.uToken.apy}
								balance={Number(balancesOf[pair.uToken.address]) || 0}
								symbol={pair.underlyingName}
								description={pair.description}
								buttonLabel={pair.service === 0 ? 'Migrate from Compound' : pair.service === 1 ? 'Migrate from Aave V1' : 'Migrate from Aave V2'} />
						))
				}
			</div>
		</div>
	);
}

export default Index;
