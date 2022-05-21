
import Logo from '../assets/quicksilver-logo.png';
import './Navbar.css';
import Wallet from '../assets/icons/wallet.svg';


export default function Navbar() {
        return (
        <nav className="navbar navbar-expand-lg">
  <a className="navbar-brand ml-5" href="#">
                <img className="logo" src={Logo}/>
            </a>


  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    
      <li className="nav-item">
        <a className="nav-link" href="#">STAKE</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">POOL</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">AIRDROP</a>
      </li>

    </ul>
    <form className="form-inline my-2 my-lg-0">
      <button className="btn connect-wallet px-3 my-2 my-sm-0"> <img src={Wallet}/>  Connect Wallet</button>
    </form>
  </div>
</nav>
        )
}