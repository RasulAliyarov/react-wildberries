import { createSlice } from "@reduxjs/toolkit"

const wildSlice = createSlice({
    name: "wildberries",
    initialState: {
        scrollSizeState: false,
        productModalState: false,
        accordionHeadinNumber: 0,
        accordionChevronToggle: false,
        burgerModalToggle: false,
        totalPrice: 0,
        cart: localStorage.getItem("Products") ? JSON.parse(localStorage.getItem("Products")) : [],
  
    },
    reducers: {
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
    },
})

export const { 
    totalPriceReduce,
    addToCartReducer,
    deleteToCartReducer,
    burgerModaToggleReducer,
    scrollSizeReducer,
    accordionChevronToggleReducer,
    accordionHeadinNumberReducer,
    productModalReducer } = wildSlice.actions
export default wildSlice