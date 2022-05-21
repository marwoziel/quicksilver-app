import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import StakePage from './pages/StakePage';
import LogoStroke from './assets/quicksilver-logo-stroke.svg';

function App() {
  return (
    <>
   <Navbar/>
    <img className="logo-stroke" src={LogoStroke}/>
   <StakePage/>
   </>
  );
}

export default App;
