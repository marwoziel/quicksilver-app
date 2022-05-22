import './NetworkSelectionPane.css';

export default function NetworkSelectionPane() {
    return (
        <div className="network-selection-pane d-flex flex-column align-items-center ">
            <div className="wallet-details d-flex flex-column mt-5">
                <h4> My Wallet</h4>
                <h6>cosmos1rtqere</h6>
                <div className="row wallet-content">
                    <div className="col-3">
                       <h5>2122</h5>
                       <p> ATOMS </p>
                    </div>
                    <div className="col-3">
                    <h5>2322</h5>
                       <p> qATOMS </p>
                        </div>
                        <div className="col-3">
                        <h5>16%</h5>
                       <p> APY </p>
                        </div>
                </div>
            </div>
        <div className="text-center">
        <h1 className="mt-4">Choose your network </h1>
        <div className="dropdown show mt-5">
  <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Choose network
  </a>

  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <a className="dropdown-item" href="#">Something else here</a>
  </div>
</div>
<div className="mt-5">
                <button> Previous</button>
                <button> Stake Liquid ATOMS</button>
                <button> Stake existing delegations </button>
            </div>
            </div>
        {/* <button className="connect-wallet-button mt-5"> <img src={Wallet}/> Connect wallet </button>  */}
</div>
    );
}