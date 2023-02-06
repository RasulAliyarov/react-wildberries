import { createBrowserRouter } from "react-router-dom"
import MainRooting from "../components/MainRooting"
import Home from "../pages/Home"
import Auth from "../pages/Auth"
import Services from "../pages/Services"
import Cart from "../pages/Cart"
export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainRooting />,
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
        }
    ]
) 
