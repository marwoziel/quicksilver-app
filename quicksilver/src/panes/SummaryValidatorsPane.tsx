
import React, {useEffect} from 'react';
import { coins } from "@cosmjs/launchpad"
import './SummaryPane.css';


let { bech32 } = require('bech32')
interface PropComponent {
    prev? : { () : void  };
    next?: { (): void}; 
    selectedNetwork? : any;
    allocationProp?: any;
    networkAddress?: string;
    client? : any;
    balances: Map<string, Map<string, number>>;
    isStaked: boolean;
    setIsStaked: Function;
    setShowSummaryValidators: Function;
    stakingAmountValidators: number;

  }



export default function SummaryValidatorsPane(props: PropComponent) {

    let out : string | Array<any> = [];




    function valToByte(val: any) {
        if (val > 1) { val = 1 }
        if (val < 0) { val = 0 }
        return Math.abs(val*200)
      }
      
      function addValidator(valAddr: any, weight: any) {
        let addr = bech32.decode(valAddr)
         let  converted = bech32.fromWords(addr.words);
        converted.unshift(valToByte(weight));
        return converted;
      }


    const renderValidators = () => {
        const validators = Object.values(props.allocationProp).map((obj : any) => {
          out = out.concat(addValidator(obj.address, obj.value/100));
     
            return (
                <>
                  <h6>{obj.name} : <span className="font-bold"> {obj.value} % </span></h6> 
                </> 
            )
        }
        )
        out = Buffer.from(out).toString('base64');
        return validators;
    }

    const onStakeClick = async (e: any) => {


        const msgSend = {
          fromAddress: props.networkAddress,
          toAddress: props.selectedNetwork.deposit_address.address,
          amount: coins((props.stakingAmountValidators * 1000000), props.selectedNetwork.base_denom),
        };
        
        const msgAny = {
            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: msgSend,
        };
        

       const broadcastResult = await props.client.signAndBroadcast(
          props.networkAddress,
          [msgAny],
         {
            "gas": "200000",
            "amount": [
              {
                "denom": "uatom",
                "amount": "300"
              }
            ]
          },
          out,
        );
        console.log(broadcastResult);
        if(broadcastResult.code === 0 ) {
            props.setShowSummaryValidators(false);
            props.setIsStaked(true);
        }
  
    }

    


    return (
        <>
        <div className="summary-validator-pane d-flex mt-4 justify-content-center align-items-center flex-column">
            <h2 className="mt-4"> Summary </h2> 
            <h5 className="mt-4"> Total Stake: <span className="font-bold">{props.stakingAmountValidators} {props.selectedNetwork.base_denom.substring(1)} </span></h5>
            <h5>Redemption Rate:  <span className="font-bold">1 {props.selectedNetwork?.local_denom.substring(1)} =  {parseFloat(props.selectedNetwork?.redemption_rate).toFixed(4)} {props.selectedNetwork.base_denom.substring(1)} </span></h5>
            <h5>qTokens Received:  <span className="font-bold">{props.stakingAmountValidators/props.selectedNetwork?.redemption_rate}</span></h5>
            <h6 className="mt-4"> Validator List: </h6>
        {renderValidators()}
        <button className="stake-button mt-3" onClick={onStakeClick}> STAKE  </button>
        </div>
        </>
    );
}

