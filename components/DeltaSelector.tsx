import	React, {ReactElement}						from	'react';

type	TDeltaPossibilities = 'plus' | 'minus';
type	TDeltaSelector = {
	selectedLevel: TDeltaPossibilities,
	onSelect: (s: TDeltaPossibilities) => void
}

function	DeltaSelector({selectedLevel, onSelect}: TDeltaSelector): ReactElement {
	const	defaultClassName = 'border-transparent bg-surface';
	const	plusClassName = 'border-[#22c55e] bg-[#d5f8e2] hover:bg-[#d5f8e2]';
	const	minusClassName = 'border-alert-critical-primary bg-alert-critical-secondary hover:bg-alert-critical-secondary';

	return (
		<div className={'component--deltaSelector-wrapper'}>
			<div
				onClick={(): void => onSelect('plus')}
				className={`component--deltaSelector-base ${selectedLevel === 'plus' ? plusClassName : defaultClassName}`}>
				<p className={'text-xl font-bold text-[#22c55e]'}>{'+'}</p>
			</div>
			<div
				onClick={(): void => onSelect('minus')}
				className={`component--deltaSelector-base ${selectedLevel === 'minus' ? minusClassName : defaultClassName}`}>
				<p className={'text-xl font-bold text-alert-critical-primary'}>{'-'}</p>
			</div>
		</div>
	);
}

export {DeltaSelector};
export type {TDeltaSelector, TDeltaPossibilities};