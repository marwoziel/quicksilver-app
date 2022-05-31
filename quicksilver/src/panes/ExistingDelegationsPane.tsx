import React, { useEffect, useState } from 'react';
import Icon from '../assets/icons/icon.svg';
import Plus from '../assets/icons/plus.svg';
import './ExistingDelegationsPane.css';

interface PropComponent {
    prev? : { () : void  };
    next?: { (): void};
    selectedNetwork : any;
    networkAddress: string;
    selectedValidators?: any;
    selectedExistingDelegations?: any;
    setStateExistingDelegations? : Function;

      
  }
const MyQuery =  `query MyQuery($address: String!) {
    action_delegation(address: $address) {
      delegations
    }
  }`;

export default function ExistingDelegationsPage(props: PropComponent) {
  const [existingDelegations, setExistingDelegations] = useState([]);
  const [selectedLocalExistingDelegations, setSelectedLocalExistingDelegations] = useState<Array<any>>(props.selectedExistingDelegations);
   
      useEffect(() => {
        if(props.selectedNetwork !== "Select a network") {
       _loadValsAsync()
        }
      }, []);


      const loadValData = async (): Promise<any> => {
        const result = await fetch(
            `https://data.${props.selectedNetwork.chain_id}.quicksilver.zone/v1/graphql`,
            {
              method: "POST",
              body: JSON.stringify({
                query: MyQuery,
               // variables: { address: props.networkAddress },
                variables: {address: "cosmos148tpyyywny0x2qj95ywqku766uvmr4m6u2awsdwnarfhngd9rpssmrg76p"}
              })
            }
          );

          // console.log(result);
          return await result.json();

    
    }
      const _loadValsAsync = () => {
            loadValData().then(
             (response) => setExistingDelegations(response.data.action_delegation.delegations)
            );

            
        }
    
        const addDelegation = (e: React.MouseEvent<HTMLElement>, delegation: any) => {
          let position = selectedLocalExistingDelegations.findIndex((val: any) => delegation.validator_address === val.validator_address );
          if(position === -1) {
              delegation.active = true;
          setSelectedLocalExistingDelegations([...selectedLocalExistingDelegations, delegation]);
          } else {
              let validatorArray = JSON.parse(JSON.stringify(selectedLocalExistingDelegations));
              validatorArray.splice(position,1)
              setSelectedLocalExistingDelegations(validatorArray);
              delegation.active = false;
          }
      }
    

      const onNext = () => {
      //   existingDelegations.forEach((x: any) => {      
      //     let newProp : any = {...x};
      // newProp[x.name] = {props.selectedValidators.find((y: any) => y.address === x.validator_address )?.name
      // })
      // // setAllocationProp(newAllocationProp) }) 
       
          selectedLocalExistingDelegations.forEach((x) => {
            x.name = props.selectedValidators.find((y: any) => y.address === x.validator_address )?.name
          })
             //   @ts-expect-error
       props?.setStateExistingDelegations(selectedLocalExistingDelegations);
        // @ts-expect-error
         props.next();
      
    }
  
      console.log(existingDelegations);
    return (
        <div className="existing-delegations-pane d-flex flex-column align-items-center ">
        <h2 className="mt-3"> Choose existing delegations </h2>
               {existingDelegations.length > 0 && <div className="mt-3 row justify-content-center">
                {existingDelegations.map((row: any) =>
          <>   
          <div onClick={ (e) => addDelegation(e,row)} className={`validator-card col-3 m-3 ${row.active ? 'val-active' : ''}`}>
               <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> {props.selectedValidators.find((x: any) => x.address === row.validator_address )?.name }</h5>
                <h4 className="font-bold"> {row.coins[0].amount} {row.coins[0].denom} </h4>
                </div>
              </div>
                </div>
          </>
  
)}
                {/* <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 1 </h5>
                <h4 className="font-bold"> 1234 ATOMS </h4>
                <p className="add-button"> <img src={Plus}/> ADD </p>
                </div>
                </div>

            </div> */}
                        
        </div>}
        <div className="mt-5 button-container">
                <button onClick={props.prev} className="prev-button mx-3"> Previous</button>
                <button onClick={onNext} className="next-button mx-3" >Next</button>
            </div>
        </div>
    );
}