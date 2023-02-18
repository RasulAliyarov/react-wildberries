import { createSlice } from "@reduxjs/toolkit"

const wildSlice = createSlice({
    name: "wildberries",
    initialState: {
        scrollSizeState: false,
        productModalState: {
            state: false,
            productData: {}
        },
        accordionHeadinNumber: 0,
        favoriteState: [],
        sellerProducts: [],
        sellerDeleteProducts: [],
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
            state.productModalState.state = action.payload.state
            state.productModalState.productData = action.payload.productData
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
        deleteToCartByIdReducer: (state, action) => {
            const id = action.payload
            const cartData = JSON.parse(localStorage.getItem("Products"))
            const filtered = cartData.filter(item => item.id !== id);
            localStorage.removeItem('Products', JSON.stringify(filtered))

            state.cart = state.cart.filter(v => v.id !== id)
        },
        totalPriceReduce: (state, action) => {
            state.totalPrice += action.payload
        },
        favoriteReduce: (state, action) => {
            state.favoriteState = action.payload
        },
        sellerProductsReduce: (state, action) => {
            state.sellerProducts = action.payload
        },
        sellerDeleteProductsReduce: (state, action) => {
            state.sellerDeleteProducts = action.payload
        },
    },
})

export const {
    totalPriceReduce,
    addToCartReducer,
    favoriteReduce,
    deleteToCartReducer,
    deleteToCartByIdReducer,
    sellerProductsReduce,
    burgerModaToggleReducer,
    scrollSizeReducer,
    sellerDeleteProductsReduce,
    accordionChevronToggleReducer,
    accordionHeadinNumberReducer,
    productModalReducer } = wildSlice.actions
export default wildSlice