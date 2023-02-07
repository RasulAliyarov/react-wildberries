import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Main/Home"
import Auth from "../pages/Main/Auth"
import Services from "../pages/Main/Services"
import Cart from "../pages/Main/Cart"
import AdminLogin from "../pages/Admin/AdminLogin"
import PageNotFound from "../pages/PageNotFound"
import AdminRoot from "../components/Admin/AdminRoot"
import MainRoot from "../components/Main/MainRoot"
import Users from "../pages/Admin/Users"
import Products from "../pages/Admin/Products"
import Sellers from "../pages/Admin/Sellers"

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
                    children:[
                        {
                            path: "products",
                            element: <Products />
                        },
                        {
                            path: "users",
                            element: <Users />
                        },
                        {
                            path: "sellers",
                            element: <Sellers />
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
