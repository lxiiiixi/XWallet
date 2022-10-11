import React from 'react'
import "./detailHeader.styl"
import copy from 'copy-to-clipboard';
import { useAccount } from "@/popup/contexts/AccountProvider"
import { addressDisplay } from "@/popup/utils"

export default function Account() {
    const { state } = useAccount();
    const { wallet, network } = state
    const { address } = wallet

    console.log(useAccount(), address);

    const copyAddress = (e) => {
        e.preventDefault()
        if (copy(address)) {
            console.log("复制成功");
        }
    }

    return (
        <div className='account' onClick={copyAddress}>
            <span className='accountName'>Account1</span>
            <span className='accountAddress'>{addressDisplay(address)}</span>
        </div>
    )
}
