import React, { createContext, useState, useContext } from "react";
import { ethers } from "ethers";
import { safeAccess } from "@/popup/utils"

const AccountContext = createContext();


export function useAccount() {
    return useContext(AccountContext);
}

const stateInit = {
    network: "homestead",
    provider: new ethers.providers.InfuraProvider("mainnet", "fda03bb99a764dca90b2400ecff9ef5a"),
    password: '',
    transaction: null,
    isLogin: false,
    wallet: null,
    txGlobal: {},                 //用来记录签名时的交易
    tokenSelectedIndex: 0,        //当前选中的20代币索引，0代表 ETH
    nftTokenSelectedIndex: 0,   //当前选中的721代币索引
    ethPrice: 0
};

export default function AccountProvider({ children }) {
    const [state, setState] = useState(stateInit)

    const update = payload => {
        console.log(state, payload);
        setState({ ...state, ...payload })
    }


    return (
        <AccountContext.Provider value={{ state, update }}>
            {children}
        </AccountContext.Provider>
    )
}