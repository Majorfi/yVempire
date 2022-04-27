import	React, {ReactElement, ReactNode, useState}	from	'react';
import	{copyToClipboard}							from	'@yearn/web-lib/utils';

function	FAQElement({label, children}: {label: string, children: ReactNode}): ReactElement {
	const	[isExpanded, set_isExpanded] = useState(false);
	const	[isExpandedAnimation, set_isExpandedAnimation] = useState(false);

	function	onExpand(): void {
		if (isExpanded) {
			set_isExpandedAnimation(false);
			setTimeout((): void => set_isExpanded(false), 500);
		} else {
			set_isExpanded(true);
			setTimeout((): void => set_isExpandedAnimation(true), 1);
		}
	}

	return (
		<div onClick={onExpand} className={'w-full rounded-lg cursor-pointer bg-surface'}>
			<div className={'flex flex-row justify-between items-center p-4 font-bold md:p-6 text-typo-primary'}>
				{label}
				<svg
					width={'24'}
					height={'24'}
					className={`transform transition-transform ${isExpandedAnimation ? '' : '-rotate-90'}`}
					viewBox={'0 0 24 24'}
					fill={'none'}
					xmlns={'http://www.w3.org/2000/svg'}>
					<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M17.7439 9.18558C18.0556 9.45834 18.0872 9.93216 17.8144 10.2439L12.5644 16.2439C12.422 16.4066 12.2163 16.5 12 16.5C11.7837 16.5 11.578 16.4066 11.4356 16.2439L6.18558 10.2439C5.91282 9.93216 5.9444 9.45834 6.25613 9.18558C6.56786 8.91282 7.04168 8.9444 7.31444 9.25613L12 14.6111L16.6856 9.25613C16.9583 8.9444 17.4321 8.91282 17.7439 9.18558Z'} fill={'#000000'}/>
				</svg>
			</div>
			<div className={`w-full transition-max-height duration-500 overflow-hidden ${isExpandedAnimation ? 'max-h-96' : 'max-h-0'}`}>
				{isExpanded ? children : <div />}
			</div>
		</div>
	);
}

function	FAQ(): ReactElement {
	function	localCopyToClipboard(e: React.MouseEvent<HTMLDivElement>, str: string): void {
		e.stopPropagation();
		copyToClipboard(str);
	}

	return (
		<div className={'mt-4 space-y-4 w-full md:mt-6'}>
			<FAQElement label={'What is Bowswap?'}>
				<div className={'px-4 pb-4 text-sm font-normal leading-4 md:px-6 md:pb-6 text-typo-secondary'}>
					{'Bowswap is a platform that allows you to move your funds from one place to another using the most optimal route, to pursue better yield. You can either move them inside Yearn, or migrate them from other protocols.'}
				</div>
			</FAQElement>
			<FAQElement label={'What are the benefits of using Bowswap?'}>
				<div className={'px-4 pb-2 text-sm font-normal leading-4 md:px-6 text-typo-secondary'}>
					{'Using Bowswap you save time and, more importantly, money. It\'s time-saving and simple. Just one click and you migrate.'}
				</div>
				<div className={'px-4 pb-4 text-sm font-normal leading-4 md:px-6 md:pb-6 text-typo-secondary'}>
					{'You save money in gas because Bowswap uses the most optimal route to migrate and sends all the transactions bundled.'}
				</div>
			</FAQElement>
			<FAQElement label={'How does the swap work?'}>
				<div className={'px-4 pb-2 text-sm font-normal leading-4 md:px-6 text-typo-secondary'}>
					{'Bowswap smart contracts withdraw from the protocol, or yVault, and find the most optimal route to go from one place to the other.'}
				</div>
				<div className={'px-4 pb-2 text-sm font-normal leading-4 md:px-6 text-typo-secondary'}>
					{'If you migrate from stable to stable, there are no swaps, just the automation of withdrawals and deposits into different protocols.'}
				</div>
				<div className={'px-4 pb-4 text-sm font-normal leading-4 md:px-6 md:pb-6 text-typo-secondary'}>
					{'If you move from one type of asset to another one, there will be a swap using the best available route.'}
				</div>
			</FAQElement>
			<FAQElement label={'I can\'t find the vault I want to migrate from/to, why?'}>
				<div className={'px-4 pb-4 text-sm font-normal leading-4 md:px-6 md:pb-6 text-typo-secondary'}>
					{'We want to make sure we can provide the best routes. Bowswap doesn\'t support every single vault yet. We are working hard to support more and more vaults every day.'}
				</div>
			</FAQElement>
			<FAQElement label={'Are there any fees to use it?'}>
				<div className={'px-4 pb-4 text-sm font-normal leading-4 md:px-6 md:pb-6 text-typo-secondary'}>
					{'Bowswap charges no fees for using it. But you can donate a tiny portion of your transaction to help maintain the team.'}
				</div>
			</FAQElement>
			<FAQElement label={'What is slippage?'}>
				<div className={'px-4 pb-2 text-sm font-normal leading-4 md:px-6 text-typo-secondary'}>
					{'In trade, there is almost always a spread between the price that a buyer will pay and the price that a seller will sell an asset. When an order is made, this difference in price between buyer and seller expectations results in price slippage. This slippage in price is usually 1-3% but can be even more for coins with limited liquidity. This slippage can lead to a final sale price of the asset that is either more or less than the requested transaction amount.'}
				</div>
				<div className={'px-4 pb-4 text-sm font-normal leading-4 md:px-6 md:pb-6 text-typo-secondary'}>
					{'If you are moving between the same type of asset, there will be no swap, so no slippage will apply.'}
				</div>
			</FAQElement>
			<FAQElement label={'Why do I need MEV protection?'}>
				<div className={'px-4 pb-2 text-sm font-normal leading-4 md:px-6 text-typo-secondary'}>
					{'MEV represents the extractable value via conventional or unconventional methods. The conventional ones, incentivize miners to run the network, while unconventional ones are used by bots to make a profit from you.'}
				</div>
				<div className={'px-4 pb-2 text-sm font-normal leading-4 md:px-6 text-typo-secondary'}>
					{'With MEV protection your transaction will not be seen by hungry sandwich bots in the public mempool.'}
				</div>
				<div className={'px-4 pb-2 text-sm font-normal leading-4 md:px-6 text-typo-secondary'}>
					{'If you are moving between the same type of asset, there will be no swap, so no slippage will apply.'}
				</div>
				<div className={'px-4 pb-4 text-sm font-normal leading-4 md:px-6 md:pb-6 text-typo-secondary'}>
					{'Learn more about '}
					<a href={'https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752'} target={'_blank'} rel={'noreferrer'} className={'font-medium text-primary hover:text-primary-variant'}>{'MEV'}</a>
					{'.'}
				</div>
			</FAQElement>
			<FAQElement label={'How to enable MEV protection?'}>
				<div className={'px-6 mb-6'}>
					<div className={'overflow-hidden relative p-4 rounded-lg bg-secondary'}>
						<div className={'flex flex-row items-center w-full text-sm font-normal leading-4 text-typo-secondary'}>
							<div className={'w-1/4'}>{'Network Name: '}</div>
							<div
								className={'group flex flex-row items-center cursor-pointer'}
								onClick={(e): void => localCopyToClipboard(e, 'Flashbots RPC')}>
								<div className={'text-base font-bold text-primary'}>
									{'Flashbots RPC'}
								</div>
								<div
									className={'mb-1 ml-2 opacity-0 group-hover:opacity-80 text-ygray-400'}>
									<svg width={10} height={14} aria-hidden={'true'} focusable={'false'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 384 512'}><path fill={'currentColor'} d={'M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z'}></path></svg>
								</div>
							</div>
						</div>
						<div className={'flex flex-row items-center w-full text-sm font-normal leading-4 text-typo-secondary'}>
							<div className={'w-1/4'}>{'RPC URL: '}</div>
							<div
								className={'group flex flex-row items-center cursor-pointer'}
								onClick={(e): void => localCopyToClipboard(e, 'https://rpc.flashbots.net')}>
								<div className={'text-base font-bold text-primary'}>
									{'https://rpc.flashbots.net'}
								</div>
								<div className={'mb-1 ml-2 opacity-0 group-hover:opacity-80 text-ygray-400'}>
									<svg width={10} height={14} aria-hidden={'true'} focusable={'false'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 384 512'}><path fill={'currentColor'} d={'M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z'}></path></svg>
								</div>
							</div>
						</div>
						<div className={'flex flex-row items-center w-full text-sm font-normal leading-4 text-typo-secondary'}>
							<div className={'w-1/4'}>{'Chain ID: '}</div>
							<div
								className={'group flex flex-row items-center cursor-pointer'}
								onClick={(e): void => localCopyToClipboard(e, '1')}>
								<div className={'text-base font-bold text-primary'}>
									{'1'}
								</div>
								<div className={'mb-1 ml-2 opacity-0 group-hover:opacity-80 text-ygray-400'}>
									<svg width={10} height={14} aria-hidden={'true'} focusable={'false'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 384 512'}><path fill={'currentColor'} d={'M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z'}></path></svg>
								</div>
							</div>
						</div>
						<div className={'flex flex-row items-center w-full text-sm font-normal leading-4 text-typo-secondary'}>
							<div className={'w-1/4'}>{'Currency Symbol: '}</div>
							<div
								className={'group flex flex-row items-center cursor-pointer'}
								onClick={(e): void => localCopyToClipboard(e, 'ETH')}>
								<div className={'text-base font-bold text-primary'}>
									{'ETH'}
								</div>
								<div className={'mb-1 ml-2 opacity-0 group-hover:opacity-80 text-ygray-400'}>
									<svg width={10} height={14} aria-hidden={'true'} focusable={'false'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 384 512'}><path fill={'currentColor'} d={'M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z'}></path></svg>
								</div>
							</div>
						</div>
						<div className={'absolute top-0 right-8'}>
							<svg width={'102'} height={'128'} viewBox={'0 0 16 20'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'} className={'p-2 opacity-20'}>
								<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M7.56088 0.118676C7.83319 -0.0395586 8.16682 -0.0395586 8.43912 0.118676L15.5502 4.25091C15.8283 4.41246 16 4.71429 16 5.04132V10C16 10.0079 15.9999 10.0158 15.9997 10.0237C15.9512 11.9208 15.6151 13.8907 14.4458 15.6624C13.2716 17.4415 11.3314 18.91 8.28194 19.9531C8.09896 20.0156 7.90104 20.0156 7.71806 19.9531C4.66865 18.91 2.72839 17.4415 1.55421 15.6624C0.384871 13.8907 0.0487724 11.9208 0.000303321 10.0237C0.000101089 10.0158 0 10.0079 0 10V5.04132C0 4.71429 0.17175 4.41246 0.449769 4.25091L7.56088 0.118676ZM1.77778 5.57038V9.98797C1.82282 11.7046 2.12543 13.2781 3.02772 14.6452C3.89641 15.9614 5.38961 17.189 8 18.1298C10.6104 17.189 12.1036 15.9614 12.9723 14.6452C13.8746 13.2781 14.1772 11.7046 14.2222 9.98797V5.57038L8 1.95468L1.77778 5.57038Z'} fill={'#1E6EDF'}/>
							</svg>
						</div>
					</div>
				</div>


				<div className={'px-4 pb-2 text-sm font-normal leading-4 md:px-6 text-typo-secondary'}>
					{'To enable the MEV protection you have to add the Flashbots Protect RPC. It\'s a simple manual process in Metamask. Then you need to use it each time you do a swap on Ethereum. That way you will always be protected from hungry sandwich bots.'}
				</div>
				<div className={'px-4 pb-2 text-sm font-normal leading-4 md:px-6 text-typo-secondary'}>
					{'With MEV protection your transaction will not be seen by hungry sandwich bots in the public mempool.'}
				</div>
				<div className={'px-4 pb-2 text-sm font-normal leading-4 md:px-6 text-typo-secondary'}>
					{'If you are moving between the same type of asset, there will be no swap, so no slippage will apply.'}
				</div>
				<div className={'px-4 pb-4 text-sm font-normal leading-4 md:px-6 md:pb-6 text-typo-secondary'}>
					{'You can follow the detailed '}
					<a href={'https://docs.flashbots.net/flashbots-protect/rpc/quick-start/'} target={'_blank'} rel={'noreferrer'} className={'font-medium text-primary hover:text-primary-variant'}>{'instructions'}</a>
					{'.'}
				</div>
			</FAQElement>

		</div>
	);
}

export default FAQ;
