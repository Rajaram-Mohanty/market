import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const fetchSellerProfile = createAsyncThunk(
  "/sellers/fetchSellerProfile", //standard practice is to keep the string same as the api endpoint
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch seller profile", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch seller profile",
      );
    }
  },
);

export const becomeSeller = createAsyncThunk<any, any>(
  "/sellers/becomeSeller",
  async (sellerData, { rejectWithValue }) => {
    try {
      const { formData, navigate } = sellerData;
      const response = await api.post("/sellers", formData);
      console.log("become seller", response.data);
      const jwt = response.data.jwt;
      if (jwt) {
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("role", "ROLE_SELLER");
        if (navigate) {
          navigate("/seller");
        }
      }
      return response.data;
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(error.response?.data || "Failed to create seller");
    }
  },
);

interface SellerState {
  sellers: any[];
  selectedSeller: any;
  profile: any;
  report: any;
  loading: boolean;
  error: any;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellerProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSellerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(fetchSellerProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(becomeSeller.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(becomeSeller.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload; // Store the newly created seller profile, if applicable
    });
    builder.addCase(becomeSeller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default sellerSlice.reducer;
