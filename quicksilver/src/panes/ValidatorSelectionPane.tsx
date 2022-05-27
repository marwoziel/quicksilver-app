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
  }

  export interface Data {
    voting_power: string;
    rank: number;
    commission: string;
    name: string;
    address: string;
    logo: string;
}
  
const valListQuery = `
  query ValidatorList {
    validator_status(where: {jailed: {}}) {
      validator {
        validator_voting_powers {
          voting_power
        }
        validator_info {
          operator_address
          validator {
            validator_commissions {
              commission
            }
            validator_descriptions {
              avatar_url
              details
              identity
              moniker
              security_contact
              website
            }
          }
        }
      }
      jailed
    }
  }
`;
export default function ValidatorSelectionPane(props: PropComponent) {  
    const [rows, setRows] = React.useState<Array<Data>>([]);
    const [selectedValidators, setSelectedValidators] = React.useState<Array<Data>>([]);
    React.useEffect(() => _loadValsAsync());
    const loadValData = async (): Promise<ValResponse> => {
        // fetch me from api
        //return [{rank: 1, name: 'Validator 1', voting_power: '15,394,433 OSMO', commission: '5%' },{rank: 2, name: 'Validator 2', voting_power: '15,394,433 OSMO', commission: '5%' }]

        // TODO - make chainId dynamic
        const result = await fetch(
            `https://data.${props.selectedNetwork.chain_id}.quicksilver.zone/v1/graphql`,
            {
              method: "POST",
              body: JSON.stringify({
                query: valListQuery,
                variables: {},
                operationName: "ValidatorList"
              })
            }
          );
          return await result.json();

    }

    type ValResponse = {
        data: {
            validator_status: Array<Validator>
        }
    }

    type VotingPowers = {
        voting_power: number
    }

    type Commissions = {
        commission: number
    }

    type Descriptions = {
        avatar_url: string | null,
        details: string | null,
        identity: string | null,
        moniker: string,
        security_contact: string | null,
        website: string | null
    }

    type Validator = {
        validator: {
            validator_voting_powers: Array<VotingPowers>
            validator_info: {
                operator_address: string,
                validator: {
                    validator_commissions: Array<Commissions>
                    validator_descriptions: Array<Descriptions>
                }
            }
        },
        jailed: Boolean

    }

    const _loadValsAsync = () => {
        if (rows.length === 0) {
            loadValData().then(
                externalData => {
                   let vals: Array<Data> = externalData.data.validator_status
                   .filter((line: Validator) => { return !line.jailed || line.validator.validator_info.validator.validator_commissions[0].commission > 0.8})     // remove jailed validators
                   .map((line: Validator, index: number): Data => {          // map to Data objects
                    let moniker = "Unknown"
                    let commission = "Unknown"
                    if (line.validator.validator_info.validator.validator_descriptions.length > 0) {
                        moniker = line.validator.validator_info.validator.validator_descriptions[0].moniker
                    }
                    if (line.validator.validator_info.validator.validator_commissions.length > 0) {
                        commission = (line.validator.validator_info.validator.validator_commissions[0].commission * 100) + "%"
                    }

                    return {
                        rank: 0, 
                        voting_power: "" + line.validator.validator_voting_powers[0].voting_power,
                        name: moniker,
                        commission: commission,
                        address : line.validator.validator_info.operator_address,
                        logo: "",
                      }});
                    setRows(vals);
                }
            );
        }
    }


    const onNext = () => {
        if(selectedValidators) {
               // @ts-expect-error
        props.setSelectedValidators(selectedValidators);
          // @ts-expect-error
        props.showAllocationPane();
        }

    }
    const addValidator = (e: React.MouseEvent<HTMLElement>, validator: Data) => {
        let position = selectedValidators.findIndex((val) => validator.name === val.name);
        if(position === -1) {
        setSelectedValidators([...selectedValidators, validator]);
        } else {
            let validatorArray = JSON.parse(JSON.stringify(selectedValidators));
            validatorArray.splice(position,1)
            setSelectedValidators(validatorArray);
        }
    }
    return (
        <div className="existing-delegations-pane d-flex flex-column align-items-center">
        <h2 className="mt-3"> Choose validators </h2>
        <input className="mt-2 px-2" type="text"  placeholder="Search validator"/>
          <div className="mt-3 row justify-content-center">
          {rows.map((row) =>
          <>
                <div onClick={ (e) => addValidator(e,row)} className="validator-card col-3 m-3">
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
                {/* <div className="mt-3 row justify-content-center">
                <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 1 </h5>
                <h4 className="font-bold"> 2.6% </h4>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 2 </h5>
                <h4 className="font-bold"> 3.4% </h4>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 3 </h5>
                <h4 className="font-bold"> 1.5% </h4>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 4 </h5>
                <h4 className="font-bold"> 2.3% </h4>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 5 </h5>
                <h4 className="font-bold"> 3.4% </h4>
                </div>
                </div>

            </div>
            <div className="validator-card col-3 m-3">
                <div className="d-flex align-items-start"> 
                     <img src={Icon}/>
                
               <div className="card-details">
                <h5> Validator 6 </h5>
                <h4 className="font-bold"> 1.12% </h4>
                </div>
                </div>

            </div>
            
        </div> */}
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