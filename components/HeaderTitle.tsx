import	React, {ReactElement}	from	'react';
import	{useRouter}				from	'next/router';

function	HeaderTitle(): ReactElement {
	const	router = useRouter();

	if (router.pathname === '/faq') {
		return (
			<div className={'flex-row-center'}>
				<h1 className={'mr-2 md:mr-4 text-typo-primary'}>
					{'FAQ'}
				</h1>
			</div>
		);
	}
	return (
		<div className={'flex-row-center'}>
			<h1 className={'mr-2 md:mr-4 text-typo-primary'}>
				{'Migrations'}
			</h1>
		</div>
	);
}

export default HeaderTitle;
