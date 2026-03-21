import { useEffect } from "react";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import { RateReview } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchReviewsByProductId } from "../../../state/customer/reviewSlice";
import { fetchProductById } from "../../../state/customer/productSlice";

const Review = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const { review, product } = useAppSelector((store) => store);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsByProductId(Number(productId)));
      dispatch(fetchProductById(productId));
    }
  }, [productId]);

  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-16">

      {/* Left: Product Info */}
      <section className="w-full lg:w-[28%] space-y-3 shrink-0">
        {product.product?.images?.[0] && (
          <img
            className="w-full rounded-lg object-cover"
            src={product.product.images[0]}
            alt={product.product.title}
          />
        )}
        <div>
          <Typography variant="subtitle1" fontWeight="bold">
            {product.product?.seller?.businessDetails.businessName}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {product.product?.title}
          </Typography>
          <div className="price flex items-center gap-3 mt-3 text-xl">
            <span className="font-medium">₹{product.product?.sellingPrice}</span>
            <span className="line-through text-gray-400 text-base">
              ₹{product.product?.mrpPrice}
            </span>
            <span className="text-green-600 font-semibold text-sm">
              {product.product?.discountPercent}% off
            </span>
          </div>
        </div>

        <Button
          variant="contained"
          startIcon={<RateReview />}
          onClick={() => navigate(`/reviews/${productId}/create`)}
          fullWidth
          sx={{ mt: 1 }}
        >
          Write a Review
        </Button>
      </section>

      {/* Right: Reviews List */}
      <section className="space-y-5 w-full">
        <Typography variant="h6" fontWeight="bold">
          Customer Reviews ({review.reviews.length})
        </Typography>

        {review.loading && (
          <div className="flex justify-center py-10">
            <CircularProgress />
          </div>
        )}

        {!review.loading && review.reviews.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <Typography variant="body1">No reviews yet. Be the first to review!</Typography>
          </div>
        )}

        {review.reviews.map((item) => (
          <div key={item.id} className="space-y-3">
            <ReviewCard review={item} />
            <Divider />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Review;