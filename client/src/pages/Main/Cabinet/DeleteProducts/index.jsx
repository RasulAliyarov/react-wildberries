import React, { useEffect } from 'react'
import "../SellerProducts/SellerProduct.scss"
import { useDispatch, useSelector } from 'react-redux';
import { sellerDeleteProductsReduce } from "../../../../redux/Slices/wildSlice"
import axios from 'axios';
import { API_URL } from '../../../../http';
import { Link } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import UserService from '../../../../Services/UserService';
import { toast } from "react-hot-toast"

function DeleteProducts() {
  const wildberries = useSelector(state => state.wildberries)
  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()
  function getData() {
    axios.get(`${API_URL}/products`).then(r => {
      dispatch(sellerDeleteProductsReduce(r.data.filter(p => p.user === admin.userState.id && p.deleteState === true)))
    })
  }
  useEffect(() => {
    getData()
  }, [])


  function submit(id) {
    console.log(id)
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            UserService.restoreProduct(id, getData).then(res => {
              toast.success('Товар востановлен.', { 
                style: {
                  border: '1px solid #4C1174',
                  padding: '16px',
                  color: '#4C1174',
                },
                iconTheme: {
                  primary: '#4C1174',
                  secondary: '#FFFAEE',
                },
              });
            })
          }
        },
        {
          label: 'No',
          onClick: () => {

          }
        }
      ]
    });
  }

  return (
    <div className='sellerProducts'>
      <div className="sellerProducts__wrapper">
        <div className="sellerProducts__wrapper__products">
          {
            wildberries.sellerDeleteProducts.map(p => {
              return (
                <div className="sellerProducts__wrapper__products__product">
                  <Link key={p._id} to="/detail">
                    <div className="sellerProducts__wrapper__products__product__top">
                      <img src={p.image} alt="" />

                      <span className='cardDiscount'>-30%</span>
                    </div>
                    <div className="sellerProducts__wrapper__products__product__bottom">
                      <span className='price'>
                        <h5>{p.price} ₽ </h5>
                        <span>615 ₽</span>
                      </span>
                      <span className='productTitle'>
                        <p>{p.brand}/{p.name}</p>
                      </span>
                    </div>

                  </Link>
                  <span className='cardButtons'>
                    <button className='cardButtons__restBtn' onClick={() => submit(p._id)}>Restore</button>
                  </span>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default DeleteProducts