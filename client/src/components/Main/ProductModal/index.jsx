import React, { useEffect, } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Icons, Images } from "../../../Config/index"
import "./ProductModal.scss"
import { addToCartReducer, counterIncReduce, totalPriceReduce, counterDecReduce } from "../../../redux/Slices/wildSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import UserService from "../../../Services/UserService"
import { Link } from 'react-router-dom';

function ProductModal() {

    const wildberries = useSelector(state => state.wildberries)
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const reducrPath = wildberries.productModalState?.productData
    useEffect(() => {
        localStorage.setItem("Products", JSON.stringify(wildberries.cart))
    }, [wildberries.cart])

    function handleAddToCart() {
        let item = wildberries.cart.filter(p => p.id === reducrPath?._id)
        if (item?.[0]) {
            toast.error(`${reducrPath?.name} уже в корзине.`, {
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
            return
        }

        dispatch(addToCartReducer({
            id: reducrPath?._id,
            img: reducrPath?.image,
            name: reducrPath?.name,
            brand: reducrPath?.brand,
            count: wildberries?.counterState,
            price: reducrPath?.price,
            color: reducrPath?.color,
        }))

        toast.success(`${reducrPath?.name} в корзине.`, {
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
        dispatch(totalPriceReduce({ price: parseInt(reducrPath?.price), count: parseInt(wildberries?.counterState) }))
    }
    return (
        <div className='productModalConent' >
            <div className="productModalConent__left"  >
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
                    <span className='productModalConent__right__info__commentCount' href="#">2 278 отзывов</span>
                    <h5><span> Артикул: </span>{reducrPath?._id?.toString()?.slice(2, 11)}</h5>
                </div>
                <h3>{reducrPath?.price} ₽ <span>1 550 ₽</span></h3>
                <h4>Цвет: <span>{reducrPath?.color}</span></h4>

                {/* <Swiper
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
                </Swiper> */}
                <div className='counter'>
                    <button className='decrementBtn' onClick={() => dispatch(counterDecReduce(1))}>-</button>
                    <span>{wildberries.counterState}</span>
                    <button className='incrementBtn' onClick={() => dispatch(counterIncReduce(1))}>+</button>
                </div>
                <span className='productModalConent__right__buttons'>
                    <button className='addToCart' onClick={() => handleAddToCart()}>
                        <img src={Images.Cart} alt="" /> Добавить в корзину
                    </button>

                    <Link to={`buy/${reducrPath?._id}`} className="buyBtn"><i>{Icons.Dollar}</i>Купить</Link>

                    <i className='addToFavorite' onClick={() => {
                        UserService.addToFavorite(admin?.userState?.id, reducrPath?._id).then(r => {
                            if (!r) {
                                toast.error(`Ошибка`, {
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
                                return
                            }
                            toast.success(`${reducrPath?.name} в избранном.`, {
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
                    }}>{Icons.FillHeart}</i>

                </span>
            </div>

        </div >
    )
}

export default ProductModal