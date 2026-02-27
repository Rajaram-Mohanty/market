import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Wishlist, WishlistState } from "../../types/wishlistTypes";
import { api } from "../../config/api";


const initialState: WishlistState = {
    wishlist: null,
    loading: false,
    error: null,
};

export const getWishlistByUserId = createAsyncThunk<Wishlist, void>(
    "wishlist/getWishlistByUserId",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/api/wishlist", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("wishlist fetch ", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error ", error);
            return rejectWithValue(error.response.data.message || "Failed to fetch wishlist");
        }
    }
);

export const addProductToWishlist = createAsyncThunk<Wishlist, number>(
    "wishlist/addProductToWishlist",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/wishlist/add-product/${productId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("add product ", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to add product to wishlist");
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        resetWishlistState: (state) => {
            state.wishlist = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWishlistByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWishlistByUserId.fulfilled, (state, action: PayloadAction<Wishlist>) => {
                state.wishlist = action.payload;
                state.loading = false;
            })
            .addCase(getWishlistByUserId.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProductToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductToWishlist.fulfilled, (state, action: PayloadAction<Wishlist>) => {
                state.wishlist = action.payload;
                state.loading = false;
            })
            .addCase(addProductToWishlist.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;