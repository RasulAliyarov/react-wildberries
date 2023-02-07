import { createSlice } from "@reduxjs/toolkit"

const wildSlice = createSlice({
    name: "wildberries",
    initialState: {
        searchInputState: false,
        scrollSizeState: false,
        productModalState: false,
        accordionHeadinNumber: 0,
        accordionChevronToggle: false,
        burgerModalToggle: false,
        cart: []
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
        },
    }
})

export const { searchInputReducer, addToCartReducer, deleteToCartReducer, burgerModaToggleReducer, scrollSizeReducer, accordionChevronToggleReducer, accordionHeadinNumberReducer, productModalReducer } = wildSlice.actions
export default wildSlice