export interface ReviewUser {
  id: number;
  fullName: string;
  email: string;
}

export interface Review {
  id: number;
  reviewText: string;
  rating: number;
  productImages: string[];
  createdAt: string;
  user: ReviewUser;
}

export interface CreateReviewRequest {
  reviewText: string;
  reviewRating: number;
  productImages: string[];
}

export interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  submitted: boolean;
}
