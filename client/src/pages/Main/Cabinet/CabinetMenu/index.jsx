import React, { useEffect } from 'react'
import "./Cabinet.scss"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { Icons, Images } from "../../../../Config/index"
import { respCabinetNavReduce } from "../../../../redux/Slices/wildSlice"

function Cabinet() {
  const { id } = useParams()
  const admin = useSelector(state => state.admin)
  const wildSlice = useSelector(state => state.wildberries)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <button className='cabinetBurger' onClick={() => dispatch(respCabinetNavReduce(!wildSlice?.respCabinetNavToggle))}>
        {Icons.HamburgerMenu}
      </button>
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

      <div className={wildSlice?.respCabinetNavToggle ? "cabinet__wrapper__respMenu" : "cabinet__wrapper__respMenuNone"}>
        <div className="cabinet__wrapper__respMenu__bg" onClick={()=> dispatch(respCabinetNavReduce(false))}></div>
        <div className="cabinet__wrapper__respMenu__content">
          <h3 className='cabinet__wrapper__respMenu__content__title'>wilberries</h3>
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
        </div>

      </div >
    </>
  )
}

export default Cabinet