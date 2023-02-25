import React from 'react'
import { Icons } from "../../../Config"
import { respCabinetReduce } from "../../../redux/Slices/wildSlice"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { logoutReduce } from "../../../redux/Slices/adminSlice"
import "./RespCabinetMenu.scss"

function RespCabinetMenu() {
    const wildberries = useSelector(state => state.wildberries)
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className={wildberries.respCabinetToggle ? "respCabinetMenuWrapper" : "respCabinetMenuWrapperNone"}>
            <div className="respCabinetMenuWrapper__bg" onClick={() => {
                dispatch(respCabinetReduce(false))
            }}></div>
            <div className="respCabinetMenuWrapper__content">
                <button className='respCabinetMenuWrapper__content__closeBtn' onClick={() => dispatch(respCabinetReduce(false))}>⨉</button>
                <ul className='respCabinetMenuWrapper__content__list'>
                    <li><Link to={`/cabinet/${admin.userState.id}`}>Кабинет </Link> </li>
                    <li><Link to="/favorite">Понравившиеся</Link></li>
                    <li><Link to={`/buyProducts/${admin.userState?.username}`}>Покупки</Link> </li>
                    <li><Link to="#">Настройки</Link></li>
                    <li style={admin.userState?.roles?.includes("USER") ? { display: "flex" } : { display: "none" }}>
                        <Link to="/sellerRegistration">Начать продавать</Link>
                    </li>
                    <button onClick={() => {
                        dispatch(logoutReduce())
                        navigate("/")
                    }}> <span>Выйти</span> {Icons.Logout}</button>
                </ul>

            </div>
        </div>
    )
}

export default RespCabinetMenu