import Icon from '../assets/icons/icon.svg';
import Plus from '../assets/icons/plus.svg';
import './ValidatorSelectionPane.css';
import * as React from 'react';

interface PropComponent {
    prev? : { () : void  };
    next?: { (): void};
    showAllocationPane? : { (): void}
  }

  

export default function ValidatorSelectionPane(props: PropComponent) {
    return (
        <div className="existing-delegations-pane d-flex flex-column align-items-center">
        <h2 className="mt-3"> Choose validators </h2>
        <input className="mt-2 px-2" type="text"  placeholder="Search validator"/>
                <div className="mt-3 row justify-content-center">
                <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 1 </h5>
                <h4 className="font-bold"> 2.6% </h4>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 2 </h5>
                <h4 className="font-bold"> 3.4% </h4>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 3 </h5>
                <h4 className="font-bold"> 1.5% </h4>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 4 </h5>
                <h4 className="font-bold"> 2.3% </h4>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 5 </h5>
                <h4 className="font-bold"> 3.4% </h4>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 6 </h5>
                <h4 className="font-bold"> 1.12% </h4>
                </div>
                </div>

            </div>
            
        </div>
        <div className="mt-5 button-container">
                <button className="prev-button mx-3" onClick={props.prev}> Previous</button>
                <button className="next-button mx-3" onClick={props.showAllocationPane} >Next</button>
            </div>
        </div>
    );
}

//const [selectedValidators, setSelectedValidators] = useState([]);

// // validators.map((v) => {
//     <div onClick={setSelectedValidators(v)}> {v.name}</div> // use spread operator - check for duplicate values
// })