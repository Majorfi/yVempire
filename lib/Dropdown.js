import	React				from	'react';
import	{Menu, Transition}	from	'@headlessui/react';
import	IconChevron			from	'components/icons/IconChevron';

export default function Dropdown({options, defaultOption, selected, setSelected}) {
	return (
		<div>
			<Menu as={'menu'} className={'inline-block relative text-left'}>
				{({open}) => (
					<>
						<Menu.Button className={'flex overflow-hidden justify-between items-center px-3 h-8 text-light-primary bg-light-backgroundVariant hover:bg-light-secondaryVariant rounded-lg border-0 transition-colors cursor-pointer'}>
							<p className={'font-roboto font-normal text-light-primary'}>{selected?.label || defaultOption.label}</p>
							<IconChevron className={`ml-3 w-4 h-4 transition-transform transform ${open ? '-rotate-90' : '-rotate-180'}`} />
						</Menu.Button>
						<Transition
							as={React.Fragment}
							show={open}
							enter={'transition duration-100 ease-out'}
							enterFrom={'transform scale-95 opacity-0'}
							enterTo={'transform scale-100 opacity-100'}
							leave={'transition duration-75 ease-out'}
							leaveFrom={'transform scale-100 opacity-100'}
							leaveTo={'transform scale-95 opacity-0'}>
							<Menu.Items className={'flex overflow-y-scroll absolute left-0 flex-col mt-1 w-full max-h-60 bg-light-backgroundVariant rounded-lg border-0'}>
								{options.map((option) => (
									<Menu.Item key={option.value} onClick={() => setSelected(option)}>
										{({active}) => (
											<p className={`text-light-primary cursor-pointer py-1 pr-4 pl-3 transition-colors ${active ? 'bg-light-secondaryVariant' : ''}`}>
												{option.label}
											</p>
										)}
									</Menu.Item>
								))}
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
		</div>
	);
}