import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { sellerLogin } from "../../../state/seller/sellerAuthSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth } = useAppSelector((store) => store);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(sellerLogin({ email: values.email, password: values.password, navigate }));
    },
  });

  return (
    <div className="space-y-5">
      <h1 className="text-center font-bold text-xl text-primary-color pb-5">
        Login as a Seller
      </h1>

      {auth.error && (
        <Alert severity="error">
          {typeof auth.error === "string" ? auth.error : "Invalid email or password."}
        </Alert>
      )}

      <TextField
        fullWidth
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        onClick={() => formik.handleSubmit()}
        fullWidth
        variant="contained"
        sx={{ py: "11px", my: 2 }}
        disabled={auth.loading}
      >
        {auth.loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </div>
  );
};

export default SellerLoginForm;
