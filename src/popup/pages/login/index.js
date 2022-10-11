import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from 'antd'
import { apiReqs } from '@/api'
import './login.styl'
import { aesDecrypt } from '@/popup/utils'
import { useAccount } from "@/popup/contexts/AccountProvider"
import { useStorage } from "@/popup/contexts/StorageProvider"
import { ethers } from 'ethers'
import { reactLocalStorage } from 'reactjs-localstorage';

function Login() {
    const navigate = useNavigate()
    const { update: updateAccount } = useAccount()
    const { state, updateCrypt, useDefaultAccount, useAccountCrypt } = useStorage()
    const [password, setPassword] = useState('')
    // const { defautCrypt: crypt, defautAddress: address } = useDefaultAccount()
    // console.log(crypt, address);

    const login = () => {

        // let privateKey = aesDecrypt(crypt, password);
        // let wallet = new ethers.Wallet(privateKey)
        // updateAccount({
        //     isLogin: true,
        //     password,
        //     wallet,
        // })
        navigate('/detail')
    }

    return (
        <div className='login'>
            <div className='loginPwd'>
                <Input.Password placeholder="密码" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <div className='loginBtn'>
                <Button type="primary" block={true} onClick={login}>
                    登录
                </Button>
            </div>
        </div>
    )
}

export default Login
