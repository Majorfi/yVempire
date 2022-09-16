import	React, {ReactElement}				from	'react';
import	{AppProps}							from	'next/app';
import	{AnimatePresence, motion}			from	'framer-motion';
import	Meta								from	'components/common/Meta';
import	Header								from	'components/Header';

const transition = {duration: 0.3, ease: [0.17, 0.67, 0.83, 0.67]};
const thumbnailVariants = {
	initial: {y: 20, opacity: 0, transition},
	enter: {y: 0, opacity: 1, transition},
	exit: {y: -20, opacity: 0, transition}
};

function	WithLayout(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	function handleExitComplete(): void {
		if (typeof window !== 'undefined') {
			document.getElementById('app')?.scrollIntoView({behavior: 'smooth'});
		}
	}


	return (
		<React.Fragment>
			<Header />
			<div id={'app'} className={'mx-auto mb-0 mt-14 flex w-full max-w-6xl flex-col pt-6 md:pt-0'}>
				<AnimatePresence mode={'wait'} onExitComplete={handleExitComplete}>
					<motion.div
						key={router.asPath}
						initial={'initial'}
						animate={'enter'}
						exit={'exit'}
						variants={thumbnailVariants}>
						<Component
							key={router.route}
							router={props.router}
							{...pageProps} />
					</motion.div>
				</AnimatePresence>
			</div>
		</React.Fragment>
	);
}

function	AppWrapper(props: AppProps): ReactElement {
	return (
		<>
			<Meta />
			<WithLayout {...props} />
		</>
	);
}

export default AppWrapper;