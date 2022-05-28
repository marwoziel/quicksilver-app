import React, {useEffect} from 'react';

interface PropComponent {
    prev? : { () : void  };
    next?: { (): void}; 
    selectedNetwork? : any;
  }



export default function SummaryPane(props: PropComponent) {
    const [totalStake, setTotalStake] = React.useState(5000);

    return (
        <div>
            <h4> Total Stake: {totalStake} {props.selectedNetwork.base_denom}</h4>
            <h4>Deposit Address:  {props.selectedNetwork.deposit_address.address}</h4>
            <h4>Redemption Rate:  1 {props.selectedNetwork.local_denom} =  {props.selectedNetwork.redemption_rate} {props.selectedNetwork.base_denom}</h4>
            <h4> QTokens Received: {totalStake/props.selectedNetwork.redemption_rate}</h4>
        </div>
    );
}