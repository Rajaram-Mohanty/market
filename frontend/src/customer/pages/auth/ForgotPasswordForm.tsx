import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  TextField,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { forgotPassword, resetPassword, clearOtpSent } from "../../../state/authSlice";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const emailSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

const resetSchema = Yup.object({
  otp: Yup.string().length(6, "OTP must be exactly 6 digits").required("OTP is required"),
  newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Please confirm your new password"),
});

const ForgotPasswordForm = ({ onBackToLogin }: ForgotPasswordFormProps) => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);
  const [showPassword, setShowPassword] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Step 1: Request OTP
  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      setSubmittedEmail(values.email);
      dispatch(forgotPassword({ email: values.email }));
    },
  });

  // Step 2: Verify OTP + set new password
  const resetFormik = useFormik({
    initialValues: { otp: "", newPassword: "", confirmPassword: "" },
    validationSchema: resetSchema,
    onSubmit: (values) => {
      dispatch(
        resetPassword({
          email: submittedEmail,
          otp: values.otp,
          newPassword: values.newPassword,
        })
      );
    },
  });

  const handleStartOver = () => {
    dispatch(clearOtpSent());
    emailFormik.resetForm();
    resetFormik.resetForm();
    setSubmittedEmail("");
  };

  // --- Success screen ---
  if (auth.passwordResetSuccess) {
    return (
      <div className="space-y-5 text-center">
        <div className="text-5xl">✅</div>
        <h1 className="font-bold text-xl text-primary-color">Password Reset!</h1>
        <p className="text-gray-500 text-sm">
          Your password has been updated successfully. You can now log in with your new password.
        </p>
        <Button
          fullWidth
          variant="contained"
          sx={{ py: "11px", mt: 2 }}
          onClick={() => {
            dispatch(clearOtpSent());
            onBackToLogin();
          }}
        >
          Back to Login
        </Button>
      </div>
    );
  }

  // --- Step 2: Enter OTP + new password ---
  if (auth.otpSent) {
    return (
      <div>
        <h1 className="text-center font-bold text-xl text-primary-color pb-2">
          Reset Password
        </h1>
        <p className="text-center text-sm text-gray-500 pb-6">
          An OTP was sent to <strong>{submittedEmail}</strong>. Enter it below along with your new password.
        </p>

        <div className="space-y-5">
          {auth.error && (
            <Alert severity="error">
              {typeof auth.error === "string" ? auth.error : "Invalid OTP. Please try again."}
            </Alert>
          )}

          <TextField
            fullWidth
            name="otp"
            label="Enter OTP"
            inputProps={{ maxLength: 6 }}
            value={resetFormik.values.otp}
            onChange={resetFormik.handleChange}
            onBlur={resetFormik.handleBlur}
            error={resetFormik.touched.otp && Boolean(resetFormik.errors.otp)}
            helperText={resetFormik.touched.otp && resetFormik.errors.otp}
          />

          <TextField
            fullWidth
            name="newPassword"
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={resetFormik.values.newPassword}
            onChange={resetFormik.handleChange}
            onBlur={resetFormik.handleBlur}
            error={resetFormik.touched.newPassword && Boolean(resetFormik.errors.newPassword)}
            helperText={resetFormik.touched.newPassword && resetFormik.errors.newPassword}
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

          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type={showPassword ? "text" : "password"}
            value={resetFormik.values.confirmPassword}
            onChange={resetFormik.handleChange}
            onBlur={resetFormik.handleBlur}
            error={resetFormik.touched.confirmPassword && Boolean(resetFormik.errors.confirmPassword)}
            helperText={resetFormik.touched.confirmPassword && resetFormik.errors.confirmPassword}
          />

          <Button
            onClick={() => resetFormik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px", my: 1 }}
            disabled={auth.loading}
          >
            {auth.loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
          </Button>

          <Button
            fullWidth
            variant="text"
            sx={{ textTransform: "none", color: "gray" }}
            onClick={handleStartOver}
          >
            ← Start over / use a different email
          </Button>
        </div>
      </div>
    );
  }

  // --- Step 1: Enter email ---
  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-2">
        Forgot Password
      </h1>
      <p className="text-center text-sm text-gray-500 pb-6">
        Enter your registered email address and we'll send you a one-time password (OTP) to reset your password.
      </p>

      <div className="space-y-5">
        {auth.error && (
          <Alert severity="error">
            {typeof auth.error === "string" ? auth.error : "Something went wrong. Please try again."}
          </Alert>
        )}

        <TextField
          fullWidth
          name="email"
          label="Email"
          type="email"
          value={emailFormik.values.email}
          onChange={emailFormik.handleChange}
          onBlur={emailFormik.handleBlur}
          error={emailFormik.touched.email && Boolean(emailFormik.errors.email)}
          helperText={emailFormik.touched.email && emailFormik.errors.email}
        />

        <Button
          onClick={() => emailFormik.handleSubmit()}
          fullWidth
          variant="contained"
          sx={{ py: "11px", my: 1 }}
          disabled={auth.loading}
        >
          {auth.loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
        </Button>

        <Button
          fullWidth
          variant="text"
          sx={{ textTransform: "none", color: "gray" }}
          onClick={onBackToLogin}
        >
          ← Back to Login
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
