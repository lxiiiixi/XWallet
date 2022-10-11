import React, {
    useEffect,
    useState,
    createContext,
    useContext,
} from 'react'
import { reactLocalStorage } from 'reactjs-localstorage';
import { safeAccess } from '@/popup/utils'


//需要在.env.local等文件中设置REACT_APP_APPKEY，代表本APP的key或者ID
const appKey = process.env.REACT_APP_APPKEY;

const StorageContext = createContext()
export function useStorage() {
    return useContext(StorageContext)
}

export default function StorageProvider({ children }) {
    const [state, setState] = useState({})


    function updateByAddress(address, value) {
        reactLocalStorage.setObject(appKey, {
            ...state,
            [address]: value
        })
        setState({ ...state, [address]: value })
    }

    function updateCrypt(address, crypt) {
        let _data = safeAccess(state, [address]) || {}
        _data = {
            ..._data,
            crypt,
        }
        updateByAddress(address, _data)
    }


    //返回默认账号的存储，默认账号就是第一个账号（在本钱包为单账号情况下就是唯一的账号）
    function useDefaultAccount() {
        const defaultData = reactLocalStorage.getObject(appKey)
        console.log(defaultData);

        let keys = Object.keys(defaultData)
        const obj = {
            defaultCrypt: defaultData[keys[0]],
            defaultAddress: keys[0]
        }
        return obj
    }

    //获取某账号加密后的私钥，登录时使用
    function useAccountCrypt(address) {
        return safeAccess(state, [address, 'crypt'])
    }



    return (
        <StorageContext.Provider value={{ state, updateByAddress, updateCrypt, useDefaultAccount, useAccountCrypt }}>
            {children}
        </StorageContext.Provider>
    )
}