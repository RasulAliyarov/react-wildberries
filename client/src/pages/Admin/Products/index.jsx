import React, { useEffect } from 'react'
import "./AdminPanel.scss"
import { Link, parsePath } from "react-router-dom"
import { productsReduce, attentionReduce, yesNoReduce } from "../../../redux/Slices/adminSlice"
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../../http';
import axios from 'axios';
import { Images } from '../../../Config/index';
import UserService from '../../../Services/UserService';

let id = null
function Products() {
  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()

  function getData() {
    axios.get(`${API_URL}/products`).then((value) => {
      dispatch(productsReduce(
        value.data.filter(p => p.deleteState === false),
      ))
    })
  }
  useEffect(() => {
    getData()
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
  return (
    <div className='adminPages'>

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
              <th>Image</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Count</th>
              <th>Color</th>
              <th className='descTh'>Description</th>
              <th className='delTh'>Action</th>
              <th className='editTh'>Action</th>
              <th className='detailTh'>Action</th>
            </tr>
            {
              admin?.productsState?.map((p, index) => {
                return (
                  <tr key={p._id} className="contentRow">
                    <td>{index}</td>
                    <td className='imgTd'><img src={p?.image} alt="" /></td>
                    <td >{p?.brand}</td>
                    <td>{p?.name}</td>
                    <td>{p?.category}</td>
                    <td>{p?.price}</td>
                    <td>{p?.count}</td>
                    <td>{p?.color}</td>
                    <td className='descTd' dangerouslySetInnerHTML={{ __html: p.desc }}></td>
                    <td className='delTd'><button className='productDelete' onClick={() => {
                      dispatch(attentionReduce(true))
                      id = p._id
                    }}>Delete</button></td>
                    <td className='editTd'><button className='productEdit'>Edit</button></td>
                    <td className='detailTd'>
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
      </div>


    </div >
  )
}

export default Products