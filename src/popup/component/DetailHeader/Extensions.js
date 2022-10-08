import React from 'react'
import { Dropdown, Menu, Space } from 'antd'

const menu = (
    <Menu
        items={[
            {
                label: <a href="https://www.antgroup.com">1st menu item</a>,
                key: '0',
            },
            {
                label: <a href="https://www.aliyun.com">2nd menu item</a>,
                key: '1',
            },
            {
                label: '3rd menu item',
                key: '3',
            },
        ]}
    />
);

export default function Extensions() {

    return (
        <div style={{ fontWeight: 900 }}>
            <Dropdown overlay={menu} trigger={['click']}>
                <Space>
                    ...
                </Space>
            </Dropdown>
        </div>
    )
}
