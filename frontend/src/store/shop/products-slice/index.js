import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    productList : [],
    productDetails : null
}


export const fetchAllFilterdProducts = createAsyncThunk(
    '/products/fetchAllFIlterdProducts',
    async ({filterParams, sortParams}) => { //pass the filter from backend and set url 

        const query = new URLSearchParams({ //filter part
            ...filterParams,
            sortBy : sortParams
        })

        const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`,
        )
        return result?.data;
    }
 )


 export const fetchProductDetails = createAsyncThunk(
    '/products/fetchProductDetails',
    async (id) => { //pass the filter from backend and set url 

        

        const result = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`,
        )
        return result?.data;
    }
 )


const shoppingProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(fetchAllFilterdProducts.pending,(state,action)=>{
            state.isLoading = true
        }).addCase(fetchAllFilterdProducts.fulfilled,(state,action)=>{
            console.log(action.payload);
            
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(fetchAllFilterdProducts.rejected,(state,action)=>{
            console.log(action.payload);
            
            state.isLoading = false
            state.productList = []
        })
        
        .addCase(fetchProductDetails.pending,(state,action)=>{
            state.isLoading = true
        }).addCase(fetchProductDetails.fulfilled,(state,action)=>{
            console.log(action.payload);
            
            state.isLoading = false
            state.productDetails = action.payload.data
        }).addCase(fetchProductDetails.rejected,(state,action)=>{
            console.log(action.payload);
            
            state.isLoading = false
            state.productDetails = null
        })
    }
})

export default shoppingProductSlice.reducer