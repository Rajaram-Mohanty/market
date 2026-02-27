import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../config/api";
import type { Product } from "../../types/productTypes";

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
  "/sellerProduct/fetchSellerProducts",
  async (jwt) => {
    try {
      const response = await api.get(
        "/seller/products",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      const data = response.data;
      console.log("data ----",data);
      return data;
    } catch (error) {
      console.log("error ----", error);
      throw error;
    }
  },
);

export const createProduct = createAsyncThunk<
  Product,
  { request: any; jwt: string }
>("sellerProduct/createProduct", async (args) => {
    const {request,jwt}=args
  try {
    const response = await api.post(
      "seller/products", request,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    console.log("response ----", response.data);
    return response.data;
  } catch (error) {
    console.log("error ----", error);
  }
});

interface SellerProductState {
    products: Product[];
    loading: boolean;
    error: string | null |undefined;

}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null,
}

const sellerProductSlice = createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSellerProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        builder.addCase(fetchSellerProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default sellerProductSlice.reducer
