import Icon from '../assets/icons/icon.svg';


export default function ExistingDelegationsPage() {
    return (
        <div className="existing-delegations-pane d-flex flex-column align-items-center ">
        <h1 className="mt-3"> Choose existing delegations </h1>
                <div className="row">
        <div className="col-3">
                <div>  <img src={Icon}/>
                <h5> Validator 1 </h5>
                </div>
              
                <h4> 1234 ATOMS </h4>
                

            </div>
            <div className="col-3">
                <div>  <img src={Icon}/>
                <h5> Validator 1 </h5>
                </div>
              
                <h4> 1234 ATOMS </h4>
                

            </div>
            <div className="col-3">
                <div>  <img src={Icon}/>
                <h5> Validator 1 </h5>
                </div>
              
                <h4> 1234 ATOMS </h4>
                

            </div>
        </div>
        </div>
    );
}