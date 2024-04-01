import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import dynamic from "next/dynamic";
import { waitUntilSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import Link from "next/link";
import ReactDOM from 'react-dom'
import Router from "next/router";
import axios from 'axios';





// const {} = dynamic(import("tw-elements"), { ssr: false });

export const injected = new InjectedConnector({ supportedChainIds: [25,338]});

export default function Home() {
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 28000);
  });

  const [hasMetamask, setHasMetamask] = useState(false);
  
  const [userAccounts, setUserAccounts] = useState([]);
  
  const [chainID, setChainID] = useState('');
  
  

  const Web3 = require('web3');
  const web3 = new Web3('https://evm.cronos.org');
  
 
  var Eth = require('web3-eth');

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser. set to cronos testnet
var eth = new Eth(Eth.givenProvider || 'https://evm.cronos.org');

const gasPrice = eth.getGasPrice()


    
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if(localStorage?.getItem('isWalletConnected') === 'true'){
        try {
          await activate(injected)
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }

    }
    connectWalletOnPageLoad();
 if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }

   
  }, []);

  const {
    active,
    activate,
    chainId,
    account,
    deactivate, 
    library: provider,
  } = useWeb3React();





  async function connect() {
 
    
    if (typeof window.ethereum !== "undefined") {
      try {
       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
       await activate(injected);
       setHasMetamask(true);
       setUserAccounts(accounts);
      myPromise
       
       .then(sessionStorage.setItem('isWalletConnected', true))
     } catch (e) {
        console.log(e);
      
      }
    }
  }


  function copyToClipboard(event) {
    const text = event.target.textContent;
    navigator.clipboard.writeText(text)
    .then(() => {
      alert(`Address "${text}" copied to clipboard`);
    })
    .catch((err) => {
      console.error('Failed to copy address: ', err);
    });
  }
  

 
  async function disconnect() 
  {
      try {
        deactivate();
        localStorage.setItem('isWalletConnected', false)
      } catch (error) {
        console.log(error);
      }
  }


  return (
    <div id="bod">
     
      <Head>
        <title>Connect web 3</title>
        <meta name="description" content="sinmple connect web 3 button" />
    <meta property="og:title" content="Connect web 3" />
    <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.nav_grid}>
    <a
            className={styles.connect_button} 
          >
  {hasMetamask ? (
        active ? (<></>
        ) : (
          <button className={styles.connect_button} id="connectbutton" onClick={() => connect()} style={{ transition: 'all 300ms'}}>CONNECT</button>
        )
      ) : (
        <button className={styles.button} id="connectbutton" onClick={() => window.location.href='https://metamask.io/download/'}>ADD METAMASK</button>
      )}
      {active ? <><button id="connectbutton" className={styles.connect_button} onClick={() => disconnect()}>DISCONNECT</button>
      </>: ""} 
      
      
          </a>
          
      </nav>
    
        
        
        
    
         
    </div>
  );
}
