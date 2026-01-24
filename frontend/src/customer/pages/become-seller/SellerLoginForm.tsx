import React from "react";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";

const SellerLoginForm = () => {
  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    onSubmit: (values) => {
      console.log("Login Values", values);
    },
  });

  return (
    <div className="space-y-5">
      <h1 className="text-center font-bold text-xl text-primary-color pb-5">
        Login as a Seller
      </h1>
      
      <div>
        <TextField
        fullWidth
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      </div>

      {true && (
        <div className="space-y-2">
          <p className="font-medium text-sm opacity-60">Enter OTP sent to your email</p>
          <TextField
            fullWidth
            name="otp"
            label="Enter OTP"
            value={formik.values.otp}
            onChange={formik.handleChange}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
          />
        </div>
      )}

      <Button
        fullWidth
        variant="contained"
        sx={{ py: "11px" }}
        onClick={() => formik.handleSubmit()}
      >
        Login
      </Button>
    </div>
  );
};

export default SellerLoginForm;
