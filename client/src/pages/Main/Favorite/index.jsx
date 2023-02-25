import React, { useEffect } from 'react'
import { favoriteReduce } from "../../../redux/Slices/wildSlice"
import { isLoadingReduce } from '../../../redux/Slices/adminSlice'
import { useDispatch, useSelector } from "react-redux"
import { Icons, Images } from "../../../Config/index"
import { toast } from "react-hot-toast"
import axios from 'axios'
import { API_URL } from '../../../http'
import "./Favorite.scss"
import UserService from '../../../Services/UserService'

function Favorite() {
    const wildberries = useSelector(state => state.wildberries)
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()

    async function getFavorite() {
        dispatch(isLoadingReduce(true))
        await axios.get(`${API_URL}/getUserById/${admin.userState.id}`).then(u => {
            dispatch(favoriteReduce(u.data.favorite))
        })
        dispatch(isLoadingReduce(false))
    }
    useEffect(() => {
        getFavorite()
    }, [admin.userState])

    return (
        <div className="favorite contentBg">
            {
                admin.isLoadingState ? <div className='loader'><img src={Images.Loader} alt="" /></div> :

                    <div className="favorite__wrapper container1500">
                        <h2 className='tabTtile tabTtile--favModiied'>Избранное</h2>
                        <div className="favorite__wrapper__products">
                            {
                                wildberries.favoriteState.map((value, index) => {
                                    return (
                                        <div key={index} className="favorite__wrapper__products__product">
                                            <div className="favorite__wrapper__products__product__top">
                                                <img src={`${value.image}`} alt="" />
                                                <span className='cardDiscount'>-30%</span>
                                            </div>
                                            <div className="favorite__wrapper__products__product__bottom">
                                                <span className='price'>
                                                    <h5>{value.price} ₽ </h5>
                                                    <span>615 ₽</span>
                                                </span>
                                                <span className='productTitle'>
                                                    <p>{value.brand}/{value.name}</p>
                                                </span>
                                            </div>
                                            <span className='cartHeart' onClick={() => {
                                                UserService.deleteFavorite(admin?.userState?.id, value?._id, getFavorite)
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
            }
        </div>
    )
}

export default Favorite