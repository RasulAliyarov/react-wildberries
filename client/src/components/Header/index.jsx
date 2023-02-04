import React from 'react'
import { Link } from "react-router-dom"
import "./Header.scss"
import { Icons, Images } from "../../Config"
import { useDispatch, useSelector } from 'react-redux';
import { searchInput } from "../../redux/Slices/wildSlice"

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
    console.log(wildberries)

    return (
        <>
            <header className='header'>
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

                        <button className='headerLocation' onClick={() => {
                            dispatch(searchInput("slalala"))

                        }}>
                            <img src={Images.Location} alt="" />
                            <span className='headerTitle'>Москва</span>
                        </button>

                        <Link to="#" className='saleWithWild'>Продавайте на Wildberries</Link>
                        <Link to="#" className='workInWild'>Работа в Wildberries</Link>
                    </div>

                    <div className="header__wrapper__bottom">
                        <button className='burger'><img src={Images.Burger} alt="" /></button>
                        <Link to="/" className='logo'><img src={Images.Logo} alt="" /></Link>

                        <div className={wildberries.searchInputToggle ? "changeSvgColor searchInput" : "searchInput"} >
                            <span className='searchIcon'>
                                {Icons.Search}
                            </span>
                            <input type="text" placeholder='Я ищу...' onClick={() => {
                                dispatch(searchInput(!wildberries.searchInputToggle))
                            }} />
                            <span className='cameraIcon' >
                                {Icons.Camera}
                            </span>

                            <div className={wildberries.searchInputToggle ? "seacrchInputBody" : ""}>

                            </div>
                        </div>

                        <ul>
                            <li>
                                <button>
                                    <img src={Images.Location} alt="" />
                                    <p>Адресa</p>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <img src={Images.User} alt="" />
                                    <p>Войти</p>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <img src={Images.Cart} alt="" />
                                    <p>Корзина</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <Link to="/" >Home</Link>
                    <Link to="/auth">Auth</Link> */}
            </header>
        </>
    )
}

export default Header