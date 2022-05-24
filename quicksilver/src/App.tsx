import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import StakePage from './pages/StakePage';
import PoolsPage from './pages/PoolsPage';
import GovernancePage from './pages/GovernancePage';
import AirdropPage from './pages/AirdropPage';
import LogoStroke from './assets/quicksilver-logo-stroke.svg';
import { QsPageProps } from "./types/helpers";


function App(props: QsPageProps) {
  const handleClickOpen = () => {
    connectKeplr();
  };

  const connectKeplr = () => {
    console.log('Connecting Kelpr');
  }
  return (
    <>
  
   
    <img className="logo-stroke" src={LogoStroke}/>
   {/* <StakePage walletModal={handleClickOpen}/> */}
   <Router>
   <Navbar/>
   <Routes>
   {/* <Route path="/" element={<HomePage wallets={wallets} walletModal={handleClickOpen} balances={balances} />}/> */}
                      <Route path="/" element={<StakePage  />}/>
                      <Route path="/pools" element={<PoolsPage  />}/>
                      <Route path="/gov" element={<GovernancePage  />}/>
                      <Route path="/claims" element={<AirdropPage  />}/>
   </Routes>
   </Router>
   </>
  );
}

export default App;
