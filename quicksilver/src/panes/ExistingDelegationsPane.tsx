import Logo from '../assets/icons/logo.svg';


export default function ExistingDelegationsPage() {
    return (
        <div className="existing-delegations-pane d-flex flex-column align-items-center ">
        <h1 className="mt-3"> Choose existing delegations </h1>
        <input type="text"/>
        <div className="row">
            <div className="col-3">
                <img src={Logo}/>
                <h3> Validator 1 </h3>
                <h2> 1234 ATOMS </h2>
                

            </div>
        </div>
        </div>
    );
}