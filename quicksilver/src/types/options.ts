import { AminoConverter , AminoTypes, AminoConverters, defaultRegistryTypes, SigningStargateClientOptions, createAuthzAminoConverters, createBankAminoConverters , createDistributionAminoConverters, createGovAminoConverters, createStakingAminoConverters, createIbcAminoConverters, createFreegrantAminoConverters, } from "@cosmjs/stargate";
import { AminoMsg, Coin } from "@cosmjs/amino";
import { GeneratedType, Registry} from "@cosmjs/proto-signing";



export function createLiquidStakingTypes(): Record<string, AminoConverter | "not_supported_by_chain"> {
    return {
      "/cosmos.staking.v1beta1.MsgTokenizeShares": {
        aminoType: "cosmos-sdk/MsgTokenizeShares",
        toAmino: ({
          delegatorAddress,
          validatorAddress,
          amount,
          tokenizedShareOwner,
        }: MsgTokenizeShares): AminoMsgTokenizeShares["value"] => {
            // assertDefinedAndNotNull(amount, "missing amount");
          return {
            delegator_address: delegatorAddress,
            validator_address: validatorAddress,
            amount: amount,
            tokenized_share_owner: tokenizedShareOwner,
          };
        },
        fromAmino: ({
          delegator_address,
          validator_address,
          amount,
          tokenized_share_owner,
        }: AminoMsgTokenizeShares["value"]): MsgTokenizeShares => ({
          delegatorAddress: delegator_address,
          validatorAddress: validator_address,
          amount: amount,
          tokenizedShareOwner: tokenized_share_owner,
        }),
      }
    }
  }
  
  export interface AminoMsgTokenizeShares extends AminoMsg {
    readonly type: "cosmos-sdk/MsgTokenizeShares";
    readonly value: {
      /** Bech32 encoded delegator address */
      readonly delegator_address: string;
      /** Bech32 encoded validator address */
      readonly validator_address: string;
      readonly amount: Coin | undefined;
      readonly tokenized_share_owner: string;
    };
  }
  
  export interface MsgTokenizeShares {
    delegatorAddress: string;
    validatorAddress: string;
    amount?: Coin;
    tokenizedShareOwner: string;
  }
  
  export const customTypes: ReadonlyArray<[string, GeneratedType]> = [
   
    ["/cosmos.staking.v1beta1.MsgTokenizeShares", MsgTokenizeShares],
    ...defaultRegistryTypes
  ];
  
  function createCustomTypes(prefix: string): AminoConverters {
    return {
      ...createAuthzAminoConverters(),
      ...createBankAminoConverters(),
      ...createDistributionAminoConverters(),
      ...createGovAminoConverters(),
      ...createStakingAminoConverters(prefix),
      ...createIbcAminoConverters(),
      ...createFreegrantAminoConverters(),
      ...createLiquidStakingTypes()
    };
  }
  

  export const options = { registry : new Registry(defaultRegistryTypes), aminoTypes : new AminoTypes(createCustomTypes("cosmos")) }