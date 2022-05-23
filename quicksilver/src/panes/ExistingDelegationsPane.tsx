import Icon from '../assets/icons/icon.svg';
import Plus from '../assets/icons/plus.svg';
import './ExistingDelegationsPane.css';

export default function ExistingDelegationsPage() {
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
                <button className="prev-button mx-3"> Previous</button>
                <button className="next-button mx-3" >Next</button>
            </div>
        </div>
    );
}