import React, { useEffect, useRef } from 'react'
import { Link, parsePath } from "react-router-dom"
import { sellersReduce, attentionReduce, yesNoReduce } from "../../../redux/Slices/adminSlice"
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../../http';
import axios from 'axios';
import { Images } from '../../../Config/index';
import UserService from '../../../Services/UserService';

const id = null
function Seller() {

  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()

  function getData(accessToken) {
    axios.get(`${API_URL}/users`, { headers: { "Authorization": `Bearer ${accessToken}` } }).then((value) => {
      dispatch(sellersReduce(
        value.data.filter(p => p.deleteState === false && p.roles[0] === "SELLER"),
      ))
    })
  }
  useEffect(() => {
    const accessToken = localStorage.getItem("admintoken")
    getData(accessToken)
  }, [])

  function handlerAttentioModal(state, imgState) {
    dispatch(yesNoReduce(imgState))
    setTimeout(() => {
      dispatch(attentionReduce(state))
      dispatch(yesNoReduce("neitral"))
    }, 2200)
    if (imgState === "yes") {
      console.log(id)
      UserService.deleteProduct(id, getData)
    }
  }

  function handleName(e) {
    console.log(e.name)
  }

  return (
    <div className='adminPages'>

      {/* <input type="file" placeholder='Img' onChange={(e) => handleName(e.target.files[0])} /> */}

      <div className="adminPages__wrapper">
        <div className="adminPages__wrapper__top">
          <input type="text" placeholder='Search by name' />

          <input type="text" list='categories' placeholder='Search by category' />
          <datalist id="categories">
            <option value="Cloth" />
            <option value="Man" />
            <option value="Woman" />
            <option value="Home" />
          </datalist>

        </div>
        <div className="adminPages__wrapper__bottom">
          <table className='adminPages__wrapper__bottom__table'>
            <tr>
              <th>#</th>
              <th>Full name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>country</th>
              <th>Roles</th>
              <th className='delTh'>Action</th>
              <th className='editTh'>Action</th>
              <th className='detailTh'>Action</th>
            </tr>
            {
              admin?.sellersState?.map((p, index) => {
                return (
                  <tr key={p._id} className="contentRow">
                    <td className='userData productsTd'>{index}</td>
                    <td className='userData productsTd'>{p?.fullname}</td>
                    <td className='userData productsTd'>{p?.username}</td>
                    <td className='userData productsTd'>{p?.email}</td>
                    <td className='userData productsTd'>{p?.phonenumber ? p?.phonenumber : "📞"}</td>
                    <td className='userData productsTd'>{p?.country ? p?.country : "🏴"}</td>
                    <td className='userData productsTd'>{p?.roles}</td>
                    <td className='delTd userData productsTd'><button className='productDelete' onClick={() => {
                      dispatch(attentionReduce(true))
                      id = p._id
                    }}>Delete</button></td>
                    <td className='editTd userData productsTd'><button className='productEdit'>Edit</button></td>
                    <td className='detailTd userData productsTd'>
                      <Link className='adminProductDetail' to={`/admin/panel/products/${p._id}`}>Detail</Link>
                    </td>
                  </tr>
                )
              })
            }
          </table>
        </div>
        <div className={admin.attentionState ? "attentionModal " : "attentionModalNone"}>

          <div className="attentionModal__bg" onClick={() => dispatch(attentionReduce(false))}></div>

          <div className='attentionModal__content'>
            <span>
              <img src={Images.Success}
                style={admin.yesNoState === "yes" ? { display: "block" } : { display: "none" }} alt="" />
              <img src={Images.Cancel}
                style={admin.yesNoState === "no" ? { display: "block" } : { display: "none" }} alt="" />
              <h4 src={Images.Cancel}
                style={admin.yesNoState === "neitral" ? { display: "block" } : { display: "none" }} alt="" >
                Delete Product?
              </h4>
            </span>
            <div className='attentionModal__content__buttons'>
              <button className='attentionModal__content__buttons__ok' onClick={() => handlerAttentioModal(false, "yes")}>Ok</button>
              <button className='attentionModal__content__buttons__cancel' onClick={() => handlerAttentioModal(false, "no")}>Cancel</button>
            </div>
          </div>
        </div>

      </div >

    </div>
  )
}

export default Seller