import React from 'react'

import "./Home.scss"
import { Icons, Images } from "../../../Config/index"
import SMProduct from '../../../components/Main/SMProductCard/SMProduct';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductModal from "../../../components/Main/ProductModal"
import BurgerModal from '../../../components/Main/BurgerModal';
import { useDispatch, useSelector } from 'react-redux';
import { productModalReducer } from "../../../redux/Slices/wildSlice"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ShowMoreText from "react-show-more-text";

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
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </section>

          <section className='home__wrapper__text'>
            <h2 className='sectionTtile'>Широкий ассортимент и высокое качество</h2>

            <ShowMoreText
              lines={4}
              more="Читать далее"
              less="Свернуть"
              className="content-css"
              anchorClass="show-more-less-clickable"
              expanded={false}
              width={0}
              truncatedEndingComponent={"... "}
            >
              <p>Интернет-магазин Wildberries – это доступные цены, широкий, регулярно обновляемый ассортимент. В онлайн-каталоге Wildberries представлено около 300 000 ведущих брендов одежды, электроники, мебели и других товаров для всех сфер жизни. Покупателям предлагается электроника, книжная продукция, детские товары. В интернет-магазине можно приобрести продукцию для дома, продукты питания, товары для красоты, ювелирные изделия, игрушки. Для удобства пользования онлайн-каталог поделен на разделы, все товары можно сортировать по ряду критериев: цена, материал изготовления, сезонность, бренд.</p>{" "}

              <h3>Выгодный шопинг</h3>

              <p>Интернет-магазин Wildberries регулярно проводит масштабные распродажи. В рамках таких акций предоставляются большие скидки (до 95%) на одежду, обувь, детские товары. Условия распродаж распространяются и на электронику, продукты питания, товары для дома, книги и многое другое. Чтобы быть в курсе предстоящих скидок или появления в ассортименте новых моделей от любимых брендов, достаточно подписаться на email-рассылку. Интернет-магазин одежды своевременно информирует получателей рассылки о распродажах, обновлении ассортимента. Дополнительные выгодные условия действуют для постоянных покупателей Wildberries – персональная скидка, зависящая от процента выкупа вещей. В Wildberries всегда ответственно подходят к выбору поставщиков, со многими производителями мы работаем напрямую, поэтому все категории товаров отличаются высоким качеством, разнообразием моделей и цветов, доступными ценами.</p>

              <h3>Доставка и оплата без проблем</h3>

              <p>Онлайн-магазин Wildberries осуществляет бесплатную доставку по всей России с помощью собственной курьерской службы. Покупатель может также забрать заказ из пункта выдачи заказов. Любую одежду, обувь и другие товары можно примерить перед оплатой заказа курьеру или в пункте выдачи заказа, оборудованном удобными примерочными.</p>
              <p className='topP'>Wildberries предлагает несколько различных вариантов оплаты заказа как при оформлении, так и по факту при получении, - банковской картой или переводом, наличным расчетом или электронным платежом. Если товар не подошел, его можно вернуть с курьером как до оплаты заказа, так и после по почте или в одном из 26 000 пунктов выдачи заказа в течение 14 дней.</p>

              <h3>Покупки всегда и везде</h3>

              <p>Купить одежду, обувь, аксессуары, детские товары и товары для дома в Wildberries можно быстро и просто. Удобный вариант - покупки через специальное мобильное приложение. Его можно скачать и установить на любой смартфон. В мобильном приложении можно заказать и другие доступные товары - электронику, продукты питания, книги.</p>

              <p>Задать интересующий вопрос можно в любое время – наш call-центр работает 24/7.</p>

              <h3>Начни прямо сейчас!</h3>

              <p>Чтобы начать шопинг с Wildberries – необходимо пройти простую регистрацию на сайте, которая займет всего несколько минут. Оцените преимущества покупок одежды, обуви, электроники, детских товаров и продукции для дома, продуктов питания и книг в Wildberries уже сейчас.</p>

            </ShowMoreText>
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