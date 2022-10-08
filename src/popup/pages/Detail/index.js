import React from 'react'
import DetailHeader from 'popup/component/DetailHeader'
import DetailCenter from './DetailCenter'
import DetailTab from './DetailTab'

export default function index() {
    return (
        <div>
            <DetailHeader />
            <div style={{ padding: "10px" }}>
                <DetailCenter />
                <DetailTab />
            </div>
        </div>
    )
}
