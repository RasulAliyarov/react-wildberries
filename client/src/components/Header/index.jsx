import React, { useRef } from 'react'
import { Link } from "react-router-dom"
import "./Header.scss"
import { Icons, Images } from "../../Config"
import { useDispatch, useSelector } from 'react-redux';
import { searchInputReducer, burgerModaToggleReducer,scrollSizeReducer } from "../../redux/Slices/wildSlice"

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
    const dispatch = useDispatch()

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
                        <button className='burger' onClick={()=>{
                            dispatch(burgerModaToggleReducer(true))
                        }}><img src={Images.Burger} alt="" /></button>
                        <Link to="/" className='logo'><img src={Images.Logo} alt="" /></Link>

                        <div className={wildberries.searchInputState ? "changeSvgColor searchInput" : "searchInput"} >
                            <span className='searchIcon'>
                                {Icons.Search}
                            </span>
                            <input type="text" placeholder='Я ищу...' onClick={() => {
                                dispatch(searchInputReducer(!wildberries.searchInputState))
                            }} />
                            <span className='cameraIcon' >
                                {Icons.Camera}
                            </span>

                            <div className={wildberries.searchInputState ? "seacrchInputBody" : ""}>

                            </div>
                        </div>

                        <ul>
                            <li>
                                <Link to="/services">
                                    <img src={Images.Location} alt="" />
                                    <p>Адресa</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/auth">
                                    <img src={Images.User} alt="" />
                                    <p>Войти</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                    <img src={Images.Cart} alt="" />
                                    <p>Корзина</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
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
        </>
    )
}

export default Header