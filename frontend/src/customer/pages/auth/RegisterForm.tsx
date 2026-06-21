import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  CircularProgress,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { signup } from "../../../state/authSlice";

const validationSchema = Yup.object({
  fullName: Yup.string().min(2, "Name must be at least 2 characters").required("Full name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as any)?.from?.pathname || "/";
  const { auth } = useAppSelector((store) => store);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { fullName: "", email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signup({ data: values, navigate, redirectTo }));
    },
  });

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Register
      </h1>

      <div className="space-y-5">
        {auth.error && (
          <Alert severity="error">
            {typeof auth.error === "string" ? auth.error : "Registration failed. Please try again."}
          </Alert>
        )}

        <TextField
          fullWidth
          name="fullName"
          label="Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />

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
          sx={{ py: "11px", my: 1 }}
          disabled={auth.loading}
        >
          {auth.loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
