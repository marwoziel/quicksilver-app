import React from 'react';
import { Routes, Route, useLocation} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import StakePage from './pages/StakePage';
import PoolsPage from './pages/PoolsPage';
import GovernancePage from './pages/GovernancePage';
import AirdropPage from './pages/AirdropPage';
import LogoStroke from './assets/quicksilver-logo-stroke.svg';
import { QsPageProps } from "./types/helpers";
import { initKeplrWithQuickSilver, initKeplrWithNetwork } from "./types/chains";
import { SigningStargateClient } from "@cosmjs/stargate"
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import LandingPage from './pages/LandingPage';


function App() {
  const [wallets, setWallets] = React.useState<Map<string, SigningStargateClient>>(new Map<string, SigningStargateClient>());
  const [balances, setBalances] = React.useState<Map<string, Map<string, number>>>(new Map<string, Map<string, number>>());
  const [isWalletConnected, setWalletConnection] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () : void => {
    setActiveStep((activeStep) => activeStep + 1);
};

const handleBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
};

  const handleClickOpen = () => {
      // @ts-expect-error
    if (window &&  !window.keplr) {
      alert("Please install keplr extension");
  }  else {
 connectKeplr();
}
  };

  const location = useLocation();
  console.log(location);
  const connectKeplr = async () => {

    initKeplrWithQuickSilver(async(key: string, val: SigningStargateClient) => {
      setWallets(new Map<string, SigningStargateClient>(wallets.set(key, val)));
      setWalletConnection(true);
      let keplr = await getKeplrFromWindow();
      let chainId = await val.getChainId();
      let pubkey = await keplr?.getKey(chainId);
      let bech32 = pubkey?.bech32Address;
      console.log(bech32);
      if (bech32) {
        let roBalance = await val.getAllBalances(bech32)
        roBalance.forEach((bal: any) => {
          // there must be an easier way to remove readonly property from the returned Coin type?
          let networkBalances = balances.get(chainId);
          if (!networkBalances) {
            networkBalances = new Map<string, number>()
          }
          setBalances(new Map<string, Map<string, number>>(balances.set(chainId, new Map<string, number>(networkBalances.set(bal.denom, parseInt(bal.amount))))));

        })

        console.log("balances", balances, chainId);

      }
    });
    handleNext();
  }

  
  return (
    <>
  
{/*    
    <img className="logo-stroke" src={LogoStroke}/> */}

  {location.pathname !== '/' && <Navbar balances={balances} handleClickOpen={handleClickOpen}/>}
   <Routes>
   {/* <Route path="/" element={<HomePage wallets={wallets} walletModal={handleClickOpen} balances={balances} />}/> */}
                      <Route path="/" element={<LandingPage/>}/>
          
                      <Route path="/stake" element={<StakePage isWalletConnected={isWalletConnected} setActiveStep={setActiveStep} handleClickOpen={handleClickOpen} handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} />}/>
                      <Route path="/pools" element={<PoolsPage  />}/>
                      <Route path="/gov" element={<GovernancePage  />}/>
                      <Route path="/claims" element={<AirdropPage  />}/>
                    
   </Routes>

   </>
  );
}

export default App;
