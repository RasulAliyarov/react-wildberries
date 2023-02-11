import React from 'react'
import { NavLink } from "react-router-dom"
import "./AdminNav.scss"
import { Icons, Images } from "../../../Config"
import { Toaster } from "react-hot-toast"

function AdminNav() {
    return (
        <nav className='adminNav'>
            <div className="adminNav__wrapper">
                <div className='adminNav__wrapper__top'>
                    <img src={Images.WbAdmin} alt="" />
                    <span>Wildberries</span>
                </div>

                <h5 className='adminNav__wrapper__title'>Navigation <span>{Icons.Navigation}</span></h5>

                <ul className='adminNav__wrapper__list'>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "activeLink" : ""} to="/admin/panel/products"><span>Products</span><img src={Images.Products} /></NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "activeLink" : ""} to="/admin/panel/users"><span>Users</span> <img src={Images.Users} /></NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "activeLink" : ""} to="/admin/panel/sellers"><span>Sellers</span><img src={Images.Shop} alt="" /></NavLink>
                    </li>
                </ul>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </nav>
    )
}

export default AdminNav