import { Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { sendLoginSignupOtp } from "../../../state/authSlice";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { signup } from "../../../state/authSlice";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { auth } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: { email: "", otp: "", fullName: "" },
    onSubmit: (values) => {
      console.log("form data", values);
      dispatch(signup({ data: values, navigate }));
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Register
      </h1>

      <div className="space-y-5">
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

        {auth.otpSent && (
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="font-medium text-sm opacity-60">
                Enter OTP sent to your email
              </p>
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

            <TextField
              fullWidth
              name="fullName"
              label="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </div>
        )}

        {!auth.otpSent && (
          <Button
            fullWidth
            variant="contained"
            sx={{ py: "11px", my: 1 }}
            onClick={handleSendOtp}
          >
            Send OTP
          </Button>
        )}
        <Button
          onClick={() => formik.handleSubmit()}
          fullWidth
          variant="contained"
          sx={{ py: "11px", my: 1 }}
        >
          Signup
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
