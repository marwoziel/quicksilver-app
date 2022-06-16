
import React, {useEffect} from 'react';
import { coins } from "@cosmjs/launchpad"
import { parseCoins } from "@cosmjs/stargate";


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

  }



export default function SummaryValidatorsPane(props: PropComponent) {
    const [totalStake, setTotalStake] = React.useState(5000);
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
                  <h5>{obj.name} : {obj.value}</h5> 
                </> 
            )
        }
            
        )
        out = Buffer.from(out).toString('base64');
        return validators;
    }

    const onStakeClick = async (e: any) => {
        props.setShowSummaryValidators(false);
        props.setIsStaked(true);
        
        const msgSend = {
          fromAddress: props.networkAddress,
          toAddress: props.selectedNetwork.deposit_address.address,
          amount: coins(12345, props.selectedNetwork.base_denom),
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
          props.setIsStaked(true);
        
    }

    


    return (
        <>
        <div>
            <h2> Summary Validators Pane </h2>
            <h4> Total Stake: {totalStake} {props.selectedNetwork.base_denom}</h4>
            <h4>Deposit Address:  {props.selectedNetwork?.deposit_address?.address}</h4>
            <h4>Redemption Rate:  1 {props.selectedNetwork?.local_denom} =  {props.selectedNetwork?.redemption_rate} {props.selectedNetwork.base_denom}</h4>
            <h4>{props.selectedNetwork?.local_denom} : {totalStake/props.selectedNetwork?.redemption_rate}</h4>
        </div>
        {renderValidators()}
        <button onClick={onStakeClick}> STAKE  </button>

        </>
    );
}

