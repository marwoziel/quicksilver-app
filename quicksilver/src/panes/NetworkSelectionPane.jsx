import './NetworkSelectionPane.css';

export default function NetworkSelectionPane({stakeExistingDelegations, prev, next, stakeAllocations }) {

    const stakeLiquidAtoms = () => {
        next();
        stakeExistingDelegations();
    }

    const stakeNewAllocations = () => {
        next();
        stakeAllocations();
    }
    return (
        <div className="network-selection-pane d-flex flex-column align-items-center ">
            <div className="wallet-details d-flex flex-column mt-5">
                <h4> My Wallet</h4>
                <h6>cosmos1rtqere</h6>
                <div className="row wallet-content mt-4">
                    <div className="col-3 text-center">
                       <h5 className="font-bold">2122</h5>
                       <p> ATOMS </p>
                    </div>
                    <div className="col-3 text-center">
                    <h5 className="font-bold">2322</h5>
                       <p> qATOMS </p>
                        </div>
                        <div className="col-3 text-center">
                        <h5 className="font-bold">16%</h5>
                       <p> APY </p>
                        </div>
                </div>
            </div>
        <div className="text-center">
        <h2 className="mt-4">Choose your network </h2>
        <div className="dropdown show mt-5">
  <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Choose network
  </a>

  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a className="dropdown-item" href="#">Network 1</a>
    <a className="dropdown-item" href="#">Network 2</a>
    <a className="dropdown-item" href="#">Network 3</a>
    <a className="dropdown-item" href="#">Network 4</a>
    <a className="dropdown-item" href="#">Network 5</a>
    <a className="dropdown-item" href="#">Network 6</a>
  </div>
</div>
<div className="mt-5 button-container">
                <button className="prev-button mx-3" onClick={prev}> Previous</button>
                <button className="stake-liquid-atoms-button mx-3" onClick={stakeNewAllocations}> Stake Liquid ATOMS</button>
                <button className="stake-existing-delegations-button mx-3" onClick={stakeLiquidAtoms}> Stake existing delegations </button>
            </div>
            </div>
</div>
    );
}