import * as React from 'react';
import './StakePage.css';
import ConnectWalletPane from '../panes/ConnectWalletPane';
import NetworkSelectionPane from '../panes/NetworkSelectionPane';
import ExistingDelegationsPage from '../panes/ExistingDelegationsPane';
import ValidatorSelectionPane from '../panes/ValidatorSelectionPane';
import LogoWhite from '../assets/icons/logo-whitestroke.svg';
import LogoGray from '../assets/icons/logo-graystroke.png';


export default function StakePage() {
    const [activeStep, setActiveStep] = React.useState(1);
    const [stakeExistingDelegations, setStakeExistingDelegations] = React.useState(false);
    const [stakeNewAllocations, setStakeNewAllocations] = React.useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleExistingDelegations = () => {
        setStakeExistingDelegations(true);
    }

    const handleNewAllocations = () => {
        setStakeNewAllocations(true);
    }


    return (
        <div className="row">
            <div className="stepper col-2 d-flex flex-column ">
            <div className="step d-flex mt-5 ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
     <img className="logo" src={LogoWhite}/>
        <div className="line h-100"></div>
      </div>
      <div>
        <h6 className="step-text-bold">Connect Wallet</h6>
      </div>
    </div>
    <div className="step d-flex ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
     <img className="logo" src={activeStep >=2 ? LogoWhite : LogoGray}/>
        <div className="line h-100"></div>
      </div>
      <div>
        <h6 className={( activeStep >= 2 ? " step-text-bold" : "step-text-gray")}>Choose Network</h6>
      </div>
    </div>
    <div className="step d-flex ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
      <img className="logo" src={activeStep >=3 ? LogoWhite : LogoGray}/>
        <div className="line h-100"></div>
      </div>
      <div>
        <h6 className={( activeStep >= 3 ? " step-text-bold" : "step-text-gray")}>Choose</h6>
      </div>
    </div>
    <div className="step d-flex ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
      <img className="logo" src={activeStep >=4 ? LogoWhite : LogoGray}/>
      </div>
      <div>
        <h6 className={( activeStep >= 4 ? " step-text-bold" : "step-text-gray")}>Stake</h6>
      </div>
    </div>
              
            </div>
            <div className="content col-10">
                {activeStep === 1 &&  <ConnectWalletPane next={handleNext} /> }
                {activeStep === 2 &&  <NetworkSelectionPane  next={handleNext} prev={handleBack} 
                stakeExistingDelegations={handleExistingDelegations} stakeAllocations={handleNewAllocations}/>  }
                {activeStep === 3 && stakeExistingDelegations && <ExistingDelegationsPage/>}
                {activeStep === 3 && stakeNewAllocations && <ValidatorSelectionPane/>}
                </div>
        </div>
    )
}