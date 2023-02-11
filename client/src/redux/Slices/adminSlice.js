import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../http"
import AuthService from "../../Services/AuthService"

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isAuth: false,
        userState: {},
        isLoadingState: false,
        productsState: [],
        usersState: [],
        attentionState: false,
        yesNoState: "neitral",
        oneProductState: {},

    },
    reducers: {
        loginReduce: (state, action) => {
            try {
                localStorage.setItem('token', action.payload.accessToken);
                state.userState = action.payload.user;
                state.isAuth = true
            }
            catch (e) {
                console.log({ error: e })
            }
        },

        registrationReduce: (state, action) => {
            try {
                localStorage.setItem("token", action.payload.accessToken)
                state.isAuth = true
                state.userState = action.payload.user
            }
            catch (e) {
                console.log({ error: e })
            }
        },

        logoutReduce: (state, action) => {
            try {
                AuthService.logout().then(res => res.data);
                localStorage.removeItem("token");
                state.isAuth = false
                state.userState = {}
            }
            catch (e) {
                console.log({ error: e })
            }
        },

        checkAuth: (state, action) => {
            try {
                localStorage.setItem('token', action.payload.accessToken);
                state.userState = action.payload.user
                state.isAuth = true
            }
            catch (e) {
                console.log({ error: e })
            } finally {
                state.isLoadingState = false
            }
        },
        productsReduce: (state, action) => {
            state.productsState = action.payload
        },
        attentionReduce: (state, action) => {
            state.attentionState = action.payload
        },
        yesNoReduce: (state, action) => {
            state.yesNoState = action.payload
        },
        deleteProduct: (state, action) => {
            axios.update(`${API_URL}/deleteProduct/${action.payload}`)
        },
        oneProductReduce: (state, action) => {
            state.oneProductState = action.payload
        },
        isLoadingReduce: (state, action) => {
            state.isLoadingState = action.payload
        },
        usersStateReduce: (state, action) => {
            state.usersState = action.payload
        },
    },
})

export const {
    checkAuth,
    loginReduce,
    logoutReduce,
    registrationReduce,
    deleteProduct,
    productsReduce,
    attentionReduce,
    usersStateReduce,
    oneProductReduce,
    isLoadingReduce,
    deleteToCartReducer,
    yesNoReduce,
} = adminSlice.actions
export default adminSlice