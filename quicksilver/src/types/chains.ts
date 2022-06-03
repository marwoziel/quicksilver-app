import { ChainInfo } from "@keplr-wallet/types";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { SigningStargateClient,  } from "@cosmjs/stargate"
import {options} from './options';


const QuickSilverChainInfo : ChainInfo = {
    chainId: "quicktest-3",
    chainName: "Quicksilver Test",
    rpc: "https://rpc.quicktest-3.quicksilver.zone",
    rest: "https://lcd.quicktest-3.quicksilver.zone",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "quick",
        bech32PrefixAccPub: "quickpub",
        bech32PrefixValAddr: "quickvaloper",
        bech32PrefixValPub: "quickvaloperpub",
        bech32PrefixConsAddr: "quickvalcons",
        bech32PrefixConsPub: "quickvalconspub",
    },
    currencies: [
        {
            coinDenom: "QCK",
            coinMinimalDenom: "uqck",
            coinDecimals: 6,
            coinGeckoId: "quicksilver",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "QCK",
            coinMinimalDenom: "uqck",
            coinDecimals: 6,
            coinGeckoId: "quicksilver",
        },
    ],
    stakeCurrency: {
        coinDenom: "QCK",
        coinMinimalDenom: "uqck",
        coinDecimals: 6,
        coinGeckoId: "quicksilver",
    },
    coinType: 118,
    gasPriceStep: {
        low: 0.00,
        average: 0.015,
        high: 0.03,
},
}

let client ;

const ChainInfos: ChainInfo[] = [
    QuickSilverChainInfo,
{
    chainId: "qscosmos-1",
    chainName: "Cosmos Test",
    rpc: "https://rpc.qscosmos-1.quicksilver.zone",
    rest: "https://lcd.qscosmos-1.quicksilver.zone",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmospub",
        bech32PrefixValAddr: "cosmosvaloper",
        bech32PrefixValPub: "cosmosvaloperpub",
        bech32PrefixConsAddr: "cosmosvalcons",
        bech32PrefixConsPub: "cosmosvalconspub",
    },
    currencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
    ],
    stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
    },
    coinType: 118,
    gasPriceStep: {
        low: 0.00,
        average: 0.015,
        high: 0.03,
    },
  }
]

export const initKeplr = async (fn: Function):Promise<void> => { 
    const keplr = await getKeplrFromWindow();
    if (keplr) {
        ChainInfos.forEach((val) => { 
            keplr
            .enable(val.chainId)
            .then(async () => { 
                let signer = keplr.getOfflineSignerOnlyAmino(val.chainId); 
                let offlineSigner = await SigningStargateClient.connectWithSigner(val.rpc, signer)
                fn(val.chainId, offlineSigner)
                console.log("Enabled for chainid " + val.chainId)
            }, (reason) => { 
                keplr.experimentalSuggestChain(val).then(async () => { 
                    let signer = keplr.getOfflineSignerOnlyAmino(val.chainId); 
                    let offlineSigner = await SigningStargateClient.connectWithSigner(val.rpc, signer);
                    fn(val.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + val.chainId) 
                }) 
            })
        })
    } 
}

export const initKeplrWithQuickSilver = async (fn: Function):Promise<void> => { 
    const keplr = await getKeplrFromWindow();
    if (keplr) {

            keplr
            .enable(QuickSilverChainInfo.chainId)
            .then(async () => { 
                let signer = keplr.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                let offlineSigner = await SigningStargateClient.connectWithSigner(QuickSilverChainInfo.rpc, signer)
                fn(QuickSilverChainInfo.chainId, offlineSigner)
                console.log("Enabled for chainid " + QuickSilverChainInfo.chainId)
            }, (reason: any) => { 
                keplr.experimentalSuggestChain(QuickSilverChainInfo).then(async () => { 
                    let signer = keplr.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                    let offlineSigner = await SigningStargateClient.connectWithSigner(QuickSilverChainInfo.rpc, signer)
                    fn(QuickSilverChainInfo.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + QuickSilverChainInfo.chainId) 
                }) 
            })
        }
}

export const initKeplrWithNetwork = async (fn: Function, network?: string):Promise<void> => { 
    const keplr = await getKeplrFromWindow();
    console.log(network);
    if (keplr && network) {
           // @ts-expect-error
        const chain : ChainInfo  = ChainInfos.find( function(el) { return el.chainId === network})
            keplr
            .enable(chain?.chainId)
            .then(async () => { 
                let signer = keplr.getOfflineSignerOnlyAmino(chain?.chainId); 
                let offlineSigner = await SigningStargateClient.connectWithSigner(chain?.rpc, signer, options)
                fn(chain?.chainId, offlineSigner)
                console.log("Enabled for chainid " + chain?.chainId)
                console.log('Offline Signer 1', offlineSigner);
         
            }, (reason: any) => { 
                keplr.experimentalSuggestChain(chain).then(async () => { 
                    let signer = keplr.getOfflineSignerOnlyAmino(chain?.chainId); 
                    let offlineSigner = await SigningStargateClient.connectWithSigner(chain?.rpc, signer, options)
                    fn(chain?.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + chain?.chainId) 
                    console.log('Offline Signer 2', offlineSigner);
                }) 
            })
        }
}