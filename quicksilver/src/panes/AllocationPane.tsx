import React , {useState} from 'react';

interface PropComponent {
    selectedValidators? : any;
    balances: Map<string, Map<string, number>>;
    selectedNetwork? : any;
}

export default function AllocationPane(props: PropComponent) {
    const [rangeval, setRangeval] = useState('');
    return (
    <div>
        <h1> Balance :     {props.balances && <div>{props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.base_denom)}</div>}</h1>
        {props.selectedValidators.map((val: any) => <>
        <h5>{val.name}</h5>
        <input type="range" id="vol" name="vol" min="0" max="100"  onChange={(event) => setRangeval(event.target.value)} />
        <input type="text"></input>
        </>
            
        )}
        </div> 
    );
}