import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { ethers } from 'ethers';
import { aesEncrypt, aesDecrypt } from '@/popup/utils'
import { useAccount } from "@/popup/contexts/AccountProvider"
import { useStorage } from "@/popup/contexts/StorageProvider"
import { useNavigate } from 'react-router-dom'

export default function Create() {
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const { state: accountState, update: updateAccount } = useAccount()
    const { state: storageState, updateCrypt } = useStorage()
    const navigate = useNavigate()

    // console.log(accountState, updateAccount, storageState);

    const create = () => {
        if (password === passwordAgain) {
            if (password.length >= 12) {
                let wallet = null;
                try {
                    wallet = ethers.Wallet.createRandom();
                } catch (err) {
                    console.log("当前浏览器不支持创建随机钱包", 'error');
                }
                console.log(wallet);
                if (wallet) {
                    try {
                        let _crypted = aesEncrypt(wallet.privateKey, password);
                        updateCrypt(wallet.address, _crypted)
                        updateAccount({
                            isLogin: true,
                            password,
                            wallet,
                        })
                        console.log("新钱包的私钥:", wallet.privateKey, "用户密码作为key加密后:", _crypted);
                        //新钱包的私钥: 0x1c6bc4a5fb19c8f54c514f7b80739b47a2f0b872f614b1975377ff7210639cce 
                        //用户密码作为key加密后: U2FsdGVkX1/KRcSeCbfWqKcVif0Am6wSzYHr2U8vKcuGVClrRSX2gqnkUA647RNg/co7yh2sIPp36b1Ss+uS2pQHBKZa3r7LRIvpn+17s9n4LNHBpOjo3mfrL+CZY0mI
                        navigate('/detail')
                    } catch (err) {
                        console.log("写入浏览器存储出错", 'error');
                    }
                }
            } else {
                console.log(`密码长度至少${12}位`, "error");
            }
        } else {
            console.log("两次输入的密码不一致");
        }
    }
    return (
        <div style={{ padding: "15px" }}>
            <h3>创建一个新账号</h3>
            <div>
                <Space direction="vertical">
                    <Space direction="horizontal">
                        <p style={{ width: "65px" }}>密码</p>
                        <Input.Password
                            placeholder="input password"
                            size="large"
                            style={{
                                width: '260px',
                            }}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </Space>
                    <Space direction="horizontal">
                        <p style={{ width: "65px" }}>确认密码</p>
                        <Input.Password
                            placeholder="input password to confirm"
                            size="large"
                            style={{
                                width: '260px',
                            }}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => { setPasswordAgain(e.target.value) }}
                        />
                    </Space>
                </Space>
            </div>
            <Button onClick={create}>创建新账号</Button>
            <div onClick={() => { navigate("/import") }}>导入已有账号</div>
        </div>
    )
}
