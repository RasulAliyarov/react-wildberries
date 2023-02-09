import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../http"
import AuthService from "../../Services/AuthService"

const wildSlice = createSlice({
    name: "wildberries",
    initialState: {
        searchInputState: false,
        scrollSizeState: false,
        productModalState: false,
        accordionHeadinNumber: 0,
        accordionChevronToggle: false,
        burgerModalToggle: false,
        totalPrice: 0,
        cart: localStorage.getItem("Products") ? JSON.parse(localStorage.getItem("Products")) : [],
        isAuth: false,
        user: {}
    },
    reducers: {
        searchInputReducer: (state, action) => {
            state.searchInputState = action.payload
        },
        scrollSizeReducer: (state, action) => {
            state.scrollSizeState = action.payload
        },
        productModalReducer: (state, action) => {
            state.productModalState = action.payload
        },
        accordionHeadinNumberReducer: (state, action) => {
            state.accordionHeadinNumber = action.payload
        },
        accordionChevronToggleReducer: (state, action) => {
            state.accordionChevronToggle = action.payload
        },
        burgerModaToggleReducer: (state, action) => {
            state.burgerModalToggle = action.payload
        },
        addToCartReducer: (state, action) => {
            state.cart.push(action.payload)
        },
        deleteToCartReducer: (state, action) => {
            state.cart = []
            state.totalPrice = 0
            localStorage.removeItem("Products")
        },

        totalPriceReduce: (state, action) => {
            state.totalPrice += action.payload
        },

        loginReduce: (state, action) => {
            try {
                const response = AuthService.login(action.payload.username, action.payload.password).then(res => res.data);
                console.log(response, "responce")
                localStorage.setItem("token", response.accessToken)
                state.isAuth = true
                state.user = response.user /////////?????
                return
            }
            catch (e) {
                console.log({ error: e.response })
            }
        },
        registrationReduce: (state, action) => {
            try {
                const response = AuthService.registration(
                    action.payload.fullname,
                    action.payload.phonenumber,
                    action.payload.email,
                    action.payload.username,
                    action.payload.password,
                    action.payload.repeatpassword);
                localStorage.setItem("token", response.data.accessToken)
                state.isAuth = true
                state.user = response.data.user /////////?????
            }
            catch (e) {
                console.log(e.response?.data?.message)
            }
        },

        logoutReduce: (state, action) => {
            try {
                const response = AuthService.logout();
                localStorage.removeItem("token");
                state.isAuth = false
                state.user = {} /////////?????
            }
            catch (e) {
                console.log(e.response?.data?.message)
            }
        },

        checkAuth: (state, action) => {
            try {
                const response = axios.get(`#${API_URL}/refresh`, { withCredentials: true })

                localStorage.setItem("token", JSON.stringify(response.data.accessToken))
                state.isAuth = true
                state.user = response.data.user /////////?????
            }
            catch (e) {
                console.log(e.response?.data?.message)
            }
        }
    },
})

export const { searchInputReducer, checkAuth, loginReduce, registrationReduce, totalPriceReduce, addToCartReducer, deleteToCartReducer, burgerModaToggleReducer, scrollSizeReducer, accordionChevronToggleReducer, accordionHeadinNumberReducer, productModalReducer } = wildSlice.actions
export default wildSlice