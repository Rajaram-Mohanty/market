import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";

const BecomeSellerFormStep2 = ({ formik }: any) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 5 }}
      >
        Pickup Address
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.name"
            label="Name"
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.name &&
              Boolean(formik.errors.pickupAddress?.name)
            }
            helperText={
              formik.touched.pickupAddress?.name &&
              formik.errors.pickupAddress?.name
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.mobile"
            label="Mobile"
            value={formik.values.pickupAddress.mobile}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.mobile &&
              Boolean(formik.errors.pickupAddress?.mobile)
            }
            helperText={
              formik.touched.pickupAddress?.mobile &&
              formik.errors.pickupAddress?.mobile
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.pinCode"
            label="Pin Code"
            value={formik.values.pickupAddress.pinCode}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.pinCode &&
              Boolean(formik.errors.pickupAddress?.pinCode)
            }
            helperText={
              formik.touched.pickupAddress?.pinCode &&
              formik.errors.pickupAddress?.pinCode
            }
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.address"
            label="Address"
            value={formik.values.pickupAddress.address}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.address &&
              Boolean(formik.errors.pickupAddress?.address)
            }
            helperText={
              formik.touched.pickupAddress?.address &&
              formik.errors.pickupAddress?.address
            }
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.locality"
            label="Locality"
            value={formik.values.pickupAddress.locality}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.locality &&
              Boolean(formik.errors.pickupAddress?.locality)
            }
            helperText={
              formik.touched.pickupAddress?.locality &&
              formik.errors.pickupAddress?.locality
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.city"
            label="City"
            value={formik.values.pickupAddress.city}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.city &&
              Boolean(formik.errors.pickupAddress?.city)
            }
            helperText={
              formik.touched.pickupAddress?.city &&
              formik.errors.pickupAddress?.city
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.state"
            label="State"
            value={formik.values.pickupAddress.state}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.state &&
              Boolean(formik.errors.pickupAddress?.state)
            }
            helperText={
              formik.touched.pickupAddress?.state &&
              formik.errors.pickupAddress?.state
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BecomeSellerFormStep2;
