import React, { useEffect } from 'react'
import "./buyProducts.scss"
import { buyProductsReduce } from "../../../redux/Slices/wildSlice"
import { isLoadingReduce } from '../../../redux/Slices/adminSlice'
import { useDispatch, useSelector } from "react-redux"
import { Images } from "../../../Config/index"
import _api from "../../../http";
import { useNavigate } from 'react-router-dom';

function BuyProducts() {
  const wildberries = useSelector(state => state.wildberries)
  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  async function getBuyProducts() {
    dispatch(isLoadingReduce(true))
    await _api.get("getSells").then(res => {
      dispatch(buyProductsReduce(res.data.filter(p => p.userId?._id === admin?.userState?.id)))
      console.log(res)
      dispatch(isLoadingReduce(false))
    })
  }
  useEffect(() => {
    getBuyProducts()
  }, [admin?.userState])

  return (
    <div className='buyProducts contentBg'>
      {
        admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :
          <div className="buyProducts__wrapper container1500">
            <h2 className='sectionTtile sectionTtile--buyModified'>Приобретенные товары</h2>
            <div className="buyProducts__wrapper__content" style={wildberries.buyProducts.length > 0 ? {display: "block"} : {display: "none"}}>
              <table>
                <thead>
                  <tr>
                    <th>İmage</th>
                    <th>Product name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Username</th>
                    <th>Country</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Post index</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    wildberries?.buyProducts?.map(v => {
                      return (
                        <tr key={v?._id} className='contentRow'>
                          <td className='imgTd'><img src={v?.productId?.image} alt="" /></td>
                          <td className='buyTd'>{v?.productId?.name}</td>
                          <td className='buyTd'>{v?.productId?.brand}</td>
                          <td className='buyTd'>{v?.productId?.price}</td>
                          <td className='buyTd'>3</td>
                          <td className='buyTd'>{v?.userId?.username}</td>
                          <td className='buyTd'>{v?.userId?.country}</td>
                          <td className='buyTd'>{v?.userId?.email}</td>
                          <td className='buyTd'>{v?.userId?.phonenumber}</td>
                          <td className='buyTd'>{v?.userId?.postIndex}</td>
                          <td className='buyTd'>{v?.date}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className={wildberries.buyProducts.length > 0 ? "CartFull" : "CartEmpty"}>
              <img src={Images.FavoriteBG} alt="" />
            </div>
          </div>
      }
    </div>
  )
}

export default BuyProducts