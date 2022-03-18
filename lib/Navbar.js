import React from 'react';

export default function Navbar({options, logo, title, selected, setSelected, ...props}) {
	return (
		<aside className={'pt-9 w-40 min-w-[10rem]'} {...props}>
			<div className={'flex flex-row items-center'}>
				<div className={'mr-4'}>
					{React.cloneElement(logo)}
				</div>
				<h1 className={'text-xl font-bold text-light-primary lowercase'}>{title}</h1>
			</div>
			<nav className={'flex flex-col mt-12 space-y-4'}>
				{options.map((option) => (
					<div
						key={option.value}
						className={'group flex flex-row items-center'}
						onClick={() => setSelected(option.value)}>
						<div className={`mr-4 transition-colors py-1 ${selected === option.value ? 'cursor-default text-light-primary' : 'cursor-pointer text-light-texts hover:text-light-primary/90'}`}>
							{React.cloneElement(option.icon, {className: 'w-6 h-6 group-hover:text-light-primary group-hover:cursor-default'})}
						</div>
						<p className={`transition-colors py-1 ${selected === option.value ? 'cursor-default text-light-primary' : 'cursor-pointer text-light-texts hover:text-light-primary/90'}`}>
							{option.label}
						</p>
					</div>
				))}
			</nav>
		</aside>
	);
}
