
import React, {useEffect} from 'react';
import { coins } from "@cosmjs/launchpad"

interface PropComponent {
    prev? : { () : void  };
    next?: { (): void}; 
    selectedNetwork? : any;
    selectedExistingDelegations: any;
    allocationProp?: any;
    networkAddress?: string;
  }



export default function SummaryPane(props: PropComponent) {
    const [totalStake, setTotalStake] = React.useState(5000);

    useEffect(() => {
        let sum = 0;
        props.selectedExistingDelegations.forEach((x: any) => {
            sum = sum + +(x.coins[0].amount);
        })
        sum = Math.abs(sum / props.selectedNetwork.redemption_rate)*props.selectedNetwork.redemption_rate
        setTotalStake(sum);
    }, [])

    const renderValidators = () => {
        let memoString = '';
        const validators = Object.values(props.allocationProp).map((obj : any) => {
            // memo.push(`${obj.value/100}${obj.address}`)
            memoString += `${obj.value/100}${obj.address},`
            return (
                <>
                  <h5>{obj.name} : {obj.value}</h5> 
                </> 
            )
        }
            // <h5>{props.allocationProp[name]}</h5> 
            
        )
        console.log(memoString);
        return validators;
    }

    const onStakeClick = async (e: any) => {
        // const memo = "My very first tx!";
        // const msgSend = {
        //   fromAddress: props.networkAddress,
        //   toAddress: props.selectedNetwork.deposit_address.address,
        //   amount: coins(1234, "ucosm"),
        // };
        
        // const msgAny = {
        //     typeUrl: "/cosmos.staking.v1beta.MsgTokenizeShares",
        //   value: msgSend,
        // };
        
        // // Broadcast and sign the transaction
        // const broadcastResult = await client.signAndBroadcast(
        //   props.networkAddress,
        //   [msgAny],
        //   defaultFee,
        //   memo,
        // );
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

