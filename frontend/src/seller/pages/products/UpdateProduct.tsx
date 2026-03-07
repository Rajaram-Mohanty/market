import { useState, useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { updateProduct } from "../../../state/seller/sellerProductSlice";
import { fetchProductById } from "../../../state/customer/productSlice";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProductForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { product } = useAppSelector((store) => store);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }
  }, [productId, dispatch]);

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
    onSubmit: async (values) => {
      if (productId) {
        const payload = {
          ...values,
          sizes: values.size, // Map size field correctly to backend sizes field
        };
        await dispatch(
          updateProduct({
            productId: Number(productId),
            request: payload,
          }),
        );
        console.log("Product Updated", payload);
        navigate("/seller/products");
      }
    },
  });

  useEffect(() => {
    if (product?.product) {
      const p = product.product;

      // Determine categories
      let cat1 = "";
      let cat2 = "";
      let cat3 = "";

      if (p.category) {
        if (p.category.level === 3) {
          cat3 = p.category.categoryId || "";
          cat2 = p.category.parentCategory?.categoryId || "";
          cat1 = p.category.parentCategory?.parentCategory?.categoryId || "";
        } else if (p.category.level === 2) {
          cat2 = p.category.categoryId || "";
          cat1 = p.category.parentCategory?.categoryId || "";
        } else if (p.category.level === 1) {
          cat1 = p.category.categoryId || "";
        }
      }

      formik.setValues({
        title: p.title || "",
        description: p.description || "",
        mrpPrice: p.mrpPrice ? String(p.mrpPrice) : "",
        sellingPrice: p.sellingPrice ? String(p.sellingPrice) : "",
        color: p.color || "",
        images: p.images || [],
        category: cat1,
        category2: cat2,
        category3: cat3,
        size: p.sizes || "", // Fallback if stored as single string sizes
      });
    }
  }, [product.product]);

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    setUploadImage(true);
    try {
      const image = await uploadToCloudinary(file);
      if (image) {
        formik.setFieldValue("images", [...formik.values.images, image]);
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    } finally {
      setUploadImage(false);
    }
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
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ mt: 3, p: 3, bgcolor: "white", borderRadius: 2 }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Update Product
      </Typography>
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
            Update Product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateProductForm;
