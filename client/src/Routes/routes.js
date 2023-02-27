import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Main/Home"
import Auth from "../pages/Main/Auth"
import Services from "../pages/Main/Services"
import Cart from "../pages/Main/Cart"
import Buy from "../pages/Main/Buy"
import AdminLogin from "../pages/Admin/AdminLogin"
import ProductDetail from "../pages/Admin/ProductDetail"
import Detail from "../pages/Main/Detail"
import PageNotFound from "../pages/PageNotFound"
import AdminRoot from "../components/Admin/AdminRoot"
import MainRoot from "../components/Main/MainRoot"
import AddProduct from "../pages/Main/Cabinet/AddProduct"
import EditInfo from "../pages/Main/Cabinet/EditInfo"
import DeleteProducts from "../pages/Main/Cabinet/DeleteProducts"
import EditProduct from "../pages/Main/Cabinet/EditProduct"
import SellsProducts from "../pages/Main/Cabinet/SellsProducts"
import SellerProducts from "../pages/Main/Cabinet/SellerProducts"
import CabinetRoot from "../pages/Main/Cabinet/CabinetRoot"
import Users from "../pages/Admin/Users"
import Products from "../pages/Admin/Products"
import Sellers from "../pages/Admin/Sellers"
import StartSell from "../pages/Sellers/StartSell"
import Favorite from "../pages/Main/Favorite"
import Categories from "../pages/Admin/Categories"
import BuyProducts from "../pages/Main/BuyProducts"
import UserDetail from "../pages/Admin/UserDetail"
import ProductOfCategory from "../pages/Main/ProductOfCategory"

export const router = createBrowserRouter(
    [
        // MAIN PAGE
        {
            path: "/",
            element: <MainRoot />,
            children: [
                {
                    path: "",
                    element: <Home />
                },
                {
                    path: "auth",
                    element: <Auth />
                },
                {
                    path: "services",
                    element: <Services />
                },
                {
                    path: "cart",
                    element: <Cart />
                },
                {
                    path: "detail/:id",
                    element: <Detail />
                },
                {
                    path: "favorite",
                    element: <Favorite />
                },
                {
                    path: "productofcategory/:name",
                    element: <ProductOfCategory />
                },
                {
                    path: "sellerRegistration",
                    element: <StartSell />
                },
                {
                    path: "buyProducts/:userName",
                    element: <BuyProducts />
                },
                {
                    path: "buy/:id",
                    element: <Buy />
                },
                {
                    path: "buy",
                    element: <Buy />
                },
                {
                    path: "cabinet/:id",
                    element: <CabinetRoot />,
                    children: [
                        {
                            path: "",
                            element: <SellerProducts />,
                        },
                        {
                            path: "addProduct",
                            element: <AddProduct />
                        },
                        {
                            path: "editInfo",
                            element: <EditInfo />
                        },
                        {
                            path: "deleteProducts",
                            element: <DeleteProducts />
                        },
                        {
                            path: "sellProducts",
                            element: <SellsProducts />
                        },
                        {
                            path: "editProduct/:id",
                            element: <EditProduct />
                        },
                    ]
                },

            ]
        },


        // ADMIN
        {
            path: "/admin/",
            children: [
                {
                    path: "/admin/",
                    element: <PageNotFound />
                },
                {
                    path: "login",
                    element: <AdminLogin />
                },
                {
                    path: "panel/",
                    element: <AdminRoot />,
                    children: [
                        {
                            path: "products/",
                            element: <Products />,
                        },
                        {
                            path: "products/:id",
                            element: <ProductDetail />
                        },
                        {
                            path: "users",
                            element: <Users />
                        },
                        {
                            path: "user/:id",
                            element: <UserDetail />
                        },
                        {
                            path: "sellers",
                            element: <Sellers />
                        },
                        {
                            path: "categories",
                            element: <Categories />
                        },
                    ]
                },
            ]
        },


        // NOT FOUND
        {
            path: "*",
            element: <PageNotFound />
        },
    ]
) 
