import { Link } from "react-router-dom";
import './LandingPage.css';
import Logo from '../assets/quicksilver-logo.png';

export default function LandingPage() {
    return    (
        <div className="landing-page">
            <div className="text-center w-80 d-flex align-items-center justify-content-center flex-column">
             <img className="logo" src={Logo}/>
             <h2 className="my-3"> QUICKSILVER</h2>
             <p className="mb-3">ThE COSMOS LIQUID STAKING ZONE</p> 
        <Link className="px-5 py-2  mt-4" to="/stake">Get Started</Link> 
        </div>
        </div>
    
    )
}