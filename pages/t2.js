import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import WalletConnectClient from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import styles from "../styles/Home.module.css";

export const injected = new InjectedConnector({ supportedChainIds: [25, 338] });

export default function Home() {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [walletConnector, setWalletConnector] = useState(null);
  const [userAccounts, setUserAccounts] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const { activate, deactivate, active } = useWeb3React();

  useEffect(() => {
    const initWalletConnect = async () => {
      const connector = new WalletConnectClient({
        bridge: 'https://bridge.walletconnect.org', // Crypto.com DeFi Wallet Connect bridge URL
        qrcodeModal: QRCodeModal,
      });

    //   if (!connector.connected) {
    //     connector.createSession();
    //   }

      setWalletConnector(connector);
    };

    initWalletConnect();

    if (typeof window.ethereum !== 'undefined') {
      setHasMetamask(true);
    }

    if (localStorage.getItem('isWalletConnected') === 'true') {
      setIsWalletConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    try {
      await activate(injected);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUserAccounts(accounts);
      setIsWalletConnected(true);
      localStorage.setItem('isWalletConnected', true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await deactivate();
      setUserAccounts([]);
      setIsWalletConnected(false);
      localStorage.setItem('isWalletConnected', false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  return (
    <div>
      {hasMetamask ? (
        active ? (
          <>
            <button id="connectbutton" className={styles.connect_button} onClick={disconnectWallet}>Disconnect Wallet</button>
            <div>
              <ul>
                {userAccounts.map((account, index) => (
                  <li id="currentAct" key={index}>{account}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <button className={styles.connect_button} id="connectbutton" onClick={connectWallet}>Connect Wallet</button>
        )
      ) : (
        <button onClick={() => window.location.href = 'https://metamask.io/download/'}>Add MetaMask</button>
      )}

    </div>
  );
}
