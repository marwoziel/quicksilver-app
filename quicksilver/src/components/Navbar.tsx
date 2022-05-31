
import Logo from '../assets/quicksilver-logo.png';
import './Navbar.css';
import Wallet from '../assets/icons/wallet.svg';
import * as React from 'react';
import ConnectWalletModal from './ConnectWalletModal';
import Backdrop from './Backdrop';
import { Link } from "react-router-dom";

interface PropComponent {
  handleClickOpen? : { (): void};
  balances?: any;
  modalIsOpen?: boolean;
  setModalIsOpen?: Function;
  openModalHandler? : Function;
  closeModalHandler?: Function;
}


export default function Navbar(props: PropComponent) {
  
  const openModalHandler = (event: React.MouseEvent<HTMLElement>) => {
       // @ts-expect-error
   props.openModalHandler();
  }
  
        return (
        <nav className="navbar navbar-expand-lg">
  {/* <a className="navbar-brand ml-5" href="#">
                <img className="logo" src={Logo}/>
            </a> */}
               <Link to="/">    <img className="logo" src={Logo}/></Link> 



  <div className="collapse navbar-collapse justify-content-around" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    
      <li className="nav-item mx-3">
      <Link className="active-link" to="/stake">STAKE</Link> 
      </li>
      <li className="nav-item mx-3">
        {/* <a className="nav-link" href="#">POOL</a> */}
               <Link to="/pools">POOL</Link> 
      </li>
      <li className="nav-item mx-3">
      <Link to="/claims">AIRDROP</Link> 
      </li>
      <li className="nav-item mx-3">
      <Link to="/gov">GOVERNANCE</Link> 
      </li>

    </ul>

      <button onClick={openModalHandler} className="btn connect-wallet px-3 my-2 my-sm-0"> <img src={Wallet}/> {(props.balances.get('quicktest-3')?.get('uqck')) ? `${props.balances.get('quicktest-3')?.get('uqck')} UQCK`  : 'Connect Wallet'
      }</button>
      {props.modalIsOpen && (
        <ConnectWalletModal handleClickOpen={props.handleClickOpen}/>
      )}
      {props.modalIsOpen && <Backdrop onCancel={props.closeModalHandler} />}
 
  </div>
</nav>
        )
}