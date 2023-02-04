import { configureStore } from "@reduxjs/toolkit"
import Wildberries from "./Slices/wildSlice"

export const store = configureStore({
    reducer: {
        wildberries: Wildberries.reducer
    }
})