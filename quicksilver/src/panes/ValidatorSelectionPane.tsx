import Icon from '../assets/icons/icon.svg';
import Plus from '../assets/icons/plus.svg';
import './ValidatorSelectionPane.css';
import * as React from 'react';

interface PropComponent {
    prev? : { () : void  };
    next?: { (): void};
    showAllocationPane? : { (): void};
    selectedNetwork: any;
    setSelectedValidators?: Function;
    selectedValidators?: any;
    rows: any;
  }

  export interface Data {
    voting_power: string;
    rank: number;
    commission: string;
    name: string;
    address: string;
    logo: string;
    active? : boolean;
}

export default function ValidatorSelectionPane(props: PropComponent) {  

    const [selectedValidators, setSelectedValidators] = React.useState<Array<Data>>(props.selectedValidators);
    // React.useEffect(() => _loadValsAsync());
   

    const onNext = () => {
        if(selectedValidators) {
            //    @ts-expect-error
        props.setSelectedValidators(selectedValidators);
          // @ts-expect-error
        props.showAllocationPane();
        }

    }
    const addValidator = (e: React.MouseEvent<HTMLElement>, validator: Data) => {
        let position = selectedValidators.findIndex((val) => validator.name === val.name);
        if(position === -1) {
            validator.active = true;
        setSelectedValidators([...selectedValidators, validator]);
        } else {
            let validatorArray = JSON.parse(JSON.stringify(selectedValidators));
            validatorArray.splice(position,1)
            setSelectedValidators(validatorArray);
            validator.active = false;
        }
    }
    return (
        <div className="existing-delegations-pane d-flex flex-column align-items-center">
        <h2 className="mt-3"> Choose validators </h2>
        <input className="mt-2 px-2" type="text"  placeholder="Search validator"/>
          <div className="mt-3 row justify-content-center">
          {props.rows.map((row: any) =>
          <>
                <div onClick={ (e) => addValidator(e,row)} className={`validator-card col-3 m-3 ${row.active ? 'val-active' : ''}`}>
                <div className="d-flex align-items-start"> 
                     <img src={row.logo ? row.logo : Icon}/>
                
               <div className="card-details">
                <h6> {row.name} </h6>
                <h4 className="font-bold">  Reward </h4>
                </div>
                </div>

            </div>
         
          </>
  
)}
              </div>
              
        <div className="mt-5 button-container">
                <button className="prev-button mx-3" onClick={props.prev}> Previous</button>
                <button className="next-button mx-3" onClick={onNext} >Next</button>
            </div>
        </div>
    );
}

//const [selectedValidators, setSelectedValidators] = useState([]);

// // validators.map((v) => {
//     <div onClick={setSelectedValidators(v)}> {v.name}</div> // use spread operator - check for duplicate values
// })