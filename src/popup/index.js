import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from '@/popup/pages/login'
import Home from '@/popup/pages/home'
import Create from '@/popup/pages/Create'
import Import from '@/popup/pages/Import'
import Detail from '@/popup/pages/Detail'
import './popup.styl'
import Header from 'popup/component/Header'
// 在popup页面调试content script，仅用于开发环境，build前记得要注释掉。
// import '@/content'

function Popup() {
    return (
        <>
            <Header />
            <HashRouter>
                <Routes>
                    <Route exact path="/create" element={<Create />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/import" element={<Import />} />
                    <Route exact path="/detail" element={<Detail />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </HashRouter>
        </>
    )
}

export default Popup