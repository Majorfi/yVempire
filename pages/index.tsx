import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {ethers} from 'ethers';
import {Card, SearchBox, Switch} from '@yearn-finance/web-lib/components';
import * as utils from '@yearn-finance/web-lib/utils';
import {useWeb3} from '@yearn-finance/web-lib/contexts';
import {useBalance, useBalances} from '@yearn-finance/web-lib/hooks';
import MigrateBox from 'components/MigrateBox';
import {toAddress} from '@yearn-finance/web-lib/utils';
import ADDRESSES from 'config/constants';
import {findBySearch} from 'utils/filters';
import {TPair, useYVempire} from 'contexts/useYVempire';
import {TDeltaPossibilities} from 'components/DeltaSelector';

function	Index(): ReactElement {
	const	{chainID} = useWeb3();
	const	{yVempireData, yVempireDataFtm, nonce: dataNonce} = useYVempire();
	const	{data: balancesOf} = useBalances({
		key: dataNonce,
		tokens:  ADDRESSES.map((tokenAddr): {[key: string]: string} => {
			return {token: tokenAddr};
		})
	});
	const	bla = useBalance();
	console.log(bla);
	const ethBalancesOf = bla.data;
	// 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2

	const	basePairs = useRef(yVempireData);
	const	[filteredPairData, set_filteredPairData] = useState<TPair[]>([]);
	const	[searchTerm, set_searchTerm] = useState('');
	const	[isOnlyWithBalance, set_isOnlyWithBalance] = useState(false);
	const	[deltaSelector] = useState<TDeltaPossibilities>('plus');
	const	[nonce, set_nonce] = useState(0); //used to trigger refresh

	/* 🔵 - Yearn Finance ******************************************************
	** This effect update the current basePairs to use based on the currently
	** selected chain.
	** Supported chains are 1 & 250.
	**************************************************************************/
	useEffect((): void => {
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
	useEffect((): void => {
		let		_filteredPairData = [...basePairs.current];

		if (isOnlyWithBalance) {
			_filteredPairData = _filteredPairData.filter((e): boolean => (balancesOf?.[e.uToken.address]?.raw || ethers.BigNumber.from(0))?.gt(ethers.BigNumber.from(0)));
		}
		if (deltaSelector === 'plus') {
			_filteredPairData = _filteredPairData.filter((e): boolean => e.yvToken.apy - e.uToken.apy >= 0);
		} else if (deltaSelector === 'minus') {
			_filteredPairData = _filteredPairData.filter((e): boolean => e.yvToken.apy - e.uToken.apy < 0);
		}
		_filteredPairData = _filteredPairData.sort((a, b): number => {
			if (a.yvToken.apy - a.uToken.apy > b.yvToken.apy - b.uToken.apy) {
				return -1;
			}
			if (a.yvToken.apy - a.uToken.apy < b.yvToken.apy - b.uToken.apy) {
				return 1;
			}
			return 0;
		});
		_filteredPairData = _filteredPairData.filter((vault): boolean => findBySearch(vault, searchTerm));
		utils.performBatchedUpdates((): void => {
			set_filteredPairData(_filteredPairData);
		});
	}, [dataNonce, basePairs, searchTerm, isOnlyWithBalance, balancesOf, deltaSelector, nonce]);

	/* 🔵 - Yearn Finance ******************************************************
	** Main render of the page.
	**************************************************************************/
	return (
		<div>
			<div className={'mb-5 flex flex-col-reverse space-x-0 md:flex-row md:space-x-4'}>
				<div className={'mt-2 flex w-full flex-col space-y-2 md:mt-0'}>
					<SearchBox
						searchTerm={searchTerm}
						onChange={set_searchTerm} />
				</div>
				<div className={'flex flex-row items-center justify-between space-x-2 md:justify-start md:space-x-4'}>
					<div>
						<Card padding={'narrow'}>
							<label className={'component--switchCard-wrapper'}>
								<p className={'text-typo-secondary text-sm md:text-base'}>{'Only possible migrations'}</p>
								<Switch isEnabled={isOnlyWithBalance} onSwitch={set_isOnlyWithBalance} />
							</label>
						</Card>
					</div>
				</div>
			</div>
			<div className={'flex w-full flex-col space-y-4'}>
				<div className={'grid grid-cols-1 gap-4 md:grid-cols-3'}>
					{
						filteredPairData
							.sort((a: TPair, b: TPair): number => (balancesOf?.[b.uToken.address]?.raw || ethers.BigNumber.from(0)).sub(balancesOf?.[a.uToken.address]?.raw || ethers.BigNumber.from(0)))
							.map((pair: TPair, index: number): ReactElement => {
								// pair.underlyingAddress
								if (pair.underlyingAddress === toAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')) {
									console.log(ethBalancesOf);
									return (
										<>
											<MigrateBox
												key={`eth_${index}`}
												pair={pair}
												// retrieveBalances={retrieveBalances}
												onForceRerender={(): void => set_nonce(nonce + 1)}
												balance={ethBalancesOf?.normalized || '0'}
												rawBalance={ethBalancesOf?.raw || ethers.BigNumber.from(0)} />
											<MigrateBox
												key={`${pair.underlyingAddress}_${index}`}
												pair={pair}
												// retrieveBalances={retrieveBalances}
												onForceRerender={(): void => set_nonce(nonce + 1)}
												balance={balancesOf?.[pair.uToken.address]?.normalized || '0'}
												rawBalance={balancesOf?.[pair.uToken.address]?.raw || ethers.BigNumber.from(0)} />
										</>
									);
								}
								return (<MigrateBox
									key={`${pair.underlyingAddress}_${index}`}
									pair={pair}
									// retrieveBalances={retrieveBalances}
									onForceRerender={(): void => set_nonce(nonce + 1)}
									balance={balancesOf?.[pair.uToken.address]?.normalized || '0'}
									rawBalance={balancesOf?.[pair.uToken.address]?.raw || ethers.BigNumber.from(0)} />
								);
							})
					}
				</div>
			</div>
		</div>
	);
}

export default Index;
