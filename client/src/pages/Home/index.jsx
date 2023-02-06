import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./Home.scss"
import { Icons, Images } from "../../Config/index"
import SMProduct from '../../components/SMProductCard/SMProduct';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { productModalReducer } from "../../redux/Slices/wildSlice"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home() {
  const wildberries = useSelector(state => state.wildberries)
  const dispatch = useDispatch()

  return (
    <>
      <div className='home contentBg'>
        <div className="home__wrapper container1500">
          <div className="home__wrapper__carousel">
            <Swiper
              pagination={{
                dynamicBullets: true,
                clickable: true,

              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay, Pagination, Pagination, Navigation]}
              keyboard={{
                enabled: true,
              }}

              navigation={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <a href='#'>
                  <img src={Images.Flaer1} alt="" />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href='#'>
                  <img src={Images.Flaer2} alt="" />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href='#'>
                  <img src={Images.Flaer3} alt="" />
                </a>
              </SwiperSlide>

            </Swiper>
          </div>

          <section className="home__wrapper__salesmans">
            <SMProduct />
          </section>

          <h2 className='sectionTtile'>Хиты продаж</h2>

          <section className='home__wrapper__products'>
            <ProductCard />
          </section>

          <section className='home__wrapper__text'>
            <h2 className='sectionTtile'>Широкий ассортимент и высокое качество</h2>
          </section>
        </div>
      </div >


      <div className={wildberries.productModalState ? "productModalWrapper" : "productModalNone"}>
        <div className='productModalWrapperBg' onClick={() => {
          dispatch(productModalReducer(false))
        }}></div>
        <div className='productModalConent' >
          <div className="productModalConent__left">

          </div>
          <div className="productModalConent__right">
            <h1 className='productModalConent__right__title'>
              Garnier/Fructis Укрепляющий шампунь для поврежденных волос,700мл
            </h1>
            <div className='productModalConent__righ__info'>
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
              slidesPerView={1}
              spaceBetween={3}
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
                  spaceBetween: 50,
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
              <SwiperSlide><img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" /></SwiperSlide>
              <SwiperSlide><img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" /></SwiperSlide>
              <SwiperSlide><img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" /></SwiperSlide>
              <SwiperSlide><img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" /></SwiperSlide>
              <SwiperSlide><img src="	https://basket-01.wb.ru/vol20/part2026/2026369/images/c246x328/1.webp" alt="" /></SwiperSlide>
            </Swiper>

            <span>
              <button>Добавит в корзину</button>
              <button>{Icons.OutlineHeart}</button>
            </span>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home