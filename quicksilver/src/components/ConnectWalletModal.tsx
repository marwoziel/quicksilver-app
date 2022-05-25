
import "./ConnectWalletModal.css";

interface PropComponent {
    handleClickOpen? : { (): void}
  }
  

export default function ConnectWalletModal(props: PropComponent) {
    return (
        <>
    <div className="connect-wallet-modal">Connect with Keplr</div> 
    <button onClick={props.handleClickOpen}>Connect Kelplr</button> 
    </>
    );
    
}
