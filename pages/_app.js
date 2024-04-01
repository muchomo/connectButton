import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ToastProvider } from 'react-toast-notifications';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faFacebook, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'

const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

function MyApp({ Component, pageProps }) {
  config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(
  faFacebook, faTwitter, faDiscord
);
  return (
    
  
    <Web3ReactProvider getLibrary={getLibrary}>
    <ToastProvider
    autoDismiss
    autoDismissTimeout={6000}
    placement="top-right"
  >
    
      <Component {...pageProps} />
      <ToastContainer />
      </ToastProvider>
    </Web3ReactProvider>
    
    
  );
}

export default MyApp;
