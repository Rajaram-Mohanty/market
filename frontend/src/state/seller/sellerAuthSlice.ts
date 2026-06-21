import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const sellerLogin = createAsyncThunk<any, any>(
  "/auth/sellerLogin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const { email, password, navigate } = loginRequest;
      const response = await api.post("/sellers/login", { email, password });
      console.log("signIn response", response.data);
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("role", "ROLE_SELLER");
      if (navigate) {
        navigate("/seller");
      }
    } catch (error: any) {
      console.log("error ---", error);
      return rejectWithValue(error.response?.data || "Failed to log in as seller");
    }
  },
);
