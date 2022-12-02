import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';

import '@rainbow-me/rainbowkit/styles.css';
import {
	darkTheme,
	getDefaultWallets,
	RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
	[chain.polygonMumbai],
	[publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: 'D-Uni',
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	return (
		<div>
			<Head>
				<title>DUni</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains} theme={darkTheme()}>
					<ColorSchemeProvider
						colorScheme={colorScheme}
						toggleColorScheme={toggleColorScheme}
					>
						<MantineProvider
							withGlobalStyles
							withNormalizeCSS
							theme={{
								/** Put your mantine theme override here */
								colorScheme,
							}}
						>
							<Component {...pageProps} />
						</MantineProvider>
					</ColorSchemeProvider>
				</RainbowKitProvider>
			</WagmiConfig>
		</div>
	);
}
