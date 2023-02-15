import React, { useEffect, useState } from 'react'
import { favoriteReduce } from "../../../redux/Slices/wildSlice"
import { useDispatch, useSelector } from "react-redux"
import { Icons, Images } from "../../../Config/index"
import { toast } from "react-hot-toast"
import axios from 'axios'
import { API_URL } from '../../../http'
import { checkAuth } from '../../../redux/Slices/adminSlice'

function Favorite() {
    const wildberries = useSelector(state => state.wildberries)
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(admin.userState)
        axios.get(`${API_URL}/getUserById/${admin.userState.id}`).then(u => {
            console.log(u.data)
            dispatch(favoriteReduce(u.data.favorite))
        })
    }, [])

    return (
        <div className="cart">
            <div className="cart__wrapper container1500">
                {/* <button onClick={() => {
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
                }}>{Icons.Delete} <span>Очистить корзину</span></button> */}
                <div className="cart__wrapper__items">
                    {
                        wildberries.favoriteState.map((value, index) => {
                            return (
                                <div key={index} className="cart__wrapper__items__item">
                                    <div className="home__wrapper__products__product__top">
                                        <img src={`${value.image}`} alt="" />
                                        <span className='cardDiscount'>-30%</span>
                                    </div>
                                    <div className="home__wrapper__products__product__bottom">
                                        <span className='price'>
                                            <h5>{value.price} ₽ </h5>
                                            <span>615 ₽</span>
                                        </span>
                                        <span className='productTitle'>
                                            <p>{value.brand}/{value.name}</p>
                                        </span>
                                    </div>
                                    <span className='cartHeart' onClick={() => {
                                    }}>{Icons.FillHeart}</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={wildberries.favoriteState.length > 0 ? "CartFull" : "CartEmpty"}>
                    <img src={Images.FavoriteBG} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Favorite