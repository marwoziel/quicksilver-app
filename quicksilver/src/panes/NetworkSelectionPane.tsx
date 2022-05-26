import './NetworkSelectionPane.css';
import React, {useEffect}from 'react';
import Select from "react-select";
import axios from 'axios';
import { initKeplrWithNetwork } from "../types/chains";
import { SigningStargateClient } from "@cosmjs/stargate"
import { getKeplrFromWindow } from '@keplr-wallet/stores';
interface PropComponent {
    prev? : { () : void  };
    next?: { (): void};
    stakeAllocations? : { (): void};
    stakeExistingDelegations? : {(): void};      
    handleSetChainId? : {(): Promise<void>};  
  }


export default function NetworkSelectionPane(props: PropComponent) {

    
    const [isNetworkSelected, setNetworkSelected] = React.useState(false);
    let [selectedNetwork, setSelectedNetwork] = React.useState("Select a network");
    const [wallets, setWallets] = React.useState<Map<string, SigningStargateClient>>(new Map<string, SigningStargateClient>());
    const [balances, setBalances] = React.useState<Map<string, Map<string, number>>>(new Map<string, Map<string, number>>());
    const [isWalletConnected, setWalletConnection] = React.useState(false);

    useEffect(() => {
         loadData();
     }, []);

    const loadData = async () => {
        const response = await fetch("http://seed.quicktest-1.quicksilver.zone:1317/quicksilver/interchainstaking/v1/zones");
        const data = await response.json();
        console.log(data.zones);
    }


    const connectNetwork = async (network: string) => {
        console.log(network);
        initKeplrWithNetwork(async(key: string, val: SigningStargateClient) => {
          setWallets(new Map<string, SigningStargateClient>(wallets.set(key, val)));
          setWalletConnection(true);
          let keplr = await getKeplrFromWindow();
          let chainId = await val.getChainId()
          let pubkey = await keplr?.getKey(chainId)
          let bech32 = pubkey?.bech32Address
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
        }, network);
      }

    let networks = [
        { label: "Network 1", value: "Network 1" },
        { label: "Network 2", value: "Network 2" },
        { label: "Network 3", value: "Network 3" }
    ]

 
    let handleNetworkChange = (e: any) => {
        setSelectedNetwork(e.target.value)
      }

    const stakeLiquidAtoms = () => {
        props.next?.();
        props.stakeExistingDelegations?.();
    }

    const stakeNewAllocations = () => {
        props.next?.();
        props.stakeAllocations?.();
    }

    const connectCosmos = (event: React.MouseEvent<HTMLElement>) => {
        connectNetwork('qscosmos-1');
    }
    return (
        <div className="network-selection-pane d-flex flex-column align-items-center ">
            {/* <div className="wallet-details d-flex flex-column mt-5">
                <h4> My Wallet</h4>
                <h6>cosmos1rtqere</h6>
                <div className="row wallet-content mt-4">
                    <div className="col-3 text-center">
                       <h5 className="font-bold">2122</h5>
                       <p> ATOMS </p>
                    </div>
                    <div className="col-3 text-center">
                    <h5 className="font-bold">2322</h5>
                       <p> qATOMS </p>
                        </div>
                        <div className="col-3 text-center">
                        <h5 className="font-bold">16%</h5>
                       <p> APY </p>
                        </div>
                </div>
            </div> */}
        <div className="text-center">
        <h2 className="mt-4">Choose your network </h2>
        <button onClick={connectCosmos}>Connect to COSMOS</button> 
        {/* <div className="dropdown show mt-5">
  <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Choose network
  </a>

  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a className="dropdown-item" href="#">Network 1</a>
    <a className="dropdown-item" href="#">Network 2</a>
    <a className="dropdown-item" href="#">Network 3</a>
    <a className="dropdown-item" href="#">Network 4</a>
    <a className="dropdown-item" href="#">Network 5</a>
    <a className="dropdown-item" href="#">Network 6</a>
  </div>
</div> */}
{/* 
  {selectedNetwork}
    <br />

    <select value={selectedNetwork} onChange={handleNetworkChange}>
      {networks.map((network) => <option value={network.value}>{network.label}</option>)}
    </select> */}

{/* <Select
            value={}
            options={options}
            defaultValue={options[1]}
            onChange={handleNetworkChange}
        /> */}
    </div>
<div className="mt-5 button-container">
                <button className="prev-button mx-3" onClick={props.prev}> Previous</button>
               
            
                <button className="stake-existing-delegations-button mx-3" onClick={stakeLiquidAtoms}> Stake existing delegations </button>
                <button className="stake-liquid-atoms-button mx-3" onClick={stakeNewAllocations}> Stake Liquid ATOMS</button>
            </div>
            </div>

    );
}