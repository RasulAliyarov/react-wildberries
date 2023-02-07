import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Icons, Images } from "../../../Config/index"
import "./ProductModal.scss"

function ProductModal() {
    return (
        <div className='productModalConent' >
            <div className="productModalConent__left">
                <img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" />
            </div>
            <div className="productModalConent__right">
                <h1 className='productModalConent__right__title'>
                    Garnier/Fructis Укрепляющий шампунь для поврежденных волос,700мл
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
                <h3>186 ₽ <span>1 550 ₽</span></h3>
                <h4>Цвет: <span>черный</span></h4>

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
                    modules={[Navigation]}
                    className="mySwiper"
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
                    <button className='addToCart'><img src={Images.Cart} alt="" /> Добавить в корзину</button>
                    <button className='addToFavorite'>{Icons.OutlineHeart}</button>
                </span>
            </div>

        </div>
    )
}

export default ProductModal