import React from 'react'
import "./detailHeader.styl"
import Account from './Account';
import Extensions from './Extensions';
import Connect from './Connect';

export default function index() {
    return (
        <div className='detailheader'>
            <Connect />
            <Account />
            <Extensions />
        </div>
    )
}
