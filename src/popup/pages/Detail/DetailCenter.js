import React from 'react'
import "./index.styl"
import { VerticalAlignBottomOutlined, ArrowRightOutlined, RetweetOutlined } from '@ant-design/icons';

export default function DetailCenter() {
    return (
        <div className='detailCenter'>
            <span className='eth'>0 ETH</span>
            <span className='usd'>$0.00 USD</span>
            <div className='detailGroup'>
                <div>
                    <div className='iconWrap'><VerticalAlignBottomOutlined /></div>
                    购买
                </div>
                <div>
                    <div className='iconWrap'> <ArrowRightOutlined /></div>
                    发送
                </div>
                <div>
                    <div className='iconWrap'><RetweetOutlined /></div>
                    兑换Swap
                </div>
            </div>
        </div>
    )
}
