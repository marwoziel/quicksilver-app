
import React, {useEffect} from 'react';
import { coins } from "@cosmjs/launchpad"
import { parseCoins } from "@cosmjs/stargate";


let { bech32 } = require('bech32')
interface PropComponent {
    prev? : { () : void  };
    next?: { (): void}; 
    selectedNetwork? : any;
    selectedExistingDelegations: any;
    networkAddress?: string;
    client? : any;
    balances: Map<string, Map<string, number>>;
    isStaked: boolean;
    setIsStaked: Function;
    setShowSummaryExistingDelegations : Function; 

  }



export default function SummaryExistingDelegationsPane(props: PropComponent) {
    const [totalStake, setTotalStake] = React.useState(0);


    useEffect(() => {
        let sum = 0;
        props.selectedExistingDelegations.forEach((x: any) => {
            sum = sum + +(x.coins[0].amount);
        })
        sum = Math.abs(sum / props.selectedNetwork.redemption_rate)*props.selectedNetwork.redemption_rate
        setTotalStake(sum);
    }, [])


 





    const stakeExistingDelegations = async (e: any) => {
      props.setShowSummaryExistingDelegations(false);
      props.setIsStaked(true);
      console.log('Stake existing');
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

          console.log(broadcastResult2);

      }

    


    return (
        <>
        <div>
            <h2> Summary Existing Delegations </h2>
            <h4> Total Stake: {totalStake} {props.selectedNetwork.base_denom}</h4>
            <h4>Deposit Address:  {props.selectedNetwork?.deposit_address?.address}</h4>
            <h4>Redemption Rate:  1 {props.selectedNetwork?.local_denom} =  {props.selectedNetwork?.redemption_rate} {props.selectedNetwork.base_denom}</h4>
            <h4>{props.selectedNetwork?.local_denom} : {totalStake/props.selectedNetwork?.redemption_rate}</h4>
            <h4> Delegations: </h4>
            {props.selectedExistingDelegations.map((x: any) => <>
                 <h6> {x['name']} : {x.coins[0].amount} {x.coins[0].denom}</h6></> )}
               
        </div>
        <button onClick={stakeExistingDelegations} > STAKE EXISTING DELEGATIONS </button>
        </>
    );
}

