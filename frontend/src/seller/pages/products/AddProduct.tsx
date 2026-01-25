import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../../../util/UploadToCloudinary";
import { mainCategory } from "../../../data/category/mainCategory";
import { menLevelTwo } from "../../../data/category/level-two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level-two/womenLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level-two/electronicsLevelTwo";
import { homeLevelTwo as furnitureLevelTwo } from "../../../data/category/level-two/homeLevelTwo";
import { menLevelThree } from "../../../data/category/level-three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level-three/womenLevelThree";
import { electronicsLevelThree } from "../../../data/category/level-three/electronicsLevelThree";
import { homeLevelThree as furnitureLevelThree } from "../../../data/category/level-three/homeLevelThree";
// import { useAppDispatch } from "../../../state/store";
// import { createProduct } from "../../../state/seller/sellerProductSlice";

const AddProductForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  // const dispatch = useAppDispatch();
  const dispatch = (action: any) => console.log(action);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      color: "",
      images: [] as string[],
      category: "",
      category2: "",
      category3: "",
      size: "",
    },
    onSubmit: (values) => {
      // dispatch(createProduct({
      //   request: values,
      //   jwt: localStorage.getItem("jwt") || ""
      // }));
      console.log("Product Created", values);
    },
  });

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter(
      (child: any) => child.parentCategoryId === parentCategoryId,
    );
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {/* Image Upload Section */}
        <Grid size={{ xs: 12 }} className="flex flex-wrap gap-5">
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="fileInput" className="relative cursor-pointer">
            <Box className="w-24 h-24 border rounded-md flex items-center justify-center border-gray-400">
              <AddPhotoAlternateIcon className="text-gray-400" />
            </Box>
            {uploadImage && (
              <Box className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
                <CircularProgress size={24} />
              </Box>
            )}
          </label>

          {formik.values.images.map((image, index) => (
            <div className="relative" key={index}>
              <img
                src={image}
                alt="Product"
                className="w-24 h-24 object-cover rounded-md"
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                size="small"
                sx={{ position: "absolute", top: 0, right: 0, color: "red" }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
        </Grid>

        {/* Form Fields */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <TextField
            fullWidth
            name="mrpPrice"
            label="MRP Price"
            type="number"
            value={formik.values.mrpPrice}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <TextField
            fullWidth
            name="sellingPrice"
            label="Selling Price"
            type="number"
            value={formik.values.sellingPrice}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <TextField
            fullWidth
            name="color"
            label="Color"
            value={formik.values.color}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <TextField
            fullWidth
            name="size"
            label="Size"
            value={formik.values.size}
            onChange={formik.handleChange}
          />
        </Grid>

        {/* Category Selection */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              label="Category"
            >
              {mainCategory.map((item) => (
                <MenuItem key={item.categoryId} value={item.categoryId}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Level 2 Category</InputLabel>
            <Select
              name="category2"
              value={formik.values.category2}
              onChange={formik.handleChange}
              label="Level 2 Category"
            >
              {formik.values.category === "men" &&
                menLevelTwo.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              {formik.values.category === "women" &&
                womenLevelTwo.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              {formik.values.category === "electronics" &&
                electronicsLevelTwo.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              {formik.values.category === "home_furniture" &&
                furnitureLevelTwo.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Level 3 Category</InputLabel>
            <Select
              name="category3"
              value={formik.values.category3}
              onChange={formik.handleChange}
              label="Level 3 Category"
            >
              {childCategory(
                formik.values.category === "men"
                  ? menLevelThree
                  : formik.values.category === "women"
                    ? womenLevelThree
                    : formik.values.category === "electronics"
                      ? electronicsLevelThree
                      : furnitureLevelThree,
                formik.values.category2,
              ).map((item: any) => (
                <MenuItem key={item.categoryId} value={item.categoryId}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button fullWidth variant="contained" type="submit" sx={{ py: 1.5 }}>
            Add Product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProductForm;
