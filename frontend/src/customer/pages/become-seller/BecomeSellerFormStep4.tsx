import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const BecomeSellerFormStep4 = ({ formik }: any) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 9 }}
      >
        Supplier Details
      </Typography>
      <div className="space-y-9">
        <TextField
          fullWidth
          name="businessDetails.businessName"
          label="Business Name"
          value={formik.values.businessDetails.businessName}
          onChange={formik.handleChange}
          error={
            formik.touched.businessDetails?.businessName &&
            Boolean(formik.errors.businessDetails?.businessName)
          }
          helperText={
            formik.touched.businessDetails?.businessName &&
            formik.errors.businessDetails?.businessName
          }
        />
        <TextField
          fullWidth
          name="sellerName"
          label="Seller Name"
          value={formik.values.sellerName}
          onChange={formik.handleChange}
          error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
          helperText={formik.touched.sellerName && formik.errors.sellerName}
        />
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep4;
