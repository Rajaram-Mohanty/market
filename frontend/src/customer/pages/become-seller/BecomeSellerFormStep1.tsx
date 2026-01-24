import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const BecomeSellerFormStep1 = ({ formik }: any) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 9 }}
      >
        Contact Details
      </Typography>
      <div className="space-y-9">
        <TextField
          fullWidth
          name="mobile"
          label="Mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        <TextField
          fullWidth
          name="GSTIN"
          label="GSTIN"
          value={formik.values.GSTIN}
          onChange={formik.handleChange}
          error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
          helperText={formik.touched.GSTIN && formik.errors.GSTIN}
        />
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep1;
