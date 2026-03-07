import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const sellerLogin = createAsyncThunk<any, any>(
  "/auth/sellerLogin",
  async (loginRequest) => {
    try {
      const { email, otp, navigate } = loginRequest;
      const response = await api.post("/sellers/login", { email, otp });
      console.log("signIn response", response.data);
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("role", "ROLE_SELLER");
      if (navigate) {
        navigate("/seller");
      }
    } catch (error) {
      console.log("error ---", error);
    }
  },
);
