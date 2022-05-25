import { ChainInfo } from "@keplr-wallet/types";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { SigningStargateClient,  } from "@cosmjs/stargate"
import { AnyNsRecord } from "dns";

const ChainInfos: ChainInfo[] = [
    {
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
  },
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
            }, (reason: any) => { 
                keplr.experimentalSuggestChain(val).then(async () => { 
                    let signer = keplr.getOfflineSignerOnlyAmino(val.chainId); 
                    let offlineSigner = await SigningStargateClient.connectWithSigner(val.rpc, signer)
                    fn(val.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + val.chainId) 
                }) 
            })
        })
    } 
}
  