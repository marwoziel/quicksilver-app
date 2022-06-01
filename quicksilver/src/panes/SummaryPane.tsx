
import React, {useEffect} from 'react';
import { coins } from "@cosmjs/launchpad"

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
        console.log(converted);
        return converted;
      }


    const renderValidators = () => {
    
// out = out.concat(addValidator('cosmosvaloper1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u2lcnj0', 0.25))
// out = out.concat(addValidator('cosmosvaloper156gqf9837u7d4c4678yt3rl4ls9c5vuursrrzf', 0.15))
// out = out.concat(addValidator('cosmosvaloper14lultfckehtszvzw4ehu0apvsr77afvyju5zzy', 0.3))
// out = out.concat(addValidator('cosmosvaloper1a3yjj7d3qnx4spgvjcwjq9cw9snrrrhu5h6jll', 0.05))
// out = out.concat(addValidator('cosmosvaloper1z8zjv3lntpwxua0rtpvgrcwl0nm0tltgpgs6l7', 0.35))


        const validators = Object.values(props.allocationProp).map((obj : any) => {
            // memo.push(`${obj.value/100}${obj.address}`)
          out = out.concat(addValidator(obj.address, obj.value/100));
          console.log(out);
     
            return (
                <>
                  <h5>{obj.name} : {obj.value}</h5> 
                </> 
            )
        }
            // <h5>{props.allocationProp[name]}</h5> 
            
        )
        out = Buffer.from(out).toString('base64');
       // console.log('Out', Buffer.from(out).toString('base64'))
        return validators;
    }

    const onStakeClick = async (e: any) => {
       //  const memo = "g7U6u9$P7/9ubv(5G85.01GFv4Iw%L2Pao&6=vqY93b!j2MLem2n50%9T@&36=Fa#1pC!z9#b>e1Sd{Z92}6Q9#(vg2]BA}7yH=Q3<3[N85Bn69ruMW10eH72[c}z9t5z!5/}F]022LK5ci4B5/q8>00KhH1RqsH0%otVmGJ!@5!2u]6aj*J1@[S]0$bbr2M>[N9$G274*%D!2MK&8";
        // const memo = "First transaction!";
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
            "gas": "100000",
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

    console.log("Existing Delegations", props.selectedExistingDelegations)
    console.log("Allocations", props.allocationProp )
    return (
        <>
        <div>
            <h2> Summary </h2>
            <h4> Total Stake: {totalStake} {props.selectedNetwork.base_denom}</h4>
            <h4>Deposit Address:  {props.selectedNetwork.deposit_address.address}</h4>
            <h4>Redemption Rate:  1 {props.selectedNetwork.local_denom} =  {props.selectedNetwork.redemption_rate} {props.selectedNetwork.base_denom}</h4>
            <h4>{props.selectedNetwork.local_denom} : {totalStake/props.selectedNetwork.redemption_rate}</h4>
            {/* <h4> Delegations: </h4>
            {props.selectedExistingDelegations.map((x: any) => <>
                 <h6> {x['name']} : {x.coins[0].amount} {x.coins[0].denom}</h6></> */}
                 <h4> Validators: </h4>
         
                 {/* {props.allocationProp.map((x: any) => <>
                 <h6> {x['name']} : {x.value} %</h6></> 
                
        )} */}
        </div>
        {renderValidators()}
        <button onClick={onStakeClick}> STAKE  </button>
        </>
    );
}

