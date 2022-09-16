import React, {ReactElement} from 'react';
import Script from 'next/script';
import {AppProps} from 'next/app';
import {AnimatePresence, motion} from 'framer-motion';
import {Button} from '@yearn-finance/web-lib/components';
import {WithYearn} from '@yearn-finance/web-lib/contexts';
import {YVempireContextApp} from 'contexts/useYVempire';
import Header from 'components/Header';
import Meta from 'components/common/Meta';

import	'../style.css';

const transition = {duration: 0.3, ease: [0.17, 0.67, 0.83, 0.67]};
const variants = {
	initial: {y: 20, opacity: 0},
	enter: {y: 0, opacity: 1, transition},
	exit: {y: -20, opacity: 0, transition}
};

function	TextAnimation(): ReactElement {
	return (
		<>
			<Script src={'/textanimation.js'} />
			<div className={'relative flex flex-row'}>
				<p className={'wordWrapper w-[560px]'}> 
					<span className={'word'}>{'AAVE'}</span>
					<span className={'word'}>{'Compound'}</span>
					<span className={'word'}>{'Curve'}</span>
					<span className={'word'}>{'Convex'}</span>
					<span className={'word'}>{'Stake Dao'}</span>
				</p>
				{/* <p className={'flex items-center text-5xl text-neutral-900'}>
					<IconChevronPlain className={'h-12 w-12 -rotate-90'} />
				</p>
				<p className={'flex w-[560px] items-center justify-center text-5xl font-bold uppercase text-neutral-900 md:text-8xl'}> 
					{'Yearn'}
				</p> */}
			</div>
		</>
	);
}


function	WithLayout(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	return (
		<div id={'app'} className={'mx-auto mb-0 flex max-w-6xl'}>
			<div className={'flex min-h-[100vh] w-full flex-col'}>
				<Header />
				<AnimatePresence exitBeforeEnter>
					<motion.div
						key={router.asPath}
						initial={'initial'}
						animate={'enter'}
						exit={'exit'}
						className={'h-full'}
						variants={variants}>
						<div className={'mx-auto mt-20 mb-44 flex w-full max-w-6xl flex-col items-center justify-center'}>
							<div className={'relative h-12 md:h-[104px]'}>
								<TextAnimation />
							</div>
							<div className={'mt-8 mb-6'}>
								<p className={'text-center text-lg md:text-2xl'}>{'Wherever you\'re coming from, we have a place for you'}</p>
							</div>
							<div>
								<Button
									as={'a'}
									href={'#swap'}
									className={'w-full'}>
									{'Bridge to Yearn!'}
								</Button>
							</div>
						</div>
						<Component
							router={props.router}
							{...pageProps} />
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}

function	MyApp(props: AppProps): ReactElement {
	const	{Component, pageProps} = props;
	
	return (
		<WithYearn>
			<YVempireContextApp>
				<>
					<Meta />
					<WithLayout
						Component={Component}
						pageProps={pageProps}
						router={props.router} />
				</>
			</YVempireContextApp>
		</WithYearn>
	);
}

export default MyApp;
