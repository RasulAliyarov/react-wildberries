import React, { useEffect } from 'react'
import "./ProductCard.scss"
import { useDispatch, useSelector } from 'react-redux';
import { productModalReducer } from "../../../redux/Slices/wildSlice"
import { Link } from "react-router-dom"

function ProductCard({ p }) {
    const wildberries = useSelector(state => state.wildberries)
    const dispatch = useDispatch()

    return (
        <div className='home__wrapper__products__product'>
            <Link to="/detail">
                <div className="home__wrapper__products__product__top">
                    <img src={p.image} alt="" />

                    <span className='cardDiscount'>-30%</span>
                </div>
                <div className="home__wrapper__products__product__bottom">
                    <span className='price'>
                        <h5>{p.price} ₽ </h5>
                        <span>615 ₽</span>
                    </span>
                    <span className='productTitle'>
                        <p>{p.brand}/{p.name}</p>
                    </span>
                </div>
            </Link>
            <button className='cardModalBtn' onClick={() => {
                dispatch(productModalReducer({
                    state: true,
                    productData: { ...p }
                }))
            }}>Быстрый просмотр</button>
        </div>

    )
}

export default ProductCard