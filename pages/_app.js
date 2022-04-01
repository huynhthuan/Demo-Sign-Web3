import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core';
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'

const config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
        [Mainnet.chainId]: getDefaultProvider(),
    },
};

function MyApp({ Component, pageProps }) {
    return (
        <DAppProvider config={config}>
            <Component {...pageProps} />
        </DAppProvider>
    );
}

export default MyApp;
