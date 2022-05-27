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
    handleSetChainId? : {(newChainId: string): Promise<void>};  
    selectedNetwork? : any;
    setSelectedNetwork? : Function;
    setBalances?: Function;
    balances: Map<string, Map<string, number>>;
  }


export default function NetworkSelectionPane(props: PropComponent) {

    
    const [isNetworkSelected, setNetworkSelected] = React.useState(false);

    const [wallets, setWallets] = React.useState<Map<string, SigningStargateClient>>(new Map<string, SigningStargateClient>());

    const [isWalletConnected, setWalletConnection] = React.useState(false);
    const [networks, setNetworks] = React.useState<Array<any>>();

    useEffect(() => {
        // TODO - Add network check 
         loadData();
     }, []);

     useEffect(() => {
        if(props.selectedNetwork !== "Select a network") {
            connectNetwork(props.selectedNetwork.chain_id);
        }
     }, [props.selectedNetwork])

     const manipulateData = (zones: []) => {
            return zones.map((zone: any) => { return { label: zone.identifier, value: zone}})
     }
     console.log('Networks', networks);
    const loadData = async () => {
        const response = await fetch("http://seed.quicktest-1.quicksilver.zone:1317/quicksilver/interchainstaking/v1/zones");
        const data = await response.json();
        setNetworks(manipulateData(data.zones));

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
              let networkBalances = props.balances.get(chainId);
              if (!networkBalances) {
                networkBalances = new Map<string, number>()
              }
                        // @ts-expect-error
              props.setBalances(new Map<string, Map<string, number>>(props.balances.set(chainId, new Map<string, number>(networkBalances.set(bal.denom, parseInt(bal.amount))))));
    
            })
    
            console.log("balances", props.balances, chainId);
    
          }
        }, network);
      }

    // let networks = [
    //     { label: "Network 1", value: "Network 1" },
    //     { label: "Network 2", value: "Network 2" },
    //     { label: "Network 3", value: "Network 3" }
    // ]

 
    let handleNetworkChange = (selected: any) => {
        // setSelectedNetwork(e.target.value)
          // @ts-expect-error
          
        props.setSelectedNetwork(selected?.value);
        connectNetwork(props.selectedNetwork.chain_id);
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
        {/* <button onClick={connectCosmos}>Connect to COSMOS</button>  */}
        

<Select
            defaultValue={props.selectedNetwork?.identifier}
            options={networks}
            onChange={handleNetworkChange}
        />
    </div>
{ props.selectedNetwork.identifier}
    {props.balances && <div>{props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.base_denom)}</div>}
    
<div className="mt-5 button-container">
                <button className="prev-button mx-3" onClick={props.prev}> Previous</button>
               
            
                <button className="stake-existing-delegations-button mx-3" onClick={stakeLiquidAtoms}> Stake existing delegations </button>
                <button className="stake-liquid-atoms-button mx-3" onClick={stakeNewAllocations}> Stake Liquid ATOMS</button>
            </div>
            </div>

    );
}