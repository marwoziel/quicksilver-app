import './NetworkSelectionPane.css';
import React, {useEffect}from 'react';
import Select from "react-select";
import axios from 'axios';
import { initKeplrWithNetwork } from "../types/chains";
import { SigningStargateClient, StargateClient } from "@cosmjs/stargate"
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { valueTernary } from 'react-select/dist/declarations/src/utils';
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
    networkAddress: string;
    setNetworkAddress: Function;
    setClient? : Function;
    client: any;
    delegateToken: Function;
    networks: any;
  }


export default function NetworkSelectionPane(props: PropComponent) {

    
    const [isNetworkSelected, setNetworkSelected] = React.useState(false);

    const [wallets, setWallets] = React.useState<Map<string, SigningStargateClient>>(new Map<string, SigningStargateClient>());

    const [isWalletConnected, setWalletConnection] = React.useState(false);
  

 
     useEffect(() => {
        if(props.selectedNetwork !== "Select a network") {
            connectNetwork(props.selectedNetwork.chain_id);
        }
     }, [props.selectedNetwork])

     const manipulateData = (zones: []) => {
            return zones.map((zone: any) => { return { label: zone.identifier, value: zone}})
     }



    const connectNetwork = async (network: string) => {
        initKeplrWithNetwork(async(key: string, val: SigningStargateClient) => {
          setWallets(new Map<string, SigningStargateClient>(wallets.set(key, val)));
          setWalletConnection(true);
          // @ts-expect-error
          props.setClient(val);
     
          let keplr = await getKeplrFromWindow();
          let chainId = await val.getChainId();
          let pubkey = await keplr?.getKey(chainId);
          let bech32 = pubkey?.bech32Address;
         props.setNetworkAddress(bech32);
           // props.delegateToken(bech32, val);
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

 
    let handleNetworkChange = (selected: any) => {

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
            {props.networkAddress && props.selectedNetwork !== "Select a network" && props.balances && <div className="wallet-details d-flex flex-column mt-5">
                <h4> My Wallet</h4>
                <h6>{props.networkAddress}</h6>
                <div className="row wallet-content mt-4">
                    <div className="col-3 text-center">
                       <h5 className="font-bold">{props?.balances.get(props?.selectedNetwork.chain_id)?.get(props?.selectedNetwork.base_denom)}</h5>
                       <p> {props.selectedNetwork.base_denom.substring(1)} </p>
                    </div>
                    <div className="col-3 text-center">
                    <h5 className="font-bold">{props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.local_denom) ? props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.local_denom): '0'}</h5>
                       <p> {props.selectedNetwork.local_denom.substring(1)} </p> 
                        </div>
                  
                </div>
            </div> }
        <div className="text-center">
        <h2 className="mt-4">Choose your network </h2>

        

<Select className="custom-class mb-3 "
            defaultValue={{label:props.selectedNetwork.identifier}}
            options={props.networks}
            onChange={handleNetworkChange}
            
        />
    </div>

<div className="mt-5 button-container">
               
            
                <button disabled={props.selectedNetwork === "Select a network" ?  true: false} className="stake-existing-delegations-button mx-3" onClick={stakeLiquidAtoms}> Stake existing delegations </button>
                <button disabled={props.selectedNetwork === "Select a network" ?  true: false} className="stake-liquid-atoms-button mx-3" onClick={stakeNewAllocations}> Stake Liquid ATOMS</button>
            </div>
            </div>

    );
}