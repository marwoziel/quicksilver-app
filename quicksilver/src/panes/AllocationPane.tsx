import React , {useEffect, useState} from 'react';

interface PropComponent {
    selectedValidators? : any;
    balances: Map<string, Map<string, number>>;
    selectedNetwork? : any;
}

export default function AllocationPane(props: PropComponent) {
    const [rangeval, setRangeval] = useState('');
    const [allocationProp, setAllocationProp] = useState<any>({});
    const totalAmount = 1000;

    useEffect(() => {
        if(props.selectedValidators.length > 0) {
          let temp =  props.selectedValidators.reduce((acc: any, curr: any) => {
                    acc[curr.name] = {...curr, value: 0}
                    return acc;
            }, allocationProp);
            setAllocationProp(temp);
        }
    }, [])

    const handleAllocationChange = (e: any) => {
           // setAllocationProp({...allocationProp, [e.target.name] :{ , value: e.target.value}})
           let newAllocationProp : any = {...allocationProp};
           newAllocationProp[e.target.name]['value'] = +(e.target.value);
          
           setAllocationProp(newAllocationProp)
            // setAllocationProp(allocation=>({
            //     ...allocation,
            //     [e.target.name]: e.target.value
            //  }))
    }

    console.log('Allocation Prop', allocationProp);
    const renderValidators = () => {
        return ( props.selectedValidators.map((val: any) => <>
            <h5>{val.name}</h5>
            <input onChange={handleAllocationChange} type="range" value={Object.keys(allocationProp).length ? allocationProp[val.name]['value'] : '' } name={val.name} min="0" max="100"   />
            <input onChange={handleAllocationChange} value={Object.keys(allocationProp).length ? allocationProp[val.name]['value']: '' } name={val.name}  type="number"></input>
            </>
                
            )
        )
    }

    return (
    <div>

        <h1> Balance :     {props.balances && <div>{props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.base_denom)}</div>}</h1>
        <h3> Amount: </h3> <input type="number"/>
         <button> MAX </button> 
        {renderValidators()}
        </div> 
    );
}