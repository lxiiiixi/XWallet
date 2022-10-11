import React from 'react'
import { Tabs } from 'antd';

export default function DetailTab() {

    const Tab1 = () => <div style={{ width: "160px", textAlign: "center" }}>资产</div>
    const Tab2 = () => <div style={{ width: "160px", textAlign: "center" }}>活动</div>

    return (
        <Tabs defaultActiveKey="1" tabBarStyle={{ marginTop: "20px" }}>
            <Tabs.TabPane tab={<Tab1 />} key="1">
                <Assets />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<Tab2 />} key="2">
                <Events />
            </Tabs.TabPane>
        </Tabs>
    )
}

const Assets = () => {
    return <div>
        <a href='https://portfolio.metamask.io'>Portfolio site</a>
        <div>找不到您的代币?</div>
        <div>
            <span>刷新列表</span> 或 <span>导入代币</span>
        </div>
    </div>
}


const Events = () => {
    return <div>
        <a href='https://portfolio.metamask.io'>Portfolio site</a>
    </div>
}
