import React, { useEffect } from 'react'
import { Link, useNavigate, NavLink } from "react-router-dom"
import "./Header.scss"
import { Icons, Images } from "../../../Config"
import { useDispatch, useSelector } from 'react-redux';
import { burgerModaToggleReducer, scrollSizeReducer, totalPriceReduce } from "../../../redux/Slices/wildSlice"
import { logoutReduce, checkAuth } from "../../../redux/Slices/adminSlice"
import { Toaster } from "react-hot-toast"
import axios from 'axios';
import _api, { API_URL } from '../../../http';
import DatalistInput from 'react-datalist-input';

const LNGUAGES = [
    {
        flag: Images.RusFlag,
        Valyuta: "RUB",
        ValyutaName: "Российский рубль"
    },
    {
        flag: Images.BelFlag,
        Valyuta: "BYN",
        ValyutaName: "Белорусский рубль"
    },
    {
        flag: Images.KirgizFlag,
        Valyuta: "KGZ",
        ValyutaName: "Киргизский сом"
    },
    {
        flag: Images.KzFlag,
        Valyuta: "RUB",
        ValyutaName: "Казахстанский тенге"
    },

]
function Header() {
    const wildberries = useSelector(state => state.wildberries)
    const admin = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        wildberries.cart.map((v) => {
            dispatch(totalPriceReduce(parseInt(v.price)))
        })
        if (localStorage.getItem("token")) {
            axios.get(`${API_URL}/refresh`, { withCredentials: true })
                .then((value) => {
                    dispatch(checkAuth(value.data))
                })
        }
    }, [])
    window.onscroll = function () {
        let scroll = window.pageYOffset;
        if (600 < scroll) {
            dispatch(scrollSizeReducer(true))
        }
        else {
            dispatch(scrollSizeReducer(false))
        }
    }
    return (
        <>
            <header id="top" className='header'>
                <div className="header__wrapper container1500">
                    <div className="header__wrapper__top">
                        <button className='headerLang'>
                            <img className='headerLangImg' src={Images.RusFlag} alt="" />
                            <span className='headerTitle' >RUB</span>

                            <div className="headerLanguageModal">
                                <div className="headerLanguageModal__top">
                                    <h3 className='headerLanguageModal__top__title'>Выберите валюту</h3>
                                </div>
                                <div className="headerLanguageModal__languages">
                                    {
                                        LNGUAGES.map((language, index) => {
                                            return (
                                                <span key={index} className='headerLanguageModal__languages__language'>
                                                    <img src={language.flag} alt="" />
                                                    <span>{language.Valyuta}</span>
                                                    <h5>{language.ValyutaName}</h5>
                                                    <span className='ActiveTick'></span>
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </button>

                        <button className='headerLocation' >
                            <img src={Images.Location} alt="" />
                            <span className='headerTitle'>Москва</span>
                        </button>

                        <Link to="#" className='saleWithWild'>Продавайте на Wildberries</Link>
                        <Link to="#" className='workInWild'>Работа в Wildberries</Link>
                    </div>

                    <div className="header__wrapper__bottom">
                        <span>  <button className='burger' onClick={() => {
                            dispatch(burgerModaToggleReducer(true))
                        }}><img src={Images.Burger} alt="" /></button>
                            <Link to="/" className='logo'><img src={Images.Logo} alt="" /></Link>
                        </span>
                        <div className="searchInput"  >
                            <i className='searchIcon' >
                                {Icons.Search}
                            </i>
                            <DatalistInput
                                placeholder="Я ищу..."
                                onSelect={(item) => console.log(item.value)}
                                items={[
                                    { id: 'джинсы', value: "джинсы" },
                                    { id: 'косметика', value: 'косметика' },
                                    { id: 'zarina', value: 'zarina' },
                                    { id: 'платье женское', value: 'платье женское' },
                                    { id: 'шуба', value: 'шуба' },
                                    { id: 'футболка', value: 'футболка' },
                                    { id: 'твое', value: 'твое' },
                                ]}
                            />
                            <i className='cameraIcon'>
                                {Icons.Camera}
                            </i>
                        </div>

                        <ul className='header__wrapper__bottom__rightMenu'>
                            <li>
                                <Link to="/services">
                                    <img src={Images.Location} alt="" />
                                    <p>Адресa</p>
                                </Link>
                            </li>

                            <li className='userCabinet' style={!admin.isAuth ? { display: "none" } : { display: "block" }}>
                                <Link to="/#" >
                                    <div className='userCabinetİcon'>
                                        {
                                            admin.userState?.username?.charAt()
                                        }
                                    </div>
                                    <p>Профиль</p>
                                </Link>
                                <div className='dropdownuserCabinet'>
                                    <div className="dropdownuserCabinet__content">
                                        <ul className='dropdownuserCabinet__content__list'>
                                            <li><Link to={`/cabinet/${admin.userState.id}`}>Кабинет {Icons.LoginUser}</Link> </li>
                                            <li><Link to="/favorite">Понравившиеся {Icons.FillHeart}</Link></li>
                                            <li><Link to={`/buyProducts/${admin.userState?.username}`}>Покупки <img src={Images.ProductsCabinet} alt="" /></Link> </li>
                                            <li><Link to="#">Настройки {Icons.Setting}</Link></li>
                                            <li style={admin.userState?.roles?.includes("USER") ? { display: "flex" } : { display: "none" }}>
                                                <Link to="/sellerRegistration">Начать продавать    {Icons.Sell}</Link>
                                            </li>
                                            <button onClick={() => {
                                                dispatch(logoutReduce())
                                                navigate("/")
                                            }}> <span>Выйти</span> {Icons.Logout}</button>
                                        </ul>

                                    </div>
                                </div>
                            </li>

                            <li style={admin.isAuth ? { display: "none" } : null}>
                                <Link to="/auth" >
                                    <img src={Images.User} alt="" />
                                    <p>Войти</p>
                                </Link>
                            </li>

                            <li className='cartBtn'>
                                <Link to="/cart">
                                    <img src={Images.Cart} alt="" />
                                    <p>Корзина</p>
                                </Link>
                                <span className='cartCount'>{wildberries.cart?.length}</span>
                                <div className='dropdownCart'>
                                    <div className="dropdownCart__content">
                                        <div className="dropdownCart__content__top">
                                            <div className={wildberries.cart?.length < 1 ? "dropdownCart__content__top__emptyCart" : "dropdownCartNone"}>
                                                <img src={Images.EmtyCart} alt="" />
                                            </div>
                                            <div className={wildberries.cart?.length > 0 ? "dropdownCart__content__top__products" : "dropdownCartNone"}>
                                                {
                                                    wildberries.cart.map((value, index) => {
                                                        return (
                                                            <div key={index} className="dropdownCart__content__top__products__product">
                                                                <div>
                                                                    <img src={value?.img} alt="" />
                                                                    <span>
                                                                        <h2>{value?.name}</h2>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <h3>{value?.price}</h3>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="dropdownCart__content__bottom">
                                            <span><h4>Итог</h4><h4>{wildberries.totalPrice} ₽</h4></span>
                                            <Link to="/cart">Перейти в корзину</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <ul className='header__wrapper__bottom__respRightMenu'>
                            <li>{Icons.World}</li>
                            <li><Link to="/services">{Icons.Location}</Link></li>
                            <li>{Icons.Search}</li>
                        </ul>
                    </div>

                    <div className="header__wrapper__respInput searchInput">
                        <i className='searchIcon' >
                            {Icons.Search}
                        </i>
                        <DatalistInput
                            placeholder="Я ищу..."
                            onSelect={(item) => console.log(item.value)}
                            items={[
                                { id: 'джинсы', value: "джинсы" },
                                { id: 'косметика', value: 'косметика' },
                                { id: 'zarina', value: 'zarina' },
                                { id: 'платье женское', value: 'платье женское' },
                                { id: 'шуба', value: 'шуба' },
                                { id: 'футболка', value: 'футболка' },
                                { id: 'твое', value: 'твое' },
                            ]}
                        />
                        <i className='cameraIcon'>
                            {Icons.Camera}
                        </i>
                    </div>
                </div>

                <section className="windowsBottom">
                    <NavLink to="/" className={({ isActive }) => isActive ? "activeLink" : null}>
                        <button className="windowsBottom__wishlist">{Icons.Home}</button>
                    </NavLink>
                    <NavLink to="/cc" className={({ isActive }) => isActive ? "activeLink" : null}>
                        <button className="windowsBottom__search"> {Icons.ListSearch} </button>
                    </NavLink>
                    <NavLink to="/cart" className={({ isActive }) => isActive ? "activeLink" : null}>
                        <button className="windowsBottom__wishlist">{Icons.CartFill}</button>
                    </NavLink>
                    <NavLink to="/favorite" className={({ isActive }) => isActive ? "activeLink" : null}>
                        <button className="windowsBottom__categories">{Icons.FillHeart}</button>
                    </NavLink>
                    <NavLink to="/auth" className={({ isActive }) => isActive ? "activeLink" : null}>
                        <button className="windowsBottom__account">{Icons.Username}</button>
                    </NavLink>
                </section>
            </header>

            <button onClick={() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                });
            }} className={wildberries.scrollSizeState ? "UpToTopActive" : "UpToTop"}>
                <span>{Icons.UpArrow}</span>

            </button>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    )
}

export default Header