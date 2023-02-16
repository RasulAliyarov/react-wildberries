import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import "./AdminNav.scss"
import { Icons, Images } from "../../../Config"
import { Toaster } from "react-hot-toast"
import axios from 'axios';
import _api, { API_URL } from '../../../http';
import { logoutReduce, checkAdminAuth} from "../../../redux/Slices/adminSlice"
import { useDispatch, useSelector } from 'react-redux';

function AdminNav() {
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("admintoken")) {
            axios.get(`${API_URL}/refresh`, { withCredentials: true })
                .then((value) => {
                    dispatch(checkAdminAuth(value.data))
                })
        }
        if (!localStorage.getItem("admintoken")) {
            navigate("*")
        }
    }, [])
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
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "activeLink" : ""} to="/admin/panel/categories"><span>Categories</span>{Icons.Navigation} </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? "activeLink" : ""} to="/" onClick={() => {
                            dispatch(logoutReduce())
                        }}><span>Logout</span>{Icons.Logout} </NavLink>
                    </li>
                </ul>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </nav>
    )
}

export default AdminNav