import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Icons, Images } from "../../../Config/index"
import "./ProductModal.scss"
import { addToCartReducer, totalPriceReduce } from "../../../redux/Slices/wildSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import UserService from "../../../Services/UserService"
function ProductModal() {

    const wildberries = useSelector(state => state.wildberries)
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const reducrPath = wildberries.productModalState?.productData
    useEffect(() => {
        localStorage.setItem("Products", JSON.stringify(wildberries.cart))
    }, [wildberries.cart])

    return (
        <div className='productModalConent' >
            <div className="productModalConent__left">
                <img src={reducrPath?.image} alt="" />
            </div>
            <div className="productModalConent__right">
                <h1 className='productModalConent__right__title'>
                    {reducrPath?.brand}/{reducrPath?.name}
                </h1>
                <div className='productModalConent__right__info'>
                    <span>
                        {Icons.FillStar}
                        {Icons.FillStar}
                        {Icons.FillStar}
                        {Icons.FillStar}
                        {Icons.FillStar}
                    </span>
                    <a href="#">2 278 отзывов</a>
                    <h5><span> Артикул: </span>116699039</h5>
                </div>
                <h3>{reducrPath?.price} ₽ <span>1 550 ₽</span></h3>
                <h4>Цвет: <span>{reducrPath?.color}</span></h4>

                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    navigation={{
                        clickable: true,
                    }}
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 2,
                        },
                        "@0.75": {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        "@1.00": {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        "@1.50": {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                    autoplay={true}
                >
                    <div className='sadad'>
                        <SwiperSlide><img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" /></SwiperSlide>
                    </div>
                </Swiper>

                <span className='productModalConent__right__buttons'>
                    <button className='addToCart' onClick={() => {
                        dispatch(addToCartReducer({
                            id: reducrPath?._id,
                            img: reducrPath?.image,
                            name: reducrPath?.name,
                            brand: reducrPath?.brand,
                            price: reducrPath?.price,
                            color: "black",
                        }))
                        dispatch(totalPriceReduce(186))
                        toast.success('Товар в корзине.', { // saddddassssssssssssssssssss WRITE NAME
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
                    }}><img src={Images.Cart} alt="" /> Добавить в корзину</button>
                    <button className='addToFavorite' onClick={() => {
                        UserService.addToFavorite(admin?.userState?.id, reducrPath._id)
                    }}>{Icons.OutlineHeart}</button>
                </span>
            </div>

        </div>
    )
}

export default ProductModal