import React from 'react'
import { Tabs } from 'antd';

export default function DetailTab() {
    return (
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="资产" key="1">
                Content of Tab Pane 1
            </Tabs.TabPane>
            <Tabs.TabPane tab="活动" key="2">
                Content of Tab Pane 2
            </Tabs.TabPane>
        </Tabs>
    )
}
