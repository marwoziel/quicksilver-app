import * as React from 'react';
import './StakePage.css';
import ConnectWalletPane from '../panes/ConnectWalletPane';
import NetworkSelectionPane from '../panes/NetworkSelectionPane';
import ExistingDelegationsPage from '../panes/ExistingDelegationsPane';


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
            <div className="stepper col-2">
                STEPPER
            </div>
            <div className="content col-10">
                {activeStep === 1 &&  <ConnectWalletPane next={handleNext} /> }
                {activeStep === 2 &&  <NetworkSelectionPane  next={handleNext} prev={handleBack} 
                stakeExistingDelegations={handleExistingDelegations} stakeNewAllocations={handleNewAllocations}/>  }
                {activeStep === 3 && stakeExistingDelegations && <ExistingDelegationsPage/>}
                </div>
        </div>
    )
}