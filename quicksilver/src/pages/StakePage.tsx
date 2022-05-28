import  React, { useEffect } from 'react';
import './StakePage.css';
import ConnectWalletPane from '../panes/ConnectWalletPane';
import NetworkSelectionPane from '../panes/NetworkSelectionPane';
import ExistingDelegationsPage from '../panes/ExistingDelegationsPane';
import ValidatorSelectionPane from '../panes/ValidatorSelectionPane';
import LogoWhite from '../assets/icons/logo-whitestroke.svg';
import LogoGray from '../assets/icons/logo-graystroke.png';
import SummaryPane from '../panes/SummaryPane';
import AllocationPane from '../panes/AllocationPane';



interface PropComponent {
  handleBack? : { () : void  };
  handleNext?: { (): void};
  handleClickOpen? : { (): void};
  activeStep: number
}

export default function StakePage({handleNext, handleBack, handleClickOpen, activeStep}: PropComponent) {

    const [stakeExistingDelegations, setStakeExistingDelegations] = React.useState(false);
    const [stakeNewAllocations, setStakeNewAllocations] = React.useState(false);
    const [showAllocationsPane, setShowAllocationsPane] = React.useState(false);
    const [chainId, setChainId] = React.useState("");
    const [selectedValidators, setSelectedValidators] = React.useState([]);
    const [allocation, setAllocation] = React.useState(new Map<string, number>());
    const [stakeAmount, setStakeAmount] = React.useState<number>(0);
    const [selectedNetwork, setSelectedNetwork] = React.useState<any>("Select a network");
    const [balances, setBalances] = React.useState<Map<string, Map<string, number>>>(new Map<string, Map<string, number>>());
    const [networkAddress, setNetworkAddress] = React.useState('');
  

    // useEffect() {
    //   // CALL API TO FETCH ALL VALIDATORS;
     //    setAllValidatorrs(data);
    // }


    const showAllocationPane = () : void => {
        setShowAllocationsPane(true);
        setStakeNewAllocations(false);
    }
 

    const handleExistingDelegations = () => {
        setStakeExistingDelegations(true);
        if(stakeNewAllocations) {
          setStakeNewAllocations(false);
        }
    }

    const handleNewAllocations = () => {
        setStakeNewAllocations(true);
        if(stakeExistingDelegations) {
          setStakeExistingDelegations(false);
        }
    }

    const handleSetChainId = async (newChainId: string): Promise<void> => {
      if (chainId !== newChainId) {
          setSelectedValidators([])
          setAllocation(new Map<string, number>())
          setChainId(newChainId);
      }
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
                {activeStep === 1 &&  <ConnectWalletPane /> }
                {activeStep === 2 &&  <NetworkSelectionPane selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} handleSetChainId={handleSetChainId} next={handleNext} prev={handleBack} 
                stakeExistingDelegations={handleExistingDelegations} balances={balances} networkAddress={networkAddress} setNetworkAddress={setNetworkAddress} setBalances={setBalances} stakeAllocations={handleNewAllocations}/>  }
                {activeStep === 3 && stakeExistingDelegations && <ExistingDelegationsPage next={handleNext} prev={handleBack}/>}
                {activeStep === 3 && selectedNetwork !== "Select a network" && stakeNewAllocations && <ValidatorSelectionPane selectedNetwork={selectedNetwork} prev={handleBack} setSelectedValidators={setSelectedValidators} showAllocationPane={showAllocationPane}/>} 
                {activeStep === 3 && !stakeNewAllocations && showAllocationsPane && <AllocationPane selectedNetwork={selectedNetwork} balances={balances} selectedValidators={selectedValidators} />}
                {activeStep === 4 && <SummaryPane/>}
                {/* {activeStep === 3 && stakeNewAllocations && <ValidatorSelectionPane allValidators={allValidators} setSelectedValidators={setSelectedValidator} next={handleNext} prev={handleBack}/>} */}
                </div>
        </div>
    )
}