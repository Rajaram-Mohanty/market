import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../config/api";
import type { Product } from "../../types/productTypes";

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
  "/sellerProduct/fetchSellerProducts",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/seller/products", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = response.data;
      console.log("data ----", data);
      return data;
    } catch (error: any) {
      console.log("error ----", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch seller products",
      );
    }
  },
);

export const createProduct = createAsyncThunk<
  Product,
  { request: any; jwt: string }
>("sellerProduct/createProduct", async (args, { rejectWithValue }) => {
  const { request, jwt } = args;
  try {
    const response = await api.post("seller/products", request, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("response ----", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error ----", error);
    return rejectWithValue(error.response?.data || "Failed to create product");
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  { productId: number; request: any }
>(
  "sellerProduct/updateProduct",
  async ({ productId, request }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/seller/products/${productId}`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("update response ----", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ----", error);
      return rejectWithValue(
        error.response?.data || "Failed to update product",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk<number, number>(
  "sellerProduct/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`/seller/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("delete response ----", productId);
      return productId;
    } catch (error: any) {
      console.log("error ----", error);
      return rejectWithValue(
        error.response?.data || "Failed to delete product",
      );
    }
  },
);

interface SellerProductState {
  products: Product[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: SellerProductState = {
  products: [],
  loading: false,
  error: null,
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Products
    builder.addCase(fetchSellerProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchSellerProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Create Product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update Product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete Product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default sellerProductSlice.reducer;
