import React from 'react'
import { Outlet } from "react-router-dom"
import CabinetMenu from './CabinetMenu'


function MainRooting() {

    return (
        <div className='cabinet contentBg'>
            <div className='cabinet__wrapper container1500'>
                <CabinetMenu />
                <Outlet />
            </div>
        </div>
    )
}

export default MainRooting