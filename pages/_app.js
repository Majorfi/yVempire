import	React						from	'react';
import	Head						from	'next/head';
import	{DefaultSeo}				from	'next-seo';
import	{ethers}					from	'ethers';
import	{Web3ReactProvider}			from	'@web3-react/core';
import	{BalancesContextApp}		from	'contexts/useBalances';
import	{UIContextApp}				from	'contexts/useUI';
import	{PricesContextApp}			from	'contexts/usePrices';
import	{LocalizationContextApp}	from 	'contexts/useLocalization';
import	{Web3ContextApp}			from	'contexts/useWeb3';
import	{YVempireContextApp}		from	'contexts/useYVempire';
import	Header						from	'components/StandardHeader';
import	Footer						from	'components/StandardFooter';
import	Navbar						from	'lib/Navbar';

import	'tailwindcss/tailwind.css';
import	'style/Default.css';

function	IconDeposit(props) {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 576 512'} {...props}>
			<path d={'M196.6 97.83C184.1 93.41 177.6 79.7 182 67.2C195.8 28.08 233.1 0 277.1 0C320.1 0 358.3 28.08 372.1 67.2C376.5 79.7 369.1 93.41 357.5 97.83C344.1 102.2 331.3 95.7 326.9 83.2C319.6 62.66 300 48 277.1 48C254.1 48 234.5 62.66 227.3 83.2C222.8 95.7 209.1 102.2 196.6 97.83H196.6zM400 264C400 250.7 410.7 240 424 240C437.3 240 448 250.7 448 264C448 277.3 437.3 288 424 288C410.7 288 400 277.3 400 264zM224 128H376.4C394 108.4 419.6 96 448 96H465.3C480.9 96 492.3 110.7 488.5 125.8L480 159.1C501.1 176.5 519.6 198.5 530.7 224H544C561.7 224 576 238.3 576 256V352C576 369.7 561.7 384 544 384H512C499.1 401.2 482.7 415.8 464 426.6V464C464 490.5 442.5 512 416 512H368C341.5 512 320 490.5 320 464V448H272V464C272 490.5 250.5 512 224 512H176C149.5 512 128 490.5 128 464V416C90.98 388.2 66.42 344.7 64.17 295.4C27.99 290.9 0 259.1 0 222.6C0 194.7 15.72 169.3 40.6 156.9L45.27 154.5C57.12 148.6 71.54 153.4 77.47 165.3C83.39 177.1 78.59 191.5 66.73 197.5L62.06 199.8C53.44 204.1 48 212.9 48 222.6C48 235.1 57.13 245.6 69.13 247.6C87.02 178.8 149.6 128 224 128V128zM224 176C162.1 176 112 226.1 112 288C112 324.6 129.5 357.1 156.8 377.6C168.9 386.7 176 400.9 176 416V464H224V448C224 421.5 245.5 400 272 400H320C346.5 400 368 421.5 368 448V464H416V426.6C416 409.5 425.1 393.6 439.1 385C453.1 377.5 464.6 367.3 473.6 355.2C482.7 343.1 496.9 336 512 336H528V271.9C510 270.9 493.1 259.9 486.7 243.2C478.9 225.4 466.6 209.1 451.2 198.4C435.7 186.8 428.8 167.1 433.4 148.3L434 146.1C425.5 148.6 418 153.5 412.2 160C403.1 170.2 390.1 176 376.4 176H224z'} fill={'currentcolor'} />
		</svg>
	);
}

function	IconMigration(props) {
	return (
		<svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 640 512'} {...props}>
			<path d={'M592 48H304V128H256V48C256 21.49 277.5 0 304 0H592C618.5 0 640 21.49 640 48V464C640 490.5 618.5 512 592 512H381.3C383 506.1 384 501.6 384 496V464H592V48zM560.1 311C570.3 320.4 570.3 335.6 560.1 344.1C551.6 354.3 536.4 354.3 527 344.1L504 321.9V392C504 405.3 493.3 416 480 416C466.7 416 456 405.3 456 392V321.9L432.1 344.1C423.6 354.3 408.4 354.3 399 344.1C389.7 335.6 389.7 320.4 399 311L463 247C472.4 237.7 487.6 237.7 496.1 247L560.1 311zM232 336C245.3 336 256 346.7 256 360C256 373.3 245.3 384 232 384H152C138.7 384 128 373.3 128 360C128 346.7 138.7 336 152 336H232zM0 192C0 174.3 14.33 160 32 160H352C369.7 160 384 174.3 384 192V272C384 289.7 369.7 304 352 304V480C352 497.7 337.7 512 320 512H64C46.33 512 32 497.7 32 480V304C14.33 304 0 289.7 0 272V192zM48 208V256H336V208H48zM80 464H304V304H80V464z'} fill={'currentcolor'} />
		</svg>
	);
}

function	AppWrapper(props) {
	const	{Component, pageProps, router} = props;
	const	WEBSITE_URI = process.env.WEBSITE_URI;

	return (
		<>
			<Head>
				<title>{process.env.WEBSITE_NAME}</title>
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={process.env.WEBSITE_NAME} />
				<meta name={'msapplication-TileColor'} content={'#62688F'} />
				<meta name={'theme-color'} content={'#ffffff'} />
				<meta charSet={'utf-8'} />

				<link rel={'shortcut icon'} type={'image/x-icon'} href={'/favicons/favicon.ico'} />
				<link rel={'apple-touch-icon'} sizes={'180x180'} href={'/favicons/apple-touch-icon.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/favicons/favicon-32x32.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/favicons/favicon-16x16.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'192x192'} href={'/favicons/android-chrome-192x192.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'512x512'} href={'/favicons/android-chrome-512x512.png'} />
				<link href={'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'} rel={'stylesheet'} />
				
				<meta name={'robots'} content={'index,nofollow'} />
				<meta name={'googlebot'} content={'index,nofollow'} />
				<meta charSet={'utf-8'} />
			</Head>
			<DefaultSeo
				title={process.env.WEBSITE_NAME}
				defaultTitle={process.env.WEBSITE_NAME}
				description={process.env.WEBSITE_DESCRIPTION}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: WEBSITE_URI,
					site_name: process.env.WEBSITE_NAME,
					title: process.env.WEBSITE_NAME,
					description: process.env.WEBSITE_DESCRIPTION,
					images: [
						{
							url: `${WEBSITE_URI}og.png`,
							width: 1200,
							height: 675,
							alt: 'Yearn',
						}
					]
				}}
				twitter={{
					handle: '@iearnfinance',
					site: '@iearnfinance',
					cardType: 'summary_large_image',
				}} />
			<div id={'app'} className={'grid relative flex-col grid-cols-12 gap-x-4 mx-auto mb-0 max-w-6xl md:flex-row md:mb-6'}>
				<div className={'col-span-2'}>
					<Navbar
						selected={router.pathname}
						setSelected={(selected) => router.push(selected)}
						options={[
							{
								value: '/deposit',
								label: 'Deposit',
								icon: <IconDeposit />,
							},
							{
								value: '/',
								label: 'Migrations',
								icon: <IconMigration />,
							}
						]}
						title={process.env.WEBSITE_TITLE}
						logo={
							<div className={'flex justify-center items-center w-9 h-9 bg-yearn-blue rounded-full'}>
								<svg className={'w-6 h-6 text-white'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 640 512'}><path d={'M640 320l-49.63-16.5c-27.38-9.125-57.5 1.125-73.5 25.12L480 384l-11.88-11.88c-27.5-27.5-73-24.25-96.38 6.875L319.1 448l-51.75-69c-23.37-31.12-68.87-34.38-96.37-6.875L160 384l-36.88-55.38c-16-24-46.12-34.25-73.5-25.12L0 320l81.5-190.2c7.75-17.88 29.25-24.88 45.88-14.88L228.1 175.2L255.1 64l42.63 32h42.75l42.62-32l27.88 111.2l100.6-60.37c16.75-10 38.25-3 46 14.88L640 320z'} fill={'currentcolor'}/></svg>
							</div>
						}
					/>
				</div>
				<div className={'col-span-10 w-full min-h-[90vh]'}>
					<Header />
					<Component
						key={router.route}
						element={props.element}
						router={props.router}
						{...pageProps} />
				</div>
			</div>
			<Footer />
		</>
	);
}

const getLibrary = (provider) => {
	return new ethers.providers.Web3Provider(provider, 'any');
};

function	MyApp(props) {
	const	{Component, pageProps} = props;
	
	return (
		<UIContextApp>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Web3ContextApp>
					<BalancesContextApp>
						<PricesContextApp>
							<YVempireContextApp>
								<LocalizationContextApp router={props.router}>
									<AppWrapper
										Component={Component}
										pageProps={pageProps}
										element={props.element}
										router={props.router} />
								</LocalizationContextApp>
							</YVempireContextApp>
						</PricesContextApp>
					</BalancesContextApp>
				</Web3ContextApp>
			</Web3ReactProvider>
		</UIContextApp>
	);
}

export default MyApp;
