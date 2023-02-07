import React from 'react'
import { Outlet } from "react-router-dom"
import AdminNav from './AdminNav'

function AdminRoot() {
    return (
        <div className='admin'>
            <AdminNav/>
            <Outlet />
        </div>
    )
}

export default AdminRoot