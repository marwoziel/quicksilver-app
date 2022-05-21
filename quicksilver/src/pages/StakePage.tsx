import './StakePage.css';
import ConnectWalletPane from '../panes/ConnectWalletPane';


export default function StakePage() {
    return (
        <div className="row">
            <div className="stepper col-2">
                STEPPER
            </div>
            <div className="content col-10">
                   <ConnectWalletPane/>
                </div>
        </div>
    )
}