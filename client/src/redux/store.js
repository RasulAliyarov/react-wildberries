import { configureStore } from "@reduxjs/toolkit"
import Wildberries from "./Slices/wildSlice"
import AdminSlice from "./Slices/adminSlice"
import CategorySlice from "./Slices/categorySlice"

export const store = configureStore({
    reducer: {
        wildberries: Wildberries.reducer,
        admin: AdminSlice.reducer,
        category: CategorySlice.reducer,
    }
})