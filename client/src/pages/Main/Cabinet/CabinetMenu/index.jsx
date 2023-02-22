import React, { useEffect } from 'react'
import "./Cabinet.scss"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useSelector } from 'react-redux';

function Cabinet() {
  const { id } = useParams()
  const admin = useSelector(state => state.admin)
  const navigate = useNavigate()
  useEffect(() => {
    // if (!admin?.userState?.roles) navigate("*")
    // console.log("sa")
  }, [])
  return (
    <div className="cabinet__wrapper__menu">
      <span>
        <NavLink style={admin.userState?.roles?.includes("SELLER") ? { display: "flex" } : { display: "none" }} className={({ isActive }) => isActive ? "activeCabinetLink" : null} to={` `}>Мои товары</NavLink>
      </span>
      <span>
        <NavLink style={admin.userState?.roles?.includes("SELLER") ? { display: "flex" } : { display: "none" }} className={({ isActive }) => isActive ? "activeCabinetLink" : null} to={`/cabinet/${id}/sellProducts`}>Продажи</NavLink>
      </span>
      <span>
        <NavLink style={admin.userState?.roles?.includes("SELLER") ? { display: "flex" } : { display: "none" }} className={({ isActive }) => isActive ? "activeCabinetLink" : null} to={`/cabinet/${id}/addProduct`} >Добавить товар</NavLink>
      </span>
      <span>
        <NavLink className={({ isActive }) => isActive ? "activeCabinetLink" : null} to={`/cabinet/${id}/editInfo`}>Личные данные</NavLink>
      </span>
      <span>
        <NavLink style={admin.userState?.roles?.includes("SELLER") ? { display: "flex" } : { display: "none" }} className={({ isActive }) => isActive ? "activeCabinetLink" : null} to={`/cabinet/${id}/deleteProducts`}>Удаленные товары</NavLink>
      </span>
    </div >
  )
}

export default Cabinet