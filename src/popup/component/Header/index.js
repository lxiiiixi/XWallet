import React, { useState, useRef } from 'react'
import './header.styl'
import { Divider, Select, Space, Button } from 'antd';
const { Option } = Select;

const Logo = () => <div>XWallet</div>

const Network = () => {

    const [items, setItems] = useState([
        { id: 1, value: "以太坊主网络", color: "green", isChecked: true },
        { id: 2, value: "Ropsten测试网络", color: "blue", isChecked: false }
    ]);
    const defaultValue = items.filter(item => item.isChecked)[0].value

    const showItem = () => {
        return (<div>

        </div>)
    }

    const changeNetwork = (newvalue) => {
        console.log(newvalue);
    }


    return (
        <>
            <Select
                style={{
                    width: 130,
                }}
                defaultValue={defaultValue}
                placeholder="network"
                onChange={changeNetwork}
                dropdownRender={(menu) => (
                    <>
                        <p style={{ textAlign: "center" }}>网络</p>
                        <Divider
                            style={{
                                margin: '8px 0',
                            }}
                        />
                        {menu}
                        <Divider
                            style={{
                                margin: '8px 0',
                            }}
                        />
                        <Space
                            style={{
                                padding: '0 10px 2px 10px',
                            }}
                        >
                            <Button block>添加网络</Button>
                        </Space>
                    </>
                )}
            >
                {items.map((item) => (
                    <Option key={item.value}>{item.value}</Option>
                ))}
            </Select>
        </>)
}

export default function index() {
    return (
        <div className='header'>
            <Logo />
            <Network />
        </div>
    )
}
