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
        counterState: 1,
        userData: {},
        productForBuyState: {},
        sellerDeleteProducts: [],
        accordionChevronToggle: false,
        respCabinetNavToggle: false,
        respSearchToggle: false,
        burgerModalToggle: false,
        respCabinetToggle: false,
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
            state.counterState = 1
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
            let id = action.payload.id;
            const filtered = state.cart.filter(item => item.id !== id);
            state.cart = filtered;
            localStorage.setItem("Products", JSON.stringify(state.cart));

            state.totalPrice -= action.payload.price * action.payload.count
        },
        totalPriceReduce: (state, action) => {
            console.log(action)
            state.totalPrice += action.payload.price * action.payload.count
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
        respCabinetReduce: (state, action) => {
            state.respCabinetToggle = action.payload
        },
        respCabinetNavReduce: (state, action) => {
            state.respCabinetNavToggle = action.payload
        },
        counterIncReduce: (state, action) => {
            state.counterState += action.payload
        },
        counterDecReduce: (state, action) => {
            if (state.counterState <= 1) {
                state.counterState = 1
                return
            }
            state.counterState -= action.payload
        },
        counterReduce: (state, action) => {
            state.counterState = action.payload
        },
        productForBuyReduce: (state, action) => {
            state.productForBuyState = action.payload
        },
        respSearchReduce: (state, action) => {
            state.respSearchToggle = action.payload
        },
    },
})

export const {
    totalPriceReduce,
    addToCartReducer,
    favoriteReduce,
    respCabinetReduce,
    respSearchReduce,
    productForBuyReduce,
    imageUrlReduce,
    counterDecReduce,
    deleteToCartReducer,
    counterReduce,
    deleteToCartByIdReducer,
    sellerProductsReduce,
    counterIncReduce,
    burgerModaToggleReducer,
    buyProductsReduce,
    scrollSizeReducer,
    userDataReduce,
    respCabinetNavReduce,
    sellerDeleteProductsReduce,
    accordionChevronToggleReducer,
    accordionHeadinNumberReducer,
    productModalReducer } = wildSlice.actions
export default wildSlice