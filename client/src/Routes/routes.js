import { createBrowserRouter } from "react-router-dom"
import MainRooting from "../components/MainRooting"
import Home from "../pages/Home"
import Auth from "../pages/Auth"
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
                }
            ]
        }
    ]
) 