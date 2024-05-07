import { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import CounterState from "./components/counter-state";
import IncrementButton from "./components/increment-button";

import './App.css';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  
  // You can also provide a custom RPC endpoint.
  const endpoint = "http://127.0.0.1:8899";

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoint]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <h1>Hello Solana</h1> 
          <CounterState />
          <IncrementButton />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
