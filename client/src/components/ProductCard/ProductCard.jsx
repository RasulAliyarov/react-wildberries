import React from 'react'
import "./ProductCard.scss"
import { useDispatch, useSelector } from 'react-redux';
import {productModalReducer} from "../../redux/Slices/wildSlice"

function ProductCard() {
    const wildberries = useSelector(state => state.wildberries)
    const dispatch = useDispatch()

    return (
        <div className='home__wrapper__products__product'>
            <div className="home__wrapper__products__product__top">
                <img src="https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" />
                <button className='cardModalBtn' onClick={()=>{
                        dispatch(productModalReducer(true))
                }}>Быстрый просмотр</button>
                <span className='cardDiscount'>-30%</span>
            </div>
            <div className="home__wrapper__products__product__bottom">
                <span className='price'>
                    <h5>387 ₽ </h5>
                    <span>615 ₽</span>
                </span>
                <span className='productTitle'>
                    <p>Garnier/Fructis Укрепляющий шампунь для поврежденных волос,700мл</p>
                </span>
            </div>

        </div>
    )
}

export default ProductCard