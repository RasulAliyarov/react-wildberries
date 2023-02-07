import React from 'react'
import "./BurgerModal.scss"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { burgerModaToggleReducer } from "../../../redux/Slices/wildSlice"
import { Icons, Images } from "../../../Config/index"

function BurgerModal() {
    const wildberries = useSelector(state => state.wildberries)
    const dispatch = useDispatch()

    return (
        <div className={wildberries.burgerModalToggle ? "burgerModal " : "burgerModalUnVisible"}>
            <div className='burgerModal__background' onClick={() => {
                dispatch(burgerModaToggleReducer(false))
            }}>

            </div>

            <div className={wildberries.burgerModalToggle ? "burgerModal__content" : "burgerModalUnCloseContent"}>
                <button className='burgerModal__content__close' onClick={() => {
                    dispatch(burgerModaToggleReducer(false))
                }}>⨉</button>
                <ul className='burgerModal__content__list'>
                    <li >
                        <Link to="#">{Icons.Woman} Женщинам</Link>
                        <ul className='underList'>
                            <h4>Женщинам</h4>
                            <li className='underList__link'>
                                <Link to="#">Блузки и рубашки</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Брюки</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Верхняя одежда</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Джемперы, водолазки и кардиганы</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Джинсы</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Костюмы</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Лонгсливы</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Пиджаки, жилеты и жакеты</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Платья и сарафаны</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Толстовки, свитшоты и худи</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Туники</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Футболки и топыХалаты</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Халаты</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Шорты</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Юбки</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Белье</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Большие размеры</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Будущие мамы</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Для высоких</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Для невысоких</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Офис</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Пляжная мода</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Пляжная мода</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Свадьба</Link>
                            </li>
                        </ul>
                        <div className='underList__block'>
                            <div className='underList__block__content'>
                                <div className='underList__block__content__imgBox'>
                                    <img src="https://images.wbstatic.net/poster/ru/menuright1/c352x428/vypadashka_puhovik4995.jpg" alt="" />
                                </div>
                                <div>
                                    <h2>Пуховики</h2>
                                    <h5>женские</h5>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to="#">{Icons.Shoes}Обувь</Link>
                        <ul className='underList'>
                            <h4>Женщинам</h4>
                            <li className='underList__link'>
                                <Link to="#">Блузки и рубашки</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Брюки</Link>
                            </li>
                            <li className='underList__link'>
                                <Link to="#">Верхняя одежда</Link>
                            </li>


                        </ul>
                    </li>
                    <li>
                        <Link to="#">{Icons.Child}Детям</Link>
                    </li>
                    <li>
                        <Link to="#">Мужчинам</Link>
                    </li>
                    <li>
                        <Link to="#">Дом</Link>
                    </li>
                    <li>
                        <Link to="#">Красота</Link>
                    </li>
                    <li>
                        <Link to="#">Аксессуары</Link>
                    </li>
                    <li>
                        <Link to="#">Электроника</Link>
                    </li>
                    <li>
                        <Link to="#">Игрушки</Link>
                    </li>
                    <li>
                        <Link to="#">Мебель</Link>
                    </li>
                    <li>
                        <Link to="#">Товары для взрослых</Link>
                    </li>
                    <li>
                        <Link to="#">Продукты</Link>
                    </li>
                    <li>
                        <Link to="#">Бытовая техника</Link>
                    </li>
                    <li>
                        <li>
                            <Link to="#">Зоотовары</Link>
                        </li>
                        <Link to="#">Спорт</Link>
                    </li>
                    <li>
                        <Link to="#">Автотовары</Link>
                    </li>
                    <li>
                        <Link to="#">Книги</Link>
                    </li>
                    <li>
                        <Link to="#">Premium</Link>
                    </li>
                    <li>
                        <Link to="#">Ювелирные изделия</Link>
                    </li>
                    <li>
                        <Link to="#">Для ремонта</Link>
                    </li>
                    <li>
                        <Link to="#">Сад и дача</Link>
                    </li>
                    <li>
                        <Link to="#">Здоровье</Link>
                    </li>
                    <li>
                        <Link to="#">Канцтовары</Link>
                    </li>
                    <li>
                        <Link to="#">Цифровые товары</Link>
                    </li>
                    <li>
                        <Link to="#">Акции</Link>
                    </li>
                    <li>
                        <Link to="#">Сделано в Москве</Link>
                    </li>
                    <li>
                        <Link to="#">Путешествия</Link>
                    </li>
                    <li>
                        <Link to="#">Бренды</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BurgerModal