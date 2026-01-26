import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";

const CreateDealForm = () => {
  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        className="space-y-6 mt-7 sm:w-50 md:w-75 lg:w-100"
      >
        <div className="flex justify-center">
          <Typography variant="h4" className="text-center">
            Create Deal
          </Typography>
        </div>

        <div className="flex justify-center">
          <TextField
            fullWidth
            name="discount"
            label="discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
          />
        </div>

        <div className="flex justify-center">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.category}
              label="Category"
              onChange={formik.handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button variant="contained" type="submit">
          Create Deal
        </Button>
      </Box>
    </div>
  );
};

export default CreateDealForm;
