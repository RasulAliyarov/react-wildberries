import { createSlice } from "@reduxjs/toolkit"

const wildSlice = createSlice({
    name: "wildberries",
    initialState: {
        searchInputToggle: false
    },
    reducers: {
        searchInput: (state, action) => {
            state.searchInputToggle = action.payload
        }
    }
})

export const { searchInput } = wildSlice.actions
export default wildSlice