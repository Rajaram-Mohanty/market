import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Rating,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { RateReview } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { createReview, resetReviewSubmitted } from "../../../state/customer/reviewSlice";
import { fetchProductById } from "../../../state/customer/productSlice";

const CreateReview = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const { review, product } = useAppSelector((store) => store);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number | null>(4);

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
    return () => {
      dispatch(resetReviewSubmitted());
    };
  }, [productId]);

  // Redirect back to review list after successful submission
  useEffect(() => {
    if (review.submitted) {
      navigate(`/reviews/${productId}`);
    }
  }, [review.submitted]);

  const handleSubmit = () => {
    if (!reviewText.trim() || !rating) return;
    dispatch(
      createReview({
        productId: Number(productId),
        request: {
          reviewText,
          reviewRating: rating,
          productImages: [],
        },
      })
    );
  };

  return (
    <Box className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Product header */}
      {product.product && (
        <div className="flex items-center gap-4 p-4 border rounded-lg">
          <img
            className="w-20 h-20 object-cover rounded"
            src={product.product.images?.[0]}
            alt={product.product.title}
          />
          <div>
            <Typography variant="subtitle2" className="text-primary-color font-bold">
              {product.product.seller?.businessDetails.businessName}
            </Typography>
            <Typography variant="body1">{product.product.title}</Typography>
            <Typography variant="body2" className="text-gray-500">
              ₹{product.product.sellingPrice}
            </Typography>
          </div>
        </div>
      )}

      <Typography variant="h5" fontWeight="bold">
        Write a Review
      </Typography>

      {review.error && <Alert severity="error">{review.error}</Alert>}

      {/* Star rating */}
      <div className="space-y-1">
        <Typography variant="body1" fontWeight={500}>
          Your Rating
        </Typography>
        <Rating
          size="large"
          value={rating}
          precision={0.5}
          onChange={(_, newValue) => setRating(newValue)}
        />
      </div>

      {/* Review text */}
      <TextField
        label="Your Review"
        multiline
        rows={5}
        fullWidth
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="What did you think about this product?"
      />

      <div className="flex gap-3">
        <Button
          variant="contained"
          startIcon={
            review.loading ? <CircularProgress size={18} color="inherit" /> : <RateReview />
          }
          onClick={handleSubmit}
          disabled={review.loading || !reviewText.trim() || !rating}
          sx={{ py: "0.8rem", px: "2rem" }}
        >
          {review.loading ? "Submitting..." : "Submit Review"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(`/reviews/${productId}`)}
          sx={{ py: "0.8rem" }}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default CreateReview;
