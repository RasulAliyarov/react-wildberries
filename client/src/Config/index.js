import { ImLocation } from "react-icons/im";
import {
    MdOutlinePhotoCamera, MdBlender, MdOutlineSportsBaseball,
    MdSell, MdOutlineAlternateEmail, MdOutlineChildFriendly,
    MdAppRegistration, MdOutlineSearch, MdPassword, MdOutlineHealthAndSafety
} from "react-icons/md";
import {
    AiOutlineArrowUp, AiOutlineMan, AiOutlineCar,
    AiFillDelete, AiFillHeart, AiOutlineAlignRight, AiOutlineWoman, AiOutlineHeart, AiFillStar
} from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GiConverseShoe,GiBigDiamondRing, GiDrill, GiJewelCrown, GiSmartphone, GiPostStamp, GiHamburgerMenu } from "react-icons/gi";
import { CgLogIn } from "react-icons/cg";
import { HiUserCircle, HiHome } from "react-icons/hi";
import { GrContactInfo } from "react-icons/gr";
import { FaUserCircle, FaPaw, FaMoneyBillWave } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { TbWorld,TbMountain, TbArmchair } from "react-icons/tb";
import { BsFillCartFill, BsBook } from "react-icons/bs";
import { TiArrowUnsorted } from "react-icons/ti";
import { TbListSearch, TbMeat } from "react-icons/tb";
import { RiBearSmileLine, RiPencilRuler2Line } from "react-icons/ri";

import RusFlag from "../images/Flags/RusFlag.svg"
import BelFlag from "../images/Flags/BelFlag.svg"
import KzFlag from "../images/Flags/KzFlag.svg"
import UzbFlag from "../images/Flags/UzbFlag.png"
import KirgizFlag from "../images/Flags/KirgizFlag.svg"
import Flaer1 from "../images/Flaer/Flaer1.jpg"
import Flaer4 from "../images/Flaer/Flaer4.jpg"
import Flaer3 from "../images/Flaer/Flaer3.jpg"
import Flaer5 from "../images/Flaer/Flaer5.jpg"
import Flaer6 from "../images/Flaer/Flaer6.jpg"
import Flaer7 from "../images/Flaer/Flaer7.jpg"
import Flaer8 from "../images/Flaer/Flaer8.jpg"
import Flaer9 from "../images/Flaer/Flaer9.jpg"
import HowDoOrder1 from "../images/Services/HowDoOrder1.jpg"
import HowDoOrder2 from "../images/Services/HowDoOrder2.jpg"
import HowDoOrder3 from "../images/Services/HowDoOrder3.jpg"
import HowDoOrder4 from "../images/Services/HowDoOrder4.jpg"
import HowDoOrder5 from "../images/Services/HowDoOrder5.jpg"
import HowDoOrder6 from "../images/Services/HowDoOrder6.jpg"
import HowDoOrder7 from "../images/Services/HowDoOrder7.jpg"
import HowDoOrder8 from "../images/Services/HowDoOrder8.jpg"
import NotFound from "../images/NotFound.gif"
import CartEmpty from "../images/CartEmpty.gif"
import SSCongrat from "../images/SSCongrat.gif"

import ProductsCabinet from "../images/GoodsIcons/Products.png"

import Location from "../images/Icons/Location.svg"
import Logo from "../images/Logo.png"
import Burger from "../images/Icons/Burger.svg"
import User from "../images/Icons/User.svg"
import FooterHuawei from "../images/Icons/FooterHuawei.svg"
import Cart from "../images/Icons/Cart.svg"
import FooterApple from "../images/Icons/FooterApp.png"
import FooterGoogleplay from "../images/Icons/FooterGoogleplay.png"
import Drone from "../images/Drone.png"
import Cancel from "../images/Cancel.gif"
import Success from "../images/SuccessTick.gif"
import Loader from "../images/Loader.gif"
import Login from "../images/Login.gif"
import StartSeller from "../images/StartSeller.gif"

import Shop from "../images/Icons/Shop.png"
import Users from "../images/Icons/Users.png"
import Products from "../images/Icons/Products.png"

import WbAdmin from "../images/WbAdmin.png"
import EmtyCart from "../images/EmtyCart.png"
import FavoriteBG from "../images/Favorite.png"

export const Icons = {
    Location: <ImLocation />,
    Camera: <MdOutlinePhotoCamera />,
    Search: <MdOutlineSearch />,
    UpArrow: <AiOutlineArrowUp />,
    UpChevron: <FiChevronUp />,
    DownChevron: <FiChevronDown />,
    OutlineHeart: <AiOutlineHeart />,
    FillHeart: <AiFillHeart />,
    FillStar: <AiFillStar />,
    Shoes: <GiConverseShoe />,
    Woman: <AiOutlineWoman />,
    Child: <MdOutlineChildFriendly />,
    Login: <CgLogIn />,
    Registrtion: <MdAppRegistration />,
    Password: <MdPassword />,
    Username: <HiUserCircle />,
    Email: <MdOutlineAlternateEmail />,
    Phone: <GiSmartphone />,
    Fullname: <GrContactInfo />,
    Navigation: <AiOutlineAlignRight />,
    Delete: <AiFillDelete />,
    LoginUser: <FaUserCircle />,
    Setting: <IoMdSettings />,
    Logout: <BiLogOut />,
    World: <TbWorld />,
    PostStamp: <GiPostStamp />,
    CartFill: <BsFillCartFill />,
    Sort: <TiArrowUnsorted />,
    Sell: <MdSell />,
    ListSearch: <TbListSearch />,
    Home: <HiHome />,
    HamburgerMenu: <GiHamburgerMenu />,
    Dollar: <FaMoneyBillWave />,
    Man: <AiOutlineMan />,
    Toys: <RiBearSmileLine />,
    Furnuture: <TbArmchair />,
    Meat: <TbMeat />,
    Blender: <MdBlender />,
    Paw: <FaPaw />,
    SportsBaseball: <MdOutlineSportsBaseball />,
    Car: <AiOutlineCar />,
    Book: <BsBook />,
    JewelCrown: <GiJewelCrown />,
    Drill: <GiDrill />,
    Office: <RiPencilRuler2Line />,
    Health: <MdOutlineHealthAndSafety />,
    Mountain: <TbMountain />,
    Ring: <GiBigDiamondRing />,
}


export const Images = {
    RusFlag: RusFlag,
    BelFlag: BelFlag,
    KirgizFlag: KirgizFlag,
    UzbFlag: UzbFlag,
    KzFlag: KzFlag,

    Location: Location,
    Logo: Logo,
    Burger: Burger,
    User: User,
    Cart: Cart,

    Flaer1: Flaer1,
    Flaer3: Flaer3,
    Flaer4: Flaer4,
    Flaer5: Flaer5,
    Flaer6: Flaer6,
    Flaer7: Flaer7,
    Flaer8: Flaer8,
    Flaer9: Flaer9,

    FooterApple: FooterApple,
    FooterGoogleplay: FooterGoogleplay,
    FooterHuawei: FooterHuawei,

    HowDoOrder1: HowDoOrder1,
    HowDoOrder2: HowDoOrder2,
    HowDoOrder3: HowDoOrder3,
    HowDoOrder4: HowDoOrder4,
    HowDoOrder5: HowDoOrder5,
    HowDoOrder6: HowDoOrder6,
    HowDoOrder7: HowDoOrder7,
    HowDoOrder8: HowDoOrder8,

    Drone: Drone,
    WbAdmin: WbAdmin,
    Shop: Shop,
    Users: Users,
    Products: Products,
    NotFound: NotFound,
    CartEmpty: CartEmpty,
    ProductsCabinet: ProductsCabinet,
    EmtyCart: EmtyCart,
    Cancel: Cancel,
    Success: Success,
    Loader: Loader,
    Login: Login,
    StartSeller: StartSeller,
    SSCongrat: SSCongrat,
    FavoriteBG: FavoriteBG,
}