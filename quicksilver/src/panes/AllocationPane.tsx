import React , {useEffect, useState, useRef} from 'react';

interface PropComponent {
    selectedValidators? : any;
    balances: Map<string, Map<string, number>>;
    selectedNetwork? : any;
    prev: Function;
    stakingAmountValidators? : number;
    setStakingAmountValidators?: Function;
    next?: { (): void};
    setAllocationProp?: Function;
}

export default function AllocationPane(props: PropComponent) {
    const [rangeval, setRangeval] = useState('');
    const [allocationProp, setAllocationProp] = useState<any>({});
    const [sum, setSum] = useState(0);
    const isMax = useRef(false);
    const [isMaxClicked, setisMaxClicked] = useState(false);

    

    useEffect(() => {
        if(props.selectedValidators.length > 0) {
          let temp =  props.selectedValidators.reduce((acc: any, curr: any) => {
                    acc[curr.name] = {...curr, value: 0}
                    return acc;
            }, allocationProp);
            setAllocationProp(temp);
        }
    }, [])

    useEffect(() => {
        console.log('Checking use Effect');
    if(isMax.current) {

     calculateMax()
 
    } 
        
    }, [props.stakingAmountValidators])

    useEffect(() => {
        if(isMaxClicked) {

            calculateMax()
            setisMaxClicked(false);
        
           } 
    }, [isMaxClicked])

    const onPrev = (e: any) => {
        props.prev();
    }

    const onNext = (e?: any) => {
       
        let sum = 0;
        props.selectedValidators.forEach((x: any) => {      
        sum = sum + allocationProp[x.name]['value'] ;  console.log(allocationProp[x.name]['value'])})
        console.log(sum);
        if(sum < 100) {
            console.log("Please allocation more atoms");
        } else if(sum > 100) {
            console.log("Please allocation less atoms");
        } else {
            console.log("please proceed");
        }
        setSum(sum);

    }

    const calculateMax = () => {
       //    @ts-expect-error
       let value = +(props.stakingAmountValidators/props.selectedValidators.length);
       console.log('Amount' , props.stakingAmountValidators);
       console.log('Length' , props.selectedValidators.length);
       console.log('Value', value);
       props.selectedValidators.forEach((x: any) => {      
           let newAllocationProp : any = {...allocationProp};
                   //    @ts-expect-error
       newAllocationProp[x.name]['value'] = +(value/props.stakingAmountValidators) * 100;
       setAllocationProp(newAllocationProp) }) ;
       onNext();
    }

    const onMaxClick =  (event: React.MouseEvent<HTMLElement>) => {
        debugger;
        //    @ts-expect-error
        let maxBal = +(props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.base_denom));
        if(props.stakingAmountValidators !== maxBal) {
      //    @ts-expect-error
      props.setStakingAmountValidators(maxBal);
      isMax.current = true;
        } else {
            setisMaxClicked(true);
        }
        
  
    
   
         console.log(isMax.current);
         console.log(maxBal);
     
            //      //    @ts-expect-error
            // let value = +(props.stakingAmountValidators/props.selectedValidators.length);
            // console.log('Amount' , props.stakingAmountValidators);
            // console.log('Length' , props.selectedValidators.length);
            // console.log('Value', value);
            // props.selectedValidators.forEach((x: any) => {      
            //     let newAllocationProp : any = {...allocationProp};
            //             //    @ts-expect-error
            // newAllocationProp[x.name]['value'] = +(value/props.stakingAmountValidators) * 100;
            // setAllocationProp(newAllocationProp) }) ;
            // onNext();
            // // props.selectedValidators.forEach((x: any) => {      
            // //     setSum(sum + allocationProp[x.name]['value'])})
            // //     console.log(sum);
            // // onNext();

    }

    const handleAllocationChange = (e: any) => {
           // setAllocationProp({...allocationProp, [e.target.name] :{ , value: e.target.value}})
           let newAllocationProp : any = {...allocationProp};
           newAllocationProp[e.target.name]['value'] = +(e.target.value);
           setAllocationProp(newAllocationProp);
           onNext();

    }


    const changeAmount = (e: any) => {
                    //    @ts-expect-error
        props.setStakingAmountValidators(e.target.value);
        isMax.current = false;
        setisMaxClicked(false);

    }

    const onClickNext = (e: any) => {
                 //    @ts-expect-error
        props.setAllocationProp(allocationProp)
           //    @ts-expect-error
props.next();
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
    <input type="number" value={props.stakingAmountValidators} onChange={ changeAmount}/>
    <h3> Amount: {props.stakingAmountValidators} </h3>
         <button onClick={onMaxClick}> MAX </button> 
         {props.selectedValidators.length}
        {renderValidators()}
        {sum}
        <button onClick={onPrev}> PREV </button>
        <button onClick={onClickNext}>NEXT</button>
        </div> 
    );
}

function total(total: any) {
    throw new Error('Function not implemented.');
}
