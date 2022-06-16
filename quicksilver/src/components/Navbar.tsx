
import Logo from '../assets/quicksilver-logo.png';
import './Navbar.css';
import Wallet from '../assets/icons/wallet.svg';
import * as React from 'react';
import ConnectWalletModal from './ConnectWalletModal';
import Backdrop from './Backdrop';
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";

interface PropComponent {
  handleClickOpen? : { (): void};
  balances?: any;
  modalIsOpen?: boolean;
  setModalIsOpen?: Function;
  openModalHandler? : Function;
  closeModalHandler?: Function;
  isWalletConnected?: boolean;
}


export default function Navbar(props: PropComponent) {

  const location = useLocation();
  const openModalHandler = (event: React.MouseEvent<HTMLElement>) => {
       // @ts-expect-error
   props.openModalHandler();
  }
  
        return (
        <nav className="navbar navbar-expand-lg">
               <Link to="/">    <img className="logo" alt="Quicksilver Logo" src={Logo}/></Link> 



  <div className="collapse navbar-collapse justify-content-around" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    
      <li className="nav-item mx-4">
      <Link className={`${location.pathname === '/stake'  ? 'active-link' : ''}`} to="/stake">STAKE</Link> 
      </li>
      <li className="nav-item mx-4">
        {/* <a className="nav-link" href="#">POOL</a> */}
               <Link  className={`${location.pathname === '/pools'  ? 'active-link' : ''}`} to="/pools">POOL</Link> 
      </li>
      <li className="nav-item mx-4">
      <Link  className={`${location.pathname === '/claims'  ? 'active-link' : ''}`} to="/claims">AIRDROP</Link> 
      </li>
      <li className="nav-item mx-4">
      <Link  className={`${location.pathname === '/gov'  ? 'active-link' : ''}`} to="/gov">GOVERNANCE</Link> 
      </li>

    </ul>
            {props.isWalletConnected && <button className="btn connect-wallet px-3 my-2 my-sm-0"> <img alt="Wallet icon" src={Wallet}/> {(props.balances.get('rhapsody-5')?.get('uqck')) ? `${props.balances.get('rhapsody-5')?.get('uqck')/1000000} QCK`  : ''
      }</button>}
      {!props.isWalletConnected && <button onClick={openModalHandler} className="btn connect-wallet px-3 my-2 my-sm-0"> Connect Wallet
      </button>}
      {props.modalIsOpen && (
        <ConnectWalletModal handleClickOpen={props.handleClickOpen}/>
      )}
      {props.modalIsOpen && <Backdrop onCancel={props.closeModalHandler} />}
 
  </div>
</nav>
        )
}