import React from 'react'
import "./Cabinet.scss"
import { NavLink, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

function Cabinet() {
  const { id } = useParams()
  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="cabinet__wrapper__menu">
      <span>
        <NavLink style={admin.userState?.roles?.[0] === "SELLER" ? { display: "flex" } : { display: "none" }} className={({ isActive }) => isActive ? "activeCabinetLink" : null} to={`/cabinet/${id}/addProduct`} >Добавить товар</NavLink>
      </span>
      <span>
        <NavLink className={({ isActive }) => isActive ? "activeCabinetLink" : null} to={`/cabinet/${id}/editInfo`}>Изменить данные</NavLink>
      </span>
    </div>
  )
}

export default Cabinet