import	React, {ReactElement}		from	'react';
import	Head						from	'next/head';
import	{AppProps}					from	'next/app';
import	Link						from	'next/link';
import	{DefaultSeo}				from	'next-seo';
import	{WithYearn}					from	'@yearn/web-lib';
import	{Header, Navbar}			from	'@yearn/web-lib/layouts';
import	{YVempireContextApp}		from	'contexts/useYVempire';
import	Footer						from	'components/StandardFooter';
import	HeaderTitle					from	'components/HeaderTitle';

import	{
	Vault as IconVault,
	Settings as IconSettings,
	LogoYearn
}									from	'@yearn/web-lib/icons';
import	'../style.css';

function	AppHead(): ReactElement {
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
					url: process.env.WEBSITE_URI,
					site_name: process.env.WEBSITE_NAME,
					title: process.env.WEBSITE_NAME,
					description: process.env.WEBSITE_DESCRIPTION,
					images: [
						{
							url: `${process.env.WEBSITE_URI}og.png`,
							width: 1200,
							height: 675,
							alt: 'Yearn'
						}
					]
				}}
				twitter={{
					handle: '@iearnfinance',
					site: '@iearnfinance',
					cardType: 'summary_large_image'
				}} />
		</>
	);
}

function	AppWrapper(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;
	const	navbarMenuOptions = [
		{
			route: '/',
			values: ['/'],
			label: 'Migrations',
			icon: <IconVault  />
		},
		{
			route: '/settings',
			values: ['/settings'],
			label: 'Settings',
			icon: <IconSettings />
		}
	];
	function	onChangeRoute(selected: string): void {
		router.push(selected);
	}

	return (
		<>
			<AppHead />
			<div id={'app'} className={'grid flex-col grid-cols-12 gap-x-4 mx-auto mb-0 max-w-6xl md:flex-row'}>
				<div className={'sticky top-0 z-50 col-span-12 h-auto md:relative md:col-span-2'}>
					<div className={'flex flex-col justify-between h-full'}>
						<Navbar
							selected={router.pathname}
							set_selected={onChangeRoute}
							logo={<LogoYearn className={'w-full h-12 text-primary'} />}
							options={navbarMenuOptions}
							wrapper={<Link passHref href={''} />}>
						</Navbar>
					</div>
				</div>
				<div className={'flex flex-col col-span-12 px-4 w-full min-h-[100vh] md:col-span-10'}>
					<Header
						shouldUseNetworks={process.env.USE_NETWORKS}
						shouldUseWallets={process.env.USE_WALLET}>
						<HeaderTitle />
					</Header>
					<Component
						key={router.route}
						router={props.router}
						{...pageProps} />
					<Footer />
				</div>
			</div>
		</>
	);
}

function	MyApp(props: AppProps): ReactElement {
	const	{Component, pageProps} = props;
	
	return (
		<WithYearn>
			<YVempireContextApp>
				<AppWrapper
					Component={Component}
					pageProps={pageProps}
					router={props.router} />
			</YVempireContextApp>
		</WithYearn>
	);
}

export default MyApp;
