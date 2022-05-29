import React , {useEffect, useState} from 'react';

interface PropComponent {
    selectedValidators? : any;
    balances: Map<string, Map<string, number>>;
    selectedNetwork? : any;
    prev: Function;
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

    const onPrev = (e: any) => {
        props.prev();
    }

    const onNext = (e: any) => {
        let sum = 0;
        props.selectedValidators.forEach((x: any) => {      
        sum = sum + allocationProp[x.name]['value'] ; })
        console.log(sum);
        if(sum < 100) {
            console.log("Please allocation more atoms");
        } else if(sum > 100) {
            console.log("Please allocation less atoms");
        } else {
            console.log("please proceed");
        }
    }

    const onMaxClick = (event: React.MouseEvent<HTMLElement>) => {
            let value = totalAmount/props.selectedValidators.length;
            console.log(value);
            props.selectedValidators.forEach((x: any) => {      
                let newAllocationProp : any = {...allocationProp};
            newAllocationProp[x.name]['value'] = (value/totalAmount) * 100;
            setAllocationProp(newAllocationProp) }) ;

    }

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
         <button onClick={onMaxClick}> MAX </button> 
         {props.selectedValidators.length}
        {renderValidators()}
        
        <button onClick={onPrev}> PREV </button>
        <button onClick={onNext}>NEXT</button>
        </div> 
    );
}