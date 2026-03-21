import { Avatar, Box, Grid, IconButton, Rating, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import type { Review } from "../../../types/reviewTypes";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { deleteReview } from "../../../state/customer/reviewSlice";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);

  const isOwner = auth.user?.id === review.user?.id;

  const handleDelete = () => {
    dispatch(deleteReview(review.id));
  };

  const initials = review.user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-5">
        <Box>
          <Avatar
            className="text-white"
            sx={{ width: 48, height: 48, backgroundColor: "#9155FD", fontSize: "0.9rem" }}
          >
            {initials}
          </Avatar>
        </Box>
        <div className="space-y-2">
          <div>
            <Typography fontWeight={600}>{review.user?.fullName}</Typography>
            <Typography variant="body2" className="opacity-60">
              {formattedDate}
            </Typography>
          </div>
          <Rating readOnly value={review.rating} precision={0.5} size="small" />
          <Typography variant="body2">
            {review.reviewText}
          </Typography>

          {review.productImages && review.productImages.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {review.productImages.map((img, i) => (
                <img
                  key={i}
                  className="w-20 h-20 object-cover rounded"
                  src={img}
                  alt={`review-img-${i}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {isOwner && (
        <div className="ml-2">
          <IconButton onClick={handleDelete} size="small">
            <Delete sx={{ color: red[400] }} fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
