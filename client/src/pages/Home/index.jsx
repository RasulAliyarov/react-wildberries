import React from 'react'

import "./Home.scss"
import { Icons, Images } from "../../Config/index"
import SMProduct from '../../components/SMProductCard/SMProduct';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { productModalReducer } from "../../redux/Slices/wildSlice"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductModal from "../../components/ProductModal"
import BurgerModal from '../../components/BurgerModal';

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

      {/* Product Modal */}
      <div className={wildberries.productModalState ? "productModalWrapper" : "productModalNone"}>
        <div className='productModalWrapperBg' onClick={() => {
          dispatch(productModalReducer(false))
        }}></div>
        <ProductModal />
      </div>

      <BurgerModal />
    </>
  )
}

export default Home