import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import Popup from '@/popup'
// 引入自定义全局公用样式
import '@/common/stylus/frame.styl'
import AccountProvider from 'popup/contexts/AccountProvider'
import StorageProvider from 'popup/contexts/StorageProvider'

const antdConfig = {
    locale: zhCN,
}

ReactDOM.render(
    <ConfigProvider {...antdConfig}>
        <AccountProvider >
            <StorageProvider>
                <Popup />
            </StorageProvider>
        </AccountProvider>
    </ConfigProvider>,
    document.getElementById('root')
)