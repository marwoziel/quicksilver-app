import './StakePage.css';
import ConnectWalletPane from '../panes/ConnectWalletPane';
import NetworkSelectionPane from '../panes/NetworkSelectionPane';


export default function StakePage() {
    return (
        <div className="row">
            <div className="stepper col-2">
                STEPPER
            </div>
            <div className="content col-10">
                   <NetworkSelectionPane/>
                </div>
        </div>
    )
}