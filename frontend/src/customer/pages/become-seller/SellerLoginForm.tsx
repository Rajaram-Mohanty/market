import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { sendLoginSignupOtp } from "../../../state/authSlice";
import { sellerLogin } from "../../../state/seller/sellerAuthSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    onSubmit: (values) => {
      console.log("Login Values", values);
      dispatch(sellerLogin({ email: values.email, otp: values.otp, navigate }));
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

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

        {auth.otpSent && (
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
        )}

        {auth.otpSent ? (
          <Button
            onClick={() => formik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px", my: 2 }}
          >
            Login
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            sx={{ py: "11px", my: 2 }}
            onClick={handleSendOtp}
          >
            {auth.loading ? <CircularProgress /> : "Send OTP"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SellerLoginForm;
