import	React, {ReactElement}	from	'react';

function	HeaderTitle(): ReactElement {
	return (
		<div className={'flex-row-center'}>
			<h1 className={'mr-2 md:mr-4 text-typo-primary'}>
				{'Migrations'}
			</h1>
		</div>
	);
}

export default HeaderTitle;
