import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const sellerLogin = createAsyncThunk<any, any>(
  "/auth/sellerLogin",
  async (loginRequest) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);
      console.log("signIn response", response.data);
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
    } catch (error) {
      console.log("error ---", error);
    }
  },
);
