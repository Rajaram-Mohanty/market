import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, API_URL } from "../../config/api";
import type { Product } from "../../types/productTypes";



// Async Thunk to fetch product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: any, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${productId}`);
      console.log("product details: ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const searchProduct = createAsyncThunk<any, any>(
  "products/searchProduct",
  async (query: any, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/search`, {
        params: {
          query,
        },
      });
      const data = response.data;
      console.log("search product data: ", data);
      return data;
    } catch (error: any) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

// Async Thunk to fetch all products with filters
export const fetchAllProducts = createAsyncThunk<any, any>(
  "products/fetchAllProducts",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products`, {
        params: {
          ...params,
          pageNumber: params.pageNumber || 0,
        },
      });
      console.log("all product data: ", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

interface ProductState {
  product: Product | null;
  products: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null | undefined;
  searchProduct: Product[];
}

const initialState: ProductState = {
  product: null,
  products: [],
  totalPages: 1,
  loading: false,
  error: null,
  searchProduct: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProduct = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export default productSlice.reducer;
