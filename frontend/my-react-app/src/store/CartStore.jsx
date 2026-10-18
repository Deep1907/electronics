import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./CartSlice.jsx"

const reduxStore = configureStore({
    reducer : {
        cart : cartReducer
    }
})

export default reduxStore;