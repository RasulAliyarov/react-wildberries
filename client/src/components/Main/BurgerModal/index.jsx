import React from 'react'
import "./BurgerModal.scss"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { burgerModaToggleReducer } from "../../../redux/Slices/wildSlice"
import { Icons, Images } from "../../../Config/index"
import { icons } from 'react-icons/lib';

function BurgerModal() {
    const wildberries = useSelector(state => state.wildberries)
    const dispatch = useDispatch()

    return (
        <div className={wildberries.burgerModalToggle ? "burgerModal " : "burgerModalUnCloseContent"}>
            <div className='burgerModal__background' onClick={() => {
                dispatch(burgerModaToggleReducer(false))
            }}></div>

            <div className={wildberries.burgerModalToggle ? "burgerModal__content" : null}>
                <button className='burgerModal__content__close' onClick={() => {
                    dispatch(burgerModaToggleReducer(false))
                }}>⨉</button>
                <ul className='burgerModal__content__list'>
                    <li >
                        <Link to="/productofcategory/Женщинам">{Icons.Woman} Женщинам</Link>
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
                        <Link to="/productofcategory/Обувь">{Icons.Shoes}Обувь</Link>
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
                        <Link to="/productofcategory/Детям">{Icons.Child}Детям</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Мужчинам">{Icons.Man}Мужчинам</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Дом">{Icons.Home}Дом</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Аксессуары">{Icons.Ring}Аксессуары</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Электроника">{Icons.Camera}Электроника</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Игрушки">{Icons.Toys}Игрушки</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Мебель">{Icons.Furnuture}Мебель</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Продукты">{Icons.Meat}Продукты</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Бытовая техника">{Icons.Blender}Бытовая техника</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Зоотовары">{Icons.Paw}Зоотовары</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Спорт">{Icons.SportsBaseball}Спорт</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Автотовары">{Icons.Car}Автотовары</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Книги">{Icons.Book}Книги</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Ювелирные изделия">{Icons.JewelCrown}Ювелирные изделия</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Для ремонта">{Icons.Drill}Для ремонта</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Канцтовары">{Icons.Office}Канцтовары</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Сад и дача">{Icons.Mountain}Сад и дача</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Здоровье">{Icons.Health}Здоровье</Link>
                    </li>
                    <li>
                        <Link to="/productofcategory/Путешествия">{Icons.World}Путешествия</Link>
                    </li>
               
                </ul>
            </div>
        </div>
    )
}

export default BurgerModal