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

    return (
        <StorageContext.Provider value={{ state, updateByAddress, updateCrypt }}>
            {children}
        </StorageContext.Provider>
    )
}