import React, { useEffect, useRef } from 'react'
import "./AdminPanel.scss"
import { Link } from "react-router-dom"
import { productsReduce, isLoadingReduce, searchStringReduce, attentionReduce, priceToggleReduce, yesNoReduce } from "../../../redux/Slices/adminSlice"
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../../http';
import axios from 'axios';
import { Icons, Images } from '../../../Config/index';
import UserService from '../../../Services/UserService';

let id = null
function Products() {
  const admin = useSelector(state => state.admin)
  const category = useSelector(state => state.category)
  const dispatch = useDispatch()

  async function getData() {
    dispatch(isLoadingReduce(true))
    await axios.get(`${API_URL}/products`).then((value) => {
      dispatch(productsReduce(
        value.data.filter(p => p.deleteState === false),
      ))
    })
    dispatch(isLoadingReduce(false))
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
      UserService.deleteProduct(id, getData)
    }
  }

  function sortData(obj) {
    dispatch(priceToggleReduce(!admin.priceToggleState))
    if (admin.priceToggleState) {
      let sortedData = [...obj].slice().sort((a, b) => b.price - a.price);
      dispatch(productsReduce([...sortedData]))
    } else {
      let sortedData = obj.slice().sort((a, b) => a.price - b.price);
      dispatch(productsReduce([...sortedData]))
    }
  }
  return (
    <div className='adminPages'>
      {
        admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :
          <div className="adminPages__wrapper">
            <div className="adminPages__wrapper__top">
              <input type="text" placeholder='Search by name' onChange={(e) => dispatch(searchStringReduce({ string: e.target.value }))} />

              <input type="text" list='categories' placeholder='Search by category' onChange={(e) => dispatch(searchStringReduce({ category: e.target.value }))} />
              <datalist id="categories">
                {
                  category.categoriesState?.map(c => {
                    return (
                      <option key={c?._id} value={c?.categoryName} />
                    )
                  })
                }
              </datalist>

              <button onClick={() => sortData(admin.productsState)} >{Icons.Sort}Sort by price </button>
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
                  {/* <th className='editTh'>Action</th> */}
                  <th className='detailTh'>Action</th>
                </tr>
                {
                  admin?.productsState?.
                    filter(s => s.name?.toLowerCase()?.includes(admin.searchString?.string?.toLowerCase())
                      || s.category?.toLowerCase()?.includes(admin.searchString?.category?.toLowerCase())).
                    map((p, index) => {
                      return (
                        <tr key={p._id} className="contentRow">
                          <td className='productsTd'>{index}</td>
                          <td className='imgTd productsTd'><img src={p?.image} alt="" /></td>
                          <td className='productsTd'>{p?.brand}</td>
                          <td className='productsTd'>{p?.name}</td>
                          <td className='productsTd'>{p?.category}</td>
                          <td className='productsTd'>{p?.price}</td>
                          <td className='productsTd'>{p?.count}</td>
                          <td className='productsTd'>{p?.color}</td>
                          <td className='descTd productsTd' dangerouslySetInnerHTML={{ __html: p.desc }}></td>
                          <td className='delTd productsTd'><button className='productDelete' onClick={() => {
                            dispatch(attentionReduce(true))
                            id = p._id
                          }}>Delete</button></td>
                          {/* <td className='editTd productsTd'><button className='productEdit'>Edit</button></td> */}
                          <td className='detailTd productsTd'>
                            <Link className='adminProductDetail' to={`/admin/panel/products/${p._id}`}>Edit</Link>
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
      }
    </div >
  )
}

export default Products