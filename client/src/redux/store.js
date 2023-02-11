import { configureStore } from "@reduxjs/toolkit"
import Wildberries from "./Slices/wildSlice"
import AdminSlice from "./Slices/adminSlice"

export const store = configureStore({
    reducer: {
        wildberries: Wildberries.reducer,
        admin: AdminSlice.reducer
    }
})