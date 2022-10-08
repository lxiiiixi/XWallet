import React, { useState } from 'react';
import { Tabs, Button, Space, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers';
import { aesEncrypt, aesDecrypt } from '@/popup/utils'
import { useAccount } from "@/popup/contexts/AccountProvider"
import { useStorage } from "@/popup/contexts/StorageProvider"

export default function Import() {
    const navigate = useNavigate()
    const INITSTATE = {
        helpWords: "",
        privateKey: "",
        password: "",
        passwordAgain: "",
        submitType: ""
    }
    const [state, setState] = useState(INITSTATE)
    const { state: accountState, update: updateAccount } = useAccount()
    const { state: storageState, updateCrypt } = useStorage()

    const cancel = () => {
        setState(INITSTATE)
        navigate('/create')
    }

    const submit = () => {
        console.log(state);
        if (state.password !== state.passwordAgain || state.password.length < 12) {
            console.log("密码不符合规范");
        } else {
            let wallet;
            if (state.submitType === "privateKey") {
                try {
                    wallet = new ethers.Wallet(state.privateKey);
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    wallet = ethers.Wallet.fromMnemonic(state.helpWords);
                } catch (err) {
                    console.log(err);
                }
            }
            if (wallet) {
                try {
                    let _crypted = aesEncrypt(wallet.privateKey, state.password);
                    updateCrypt(wallet.address, _crypted)
                    updateAccount({
                        isLogin: true,
                        password: state.password,
                        wallet,
                    })
                    console.log("新钱包的私钥:", wallet.privateKey, "用户密码作为key加密后:", _crypted);
                    navigate('/home')
                } catch (err) {
                    console.log("写入浏览器存储出错", 'error');
                }
            }

        }
    }


    return (
        <div style={{ padding: "10px", }}>
            <Tabs type="card" centered="true" defaultActiveKey="1" onTabClick={(key) => { setState({ ...state, submitType: key }) }}>
                <Tabs.TabPane tab="私钥导入" key="privateKey">
                    <Space direction="horizontal">
                        <p style={{ width: "65px" }}>私钥</p>
                        <Input.Password
                            placeholder="input the private Key"
                            size="large"
                            style={{
                                width: '260px',
                            }}
                            value={state.privateKey}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => { setState({ ...state, privateKey: e.target.value }) }}
                        />
                    </Space>
                </Tabs.TabPane>
                <Tabs.TabPane tab="助记词导入" key="helpWords">
                    <Space direction="horizontal">
                        <p style={{ width: "65px" }}>助记词</p>
                        <Input.Password
                            placeholder="input your mnemonic word"
                            size="large"
                            style={{
                                width: '260px',
                            }}
                            value={state.helpWords}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => { setState({ ...state, helpWords: e.target.value }) }}
                        />
                    </Space>
                </Tabs.TabPane>
            </Tabs>
            <Space direction="horizontal">
                <p style={{ width: "65px" }}>密码</p>
                <Input.Password
                    placeholder="input password"
                    size="large"
                    style={{
                        width: '260px',
                    }}
                    value={state.password}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={(e) => { setState({ ...state, password: e.target.value }) }}
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
                    value={state.passwordAgain}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={(e) => { setState({ ...state, passwordAgain: e.target.value }) }}
                />
            </Space>
            <Button onClick={submit}>导入</Button>
            <Button onClick={cancel}>取消</Button>
        </div >
    )
}
