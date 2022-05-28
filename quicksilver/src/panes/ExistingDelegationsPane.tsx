import React, { useEffect } from 'react';
import Icon from '../assets/icons/icon.svg';
import Plus from '../assets/icons/plus.svg';
import './ExistingDelegationsPane.css';

interface PropComponent {
    prev? : { () : void  };
    next?: { (): void};
    selectedNetwork : any;
    networkAddress: string;
      
  }
const MyQuery =  `query MyQuery($address: String!) {
    action_delegation(address: $address) {
      delegations
    }
  }`;

export default function ExistingDelegationsPage(props: PropComponent) {
   
      useEffect(() => {
        if(props.selectedNetwork !== "Select a network") {
       _loadValsAsync()
        }
      });


      const loadValData = async (): Promise<any> => {
        const result = await fetch(
            `https://data.${props.selectedNetwork.chain_id}.quicksilver.zone/v1/graphql`,
            {
              method: "POST",
              body: JSON.stringify({
                query: MyQuery,
                variables: { address: props.networkAddress },
                //variables: {address: "cosmos148tpyyywny0x2qj95ywqku766uvmr4m6u2awsdwnarfhngd9rpssmrg76p"}
              })
            }
          );
    
    }
      const _loadValsAsync = () => {
            loadValData().then(
             (response) => response
            );
        }
    

    
  

    return (
        <div className="existing-delegations-pane d-flex flex-column align-items-center ">
        <h2 className="mt-3"> Choose existing delegations </h2>
                <div className="mt-3 row justify-content-center">
                <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 1 </h5>
                <h4 className="font-bold"> 1234 ATOMS </h4>
                <p className="add-button"> <img src={Plus}/> ADD </p>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 2 </h5>
                <h4 className="font-bold"> 1234 ATOMS </h4>
                <p className="add-button"> <img src={Plus}/> ADD </p>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 3 </h5>
                <h4 className="font-bold"> 1234 ATOMS </h4>
                <p className="add-button"> <img src={Plus}/> ADD </p>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 4 </h5>
                <h4 className="font-bold"> 1234 ATOMS </h4>
                <p className="add-button"> <img src={Plus}/> ADD </p>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 5 </h5>
                <h4 className="font-bold"> 1234 ATOMS </h4>
                <p className="add-button"> <img src={Plus}/> ADD </p>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 6 </h5>
                <h4 className="font-bold"> 1234 ATOMS </h4>
                <p className="add-button"> <img src={Plus}/> ADD </p>
                </div>
                </div>

            </div>
            
        </div>
        <div className="mt-5 button-container">
                <button onClick={props.prev} className="prev-button mx-3"> Previous</button>
                <button onClick={props.next} className="next-button mx-3" >Next</button>
            </div>
        </div>
    );
}