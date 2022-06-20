import React , {useEffect, useState, useRef} from 'react';
import './AllocationPane.css';

interface PropComponent {
    selectedValidators? : any;
    balances: Map<string, Map<string, number>>;
    selectedNetwork? : any;
    prev: Function;
    stakingAmountValidators? : number;
    setStakingAmountValidators?: Function;
    next?: { (): void};
    setAllocationProp?: Function;
    networkAddress: string;
    setShowSummaryValidators: Function;
}

export default function AllocationPane(props: PropComponent) {
    const [rangeval, setRangeval] = useState('');
    const [allocationProp, setAllocationProp] = useState<any>({});
    const [sum, setSum] = useState(0);
    const isMax = useRef(false);
    const [isMaxClicked, setisMaxClicked] = useState(false);
    const [networkBalance, setNetworkBalance] = React.useState(0);
    const [networkQBalance, setNetworkQBalance] = React.useState(0);

    

    useEffect(() => {
        if(props.selectedValidators.length > 0) {
          let temp =  props.selectedValidators.reduce((acc: any, curr: any) => {
                    acc[curr.name] = {...curr, value: 0}
                    return acc;
            }, allocationProp);
            setAllocationProp(temp);
        }
                                 // @ts-expect-error
                                 setNetworkBalance(+(props.balances.get(props.selectedNetwork.chain_id).get(props?.selectedNetwork.base_denom)));
                                 // @ts-expect-error
                           setNetworkQBalance(props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.local_denom) ? +(props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.local_denom)): 0)
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
        let maxBal = +((props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.base_denom)/1000000) - 0.3);
        if(props.stakingAmountValidators !== maxBal) {
      //    @ts-expect-error
      props.setStakingAmountValidators(maxBal);
      isMax.current = true;
        } else {
            setisMaxClicked(true);
        }
        
  
    
   
         console.log(isMax.current);
         console.log(maxBal);
     


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
        props.setStakingAmountValidators(parseInt(e.target.value));
        isMax.current = false;
        setisMaxClicked(false);

    }

    const onClickNext = (e: any) => {
                 //    @ts-expect-error
        props.setAllocationProp(allocationProp)
           //    @ts-expect-error
props.next();
props.setShowSummaryValidators(true);
    }

    const renderValidators = () => {
        return ( props.selectedValidators.map((val: any) => <>
        <div className="d-flex mt-3">
            <h5 className=" mx-2">{val.name}</h5>
            <input style={{accentColor: '#D35100'}} className="mx-2" onChange={handleAllocationChange} type="range" value={Object.keys(allocationProp).length ? allocationProp[val.name]['value'] : 0 } name={val.name} min="0" max="100"   />
            <input className="mx-2" onChange={handleAllocationChange} value={Object.keys(allocationProp).length ? allocationProp[val.name]['value']: '' } name={val.name}  type="number"></input>
           </div>
            </>
                
            )
        )
    }

    return (
    <div className="allocation-pane d-flex flex-column align-items-center">
 {props.networkAddress && props.selectedNetwork !== "Select a network" && props.balances && <div className="wallet-details d-flex flex-column mt-3">
                <h4> My Wallet</h4>
                <h6>{props.networkAddress}</h6>
                <div className="row wallet-content mt-4">
                <div className="col-3 text-center">
                       <h5 className="font-bold">{networkBalance/1000000}</h5>
                       <p> {props.selectedNetwork.base_denom.substring(1)} </p>
                    </div>
                    <div className="col-3 text-center">
                    <h5 className="font-bold">{networkQBalance/1000000}</h5>
                       <p> {props.selectedNetwork.local_denom.substring(1)} </p> 
                        </div>
                  
                </div>
            </div> }
            <div className="staking-pane d-flex flex-column mt-4">
                <h4>Stake</h4> 

                <div className="d-flex mt-3 align-items-center">
                    <p className="m-0 mx-3"> Number of atoms you want to stake</p>
                    <input className="mx-3" type="number" value={props.stakingAmountValidators} onChange={ changeAmount}/>
                    <button className="mx-3 p-1 max-button" onClick={onMaxClick}> MAX </button> 
                </div>
                {renderValidators()}
            </div>

            { sum > 100 && <p> You have allocated {sum} % of the available atoms. Please move the sliders around until you hit 100% and then you can proceed ahead. </p>}
            { sum < 99.5 && <p> Please allocate the remaining {100 - sum} % of atoms to continue </p>}
        <div className="button-containers">
            <button className="prev-button mx-3" onClick={onPrev}> PREV </button>
        <button disabled={sum < 99.9  || sum  > 100 ?  true: false}  className="next-button mx-3" onClick={onClickNext}>NEXT</button> 
</div>
        </div> 
    );
}

function total(total: any) {
    throw new Error('Function not implemented.');
}
