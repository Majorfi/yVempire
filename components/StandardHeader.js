import	React					from	'react';
import	useWeb3					from	'contexts/useWeb3';
import	IconHamburger			from	'components/icons/IconHamburger';
import	ModalMenu				from	'components/ModalMenu';
import	{truncateHex}			from	'utils';
import	Card					from	'lib/Card';
import	Dropdown				from	'lib/Dropdown';

function	Header() {
	const	{active, chainID, onSwitchChain, address, ens, openLoginModal, onDesactivate} = useWeb3();
	const	[openMenu, set_openMenu] = React.useState(false);

	const	options = [
		{label: 'Ethereum', value: 1},
		{label: 'Fantom', value: 250},
	];

	return (
		<header className={'z-50 py-0 mx-auto w-full max-w-6xl bg-white-blue-1 md:py-4'}>
			<Card className={'flex justify-between items-center p-6 bg-white rounded-lg'}>
				<div className={'flex flex-row items-center'}>
					<div className={'flex flex-row items-center'}>
						<h1 className={'mr-2 text-xl font-bold text-light-titles md:mr-4'}>
							{'Migrations'}
						</h1>
					</div>
				</div>
				<div className={'flex flex-row items-center space-x-6 md:hidden'}>
					<div
						onClick={() => set_openMenu(true)}
						className={'p-1 -m-1'}>
						<IconHamburger />
					</div>
				</div>
				<div className={'hidden flex-row items-center space-x-4 md:flex'}>
					<Dropdown
						defaultOption={options[0]}
						options={options}
						selected={options.find(e => e.value === Number(chainID)) || options[0]}
						setSelected={({value}) => onSwitchChain(value, true)}
					/>
					<button
						onClick={() => {
							if (active) {
								return onDesactivate();
							}
							openLoginModal();
						}}
						className={'truncate button-small button-light'}>
						{!active || !address ? 'Connect wallet' : ens ? ens : truncateHex(address, 4)}
					</button>
				</div>
			</Card>
			<ModalMenu open={openMenu} set_open={set_openMenu} />
		</header>
	);
}

export default Header;
