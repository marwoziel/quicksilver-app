import './ConnectWalletPane.css';
import Wallet from '../assets/icons/wallet.svg';

export default function ConnectWalletPane({next,prev}) {
    return (
        <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                <h4 className="sub-heading"> Hey there! </h4>
                <h1 className="mt-3"> Connect your wallet to get started! </h1>
                <button onClick={next} className="connect-wallet-button mt-5"> <img src={Wallet}/> Connect wallet </button> 

    
        </div>
    );
} 