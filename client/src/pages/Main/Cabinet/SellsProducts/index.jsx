import React, { useEffect } from 'react'
import { buyProductsReduce } from "../../../../redux/Slices/wildSlice"
import { isLoadingReduce } from "../../../../redux/Slices/adminSlice"
import { useDispatch, useSelector } from "react-redux"
import _api, { API_URL } from "../../../../http";
import { useNavigate } from 'react-router-dom';
import "./SellsProducts.scss"
import { Images } from "../../../../Config/index"
import { Helmet } from "react-helmet";

function SellsProducts() {

  const wildberries = useSelector(state => state.wildberries)
  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function getProduct() {
    dispatch(isLoadingReduce(true))
    await _api.get("getSells").then(res => {
      dispatch(buyProductsReduce(res.data.filter(p => p?.productId?.user === admin?.userState?.id)))
    })
    dispatch(isLoadingReduce(false))
  }

  useEffect(() => {
    getProduct()
  }, [admin?.userState])
  return (
    <div className='buyProducts sellsProducts contentBg'>
      {
        admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :
          <div className="buyProducts__wrapper">
            <div className="buyProducts__wrapper__content">
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
          </div>
      }
      <Helmet>
        <meta charSet="utf-8" />
        <title>{admin?.userState?.username} - Sells</title>
      </Helmet>
    </div>
  )
}

export default SellsProducts