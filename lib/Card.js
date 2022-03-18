import React from 'react';

export default function Card({children, onClick, className, ...props}) {
	return (
		<section
			className={`bg-light-surface shadow-none rounded-lg p-6 transition-all ${onClick ? 'cursor-pointer hover:bg-light-surfaceVariant shadow-lg' : ''}${className ?? ''}`}
			{...props}>
			{children}
		</section>
	);
}
