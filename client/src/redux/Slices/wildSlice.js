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
        buyProducts: [],
        userData: {},
        sellerDeleteProducts: [],
        accordionChevronToggle: false,
        burgerModalToggle: false,
        totalPrice: 0,
        cart: localStorage.getItem("Products") ? JSON.parse(localStorage.getItem("Products")) : [],
        imageUrl: ""
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
            let id = action.payload;
            const filtered = state.cart.filter(item => item.id !== id);
            state.cart = filtered;
            localStorage.setItem("Products", JSON.stringify(state.cart));

            state.totalPrice -= filtered.price
        },
        totalPriceReduce: (state, action) => {
            console.log(action.payload)
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
        imageUrlReduce: (state, action) => {
            state.imageUrl = action.payload
        },
        userDataReduce: (state, action) => {
            state.userData = action.payload
        },
        buyProductsReduce: (state, action) => {
            state.buyProducts = action.payload
        },
    },
})

export const {
    totalPriceReduce,
    addToCartReducer,
    favoriteReduce,
    imageUrlReduce,
    deleteToCartReducer,
    deleteToCartByIdReducer,
    sellerProductsReduce,
    burgerModaToggleReducer,
    buyProductsReduce,
    scrollSizeReducer,
    userDataReduce,
    sellerDeleteProductsReduce,
    accordionChevronToggleReducer,
    accordionHeadinNumberReducer,
    productModalReducer } = wildSlice.actions
export default wildSlice