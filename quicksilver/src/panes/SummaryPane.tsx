
import React, {useEffect} from 'react';
import { coins } from "@cosmjs/launchpad"
import { parseCoins } from "@cosmjs/stargate";


let { bech32, bech32m } = require('bech32')
interface PropComponent {
    prev? : { () : void  };
    next?: { (): void}; 
    selectedNetwork? : any;
    selectedExistingDelegations: any;
    allocationProp?: any;
    networkAddress?: string;
    client? : any;
    balances: Map<string, Map<string, number>>;

  }



export default function SummaryPane(props: PropComponent) {
    const [totalStake, setTotalStake] = React.useState(5000);
    let out : string | Array<any> = [];


    useEffect(() => {
        let sum = 0;
        props.selectedExistingDelegations.forEach((x: any) => {
            sum = sum + +(x.coins[0].amount);
        })
        sum = Math.abs(sum / props.selectedNetwork.redemption_rate)*props.selectedNetwork.redemption_rate
        setTotalStake(sum);
    }, [])


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
            // memo.push(`${obj.value/100}${obj.address}`)
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

        const msgSend = {
          fromAddress: props.networkAddress,
          toAddress: props.selectedNetwork.deposit_address.address,
          amount: coins(1234, props.selectedNetwork.base_denom),
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
    }

    const stakeExistingDelegations = async (e: any) => {
      let msg = [];
      msg = props.selectedExistingDelegations.map((x: any) => { return {
        typeUrl: "/cosmos.staking.v1beta1.MsgTokenizeShares",
        value: {
              
                  delegatorAddress: props.networkAddress,
                  validatorAddress: x.validator_address,
                  amount: {
                     "amount": x.coins[0].amount,
                     "denom": x.coins[0].denom
                  },
                  tokenizedShareOwner: props.networkAddress,
                }}
              });
     
              let denoms = "5000cosmosvaloper1lchu8kyhzcahu0m0cs63wvxnxkp7ks0ym2pmp2"
     
        const broadcastResult = await props.client.signAndBroadcast(
            props.networkAddress,
            [...msg],
           {
              "gas": "1000000",
              "amount": [
                {
                  "denom": "uatom",
                  "amount": "300"
                }
              ]
            },
            'Existing Delegations Transaction'
          );

          let coinstring = '';
          JSON.parse(unescape(broadcastResult.rawLog)).forEach((x: any) => x.events.forEach((y: any) => {if(y.type === "coinbase"){ 
            return y.attributes.forEach((attr: any, index: any) => {
                 if(attr.key === "amount") {
                     coinstring +=  `${attr.value},`;
                 }
             })
          }} ));



          const msgSend = {
            fromAddress: props.networkAddress,
            toAddress: props.selectedNetwork.deposit_address.address,
            amount: parseCoins(coinstring.slice(0, -1)),
          };
          
          const msgAny = {
              typeUrl: "/cosmos.bank.v1beta1.MsgSend",
            value: msgSend,
          };
          
         
          const broadcastResult2 = await props.client.signAndBroadcast(
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
            "Staking existing transaction - 2 ",
          );

      }

    


    return (
        <>
        <div>
            <h2> Summary </h2>
            <h4> Total Stake: {totalStake} {props.selectedNetwork.base_denom}</h4>
            <h4>Deposit Address:  {props.selectedNetwork?.deposit_address?.address}</h4>
            <h4>Redemption Rate:  1 {props.selectedNetwork?.local_denom} =  {props.selectedNetwork?.redemption_rate} {props.selectedNetwork.base_denom}</h4>
            <h4>{props.selectedNetwork?.local_denom} : {totalStake/props.selectedNetwork?.redemption_rate}</h4>
            {/* <h4> Delegations: </h4>
            {props.selectedExistingDelegations.map((x: any) => <>
                 <h6> {x['name']} : {x.coins[0].amount} {x.coins[0].denom}</h6></> */}
                 <h4> Validators: </h4>
         
                 {/* {props.allocationProp.map((x: any) => <>
                 <h6> {x['name']} : {x.value} %</h6></> 
                
        )} */}
        </div>
        {renderValidators()}
        {/* <button onClick={onStakeClick}> STAKE  </button> */}
        <button onClick={stakeExistingDelegations} > STAKE EXISTING DELEGATIONS </button>
        </>
    );
}

