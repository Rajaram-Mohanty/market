import React from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AddNewCouponForm = () => {
  const formik = useFormik({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        validityStartDate: values.validityStartDate
          ? dayjs(values.validityStartDate).toISOString()
          : null,
        validityEndDate: values.validityEndDate
          ? dayjs(values.validityEndDate).toISOString()
          : null,
      };
      console.log("formatted values", formattedValues);
    },
  });

  return (

    <div>
      <h1 className="text-2xl font-bold text-primary-color pb-5 text-center"> Create New Coupon</h1>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="code"
              label="Coupon Code"
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="discountPercentage"
              label="Coupon Discount Percentage"
              type="number"
              value={formik.values.discountPercentage}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <DatePicker
              sx={{ width: "100%" }}
              label="Validity Start Date"
              value={formik.values.validityStartDate}
              onChange={(newValue) =>
                formik.setFieldValue("validityStartDate", newValue)
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <DatePicker
              sx={{ width: "100%" }}
              label="Validity End Date"
              value={formik.values.validityEndDate}
              onChange={(newValue) =>
                formik.setFieldValue("validityEndDate", newValue)
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="minimumOrderValue"
              label="Minimum Order Value"
              type="number"
              value={formik.values.minimumOrderValue}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ py: "0.8rem" }}
            >
              Create Coupon
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
    </div>
  );
};

export default AddNewCouponForm;
