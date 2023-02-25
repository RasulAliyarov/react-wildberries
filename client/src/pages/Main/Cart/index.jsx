import React from 'react'
import { deleteToCartReducer, deleteToCartByIdReducer } from "../../../redux/Slices/wildSlice"
import { useDispatch, useSelector } from "react-redux"
import { Icons, Images } from "../../../Config/index"
import "./Cart.scss"
import { toast } from "react-hot-toast"

function Cart() {
  const wildberries = useSelector(state => state.wildberries)
  const dispatch = useDispatch()

  return (
    <div className="cart">
      <div className="cart__wrapper container1500">
        <button onClick={() => {
          if (wildberries.cart.length > 0) {
            dispatch(deleteToCartReducer())
            toast.success('Корзина очищена..', {
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

          }
          else return
        }}>{Icons.Delete} <span>Очистить корзину</span></button>

        <div className={wildberries.cart.length > 0 ? "cart__wrapper__content" : "cart__wrapper__contentNone"}>
          <div className="cart__wrapper__content__tableWrapper">
            <table className='cart__wrapper__content__tableWrapper__table' >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Brand</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Color</th>
                  <th className='delTh'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  wildberries.cart.map((p, index) => {
                    return (
                      <tr key={index} className="contentRow">
                        <td className='cartTd'>{index}</td>
                        <td className='imgTd cartTd'><img src={p?.img} alt="" /></td>
                        <td className='cartTd'>{p?.brand}</td>
                        <td className='cartTd'>{p?.name}</td>
                        <td className='cartTd'>{p?.price}</td>
                        <td className='cartTd'>{p?.count}</td>
                        <td className='cartTd'>{p?.color}</td>
                        <td className='delTd cartTd'>
                          <span className='cartHeart' onClick={() => {
                            dispatch(deleteToCartByIdReducer({ price: parseInt(p?.price), count: parseInt(p?.count), id: p?.id }))
                          }}>
                            {Icons.CartFill}
                            <span className='cartTick'>✔</span>
                            <span className='cartTickX'>⨉</span>
                          </span></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

          </div>
          <div className='cart__wrapper__content__bill'>
            <div className="cart__wrapper__content__bill__top">
              <h4>Общая сумма</h4>
            </div>
            <ul className="cart__wrapper__content__bill__middle">
              {
                wildberries.cart.map(p => {
                  return (
                    <li key={p.id}><span>{p.name}</span><span>{p.price} ₽</span></li>
                  )
                })
              }
            </ul>
            <div className="cart__wrapper__content__bill__total">
              <span>Общая сумма:</span>
              <span>{wildberries?.totalPrice} ₽</span>
            </div>
            <div className="cart__wrapper__content__bill__bottom">
              <button onClick={() => { }}>Купить всё</button>
            </div>
          </div>
        </div>

        <div className={wildberries.cart.length > 0 ? "CartFull" : "CartEmpty"}>
          <img src={Images.CartEmpty} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Cart