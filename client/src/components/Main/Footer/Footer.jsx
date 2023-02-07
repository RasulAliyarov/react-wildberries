import React from 'react'
import "./Footer.scss"
import { Link } from "react-router-dom"
import { Images } from "../../../Config"

function Footer() {
    return (
        <footer className='footer'>
            <div className="footer__wrapper container1500">
                <ul>
                    <h6>Покупателям</h6>
                    <li>
                        <Link to="#">Как сделать заказ</Link>
                    </li>
                    <li>
                        <Link to="#">Способы оплаты</Link>
                    </li>
                    <li>
                        <Link to="#">Доставка</Link>
                    </li>
                    <li>
                        <Link to="#">Возврат товара</Link>
                    </li>
                    <li>
                        <Link to="#">Возврат денежных средств</Link>
                    </li>
                    <li>
                        <Link to="#">Правила продажи</Link>
                    </li>
                    <li>
                        <Link to="#">Правила пользования торговой площадкой</Link>
                    </li>
                    <li>
                        <Link to="#">Вопросы и ответы</Link>
                    </li>
                </ul>

                <div>
                    <ul>
                        <h6>Партнерам</h6>

                        <li>
                            <Link to="#">Продавайте на Wildberries</Link>
                        </li>
                        <li>
                            <Link to="#">Курьерам</Link>
                        </li>
                        <li>
                            <Link to="#">Перевозчикам</Link>
                        </li>
                        <li>
                            <Link to="#">Партнерский пункт выдачи</Link>
                        </li>
                        <li>
                            <Link to="#">Франшизный пункт выдачи</Link>
                        </li>
                    </ul>
                    <ul className='FooterOutProject'>
                        <h6>Наши проекты</h6>
                        <li>
                            <Link to="#">WB Guru</Link>
                        </li>
                        <li>
                            <Link to="#">Трудоустройство</Link>
                        </li>
                        <li>
                            <Link to="#">Цифровые товары</Link>
                        </li>
                    </ul>
                </div>

                <ul>
                    <h6>Компания</h6>
                    <li>
                        <Link to="#">О нас</Link>
                    </li>
                    <li>
                        <Link to="#">Реквизиты</Link>
                    </li>
                    <li>
                        <Link to="#">Пресс-центр</Link>
                    </li>
                    <li>
                        <Link to="#">Контакты</Link>
                    </li>
                    <li>
                        <Link to="#">Bug Bounty</Link>
                    </li>
                    <li>
                        <Link to="#">WB.Tech</Link>
                    </li>
                </ul>

                <ul>
                    <h6>Мы в соцсетях</h6>
                    <li>
                        <Link to="#">ВКонтакте</Link>
                    </li>
                    <li>
                        <Link to="#">Одноклассники</Link>
                    </li>
                    <li>
                        <Link to="#">YouTube</Link>
                    </li>
                    <li>
                        <Link to="#">Телеграм</Link>
                    </li>
                </ul>

                <div className='footer__wrapper__contact'>

                    <img className='wildberriesQR' src="https://www.wildberries.ru/i/v3/apps/qr.png" alt="" />
                    <p>Наведите камеру, чтобы скачать приложение</p>
                    <span>
                        <Link to="#"><img src={Images.FooterApple} alt="" /></Link>
                        <Link to="#"><img src={Images.FooterGoogleplay} alt="" /></Link>
                        <Link to="#"><img src={Images.FooterHuawei} alt="" /></Link>
                    </span>
                </div>

            </div>
            <div className='footerPrava'>
                <p>2004-2023 © Wildberries — модный интернет-магазин одежды, обуви и аксессуаров. Все права защищены. Доставка по всей России.</p>
                <Link to="#">Проверка совместимости</Link>
            </div>
        </footer>
    )
}

export default Footer