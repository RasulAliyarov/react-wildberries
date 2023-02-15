import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../http"
import AuthService from "../../Services/AuthService"

const adminSlice = createSlice({
    name: "category",
    initialState: {
        categoriesState: []
    },
    reducers: {
        categoriesReduce: (state, action) => {
            state.categoriesState = action.payload
        }
    },
})

export const {
    categoriesReduce,
} = adminSlice.actions
export default adminSlice