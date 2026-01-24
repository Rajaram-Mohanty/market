import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import { useFormik } from "formik";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      mobile: "",
      gst: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pinCode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: { accountNumber: "", ifscCode: "", accountHolderName: "" },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
      },
      password: "",
    },
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  const handleStep = (value: number) => () => {
    if (
      (activeStep > 0 && value === -1) ||
      (activeStep < steps.length - 1 && value === 1)
    ) {
      setActiveStep(activeStep + value);
    }
  };

  return (
    <div className="mt-10 space-y-10">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section>
        {activeStep === 0 && <BecomeSellerFormStep1 formik={formik} />}
        {activeStep === 1 && <BecomeSellerFormStep2 formik={formik} />}
        {activeStep === 2 && <BecomeSellerFormStep3 formik={formik} />}
        {activeStep === 3 && <BecomeSellerFormStep4 formik={formik} />}
      </section>

      <div className="flex items-center justify-between">
        <Button disabled={activeStep === 0} onClick={handleStep(-1)}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={
            activeStep === steps.length - 1
              ? () => formik.handleSubmit()
              : handleStep(1)
          }
        >
          {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default SellerAccountForm;
