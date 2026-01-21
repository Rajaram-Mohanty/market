package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Product;
import org.projects.market.model.Review;
import org.projects.market.model.User;
import org.projects.market.repository.ProductRepository;
import org.projects.market.repository.ReviewRepository;
import org.projects.market.request.CreateReviewRequest;
import org.projects.market.service.ReviewService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    @Override
    public Review createReview(CreateReviewRequest req, User user, Product product) {
        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReviewText(req.getReviewText());
        review.setRating(req.getReviewRating());
        review.setProductImages(req.getProductImages());
        review.setCreatedAt(LocalDateTime.now());

        // Add the review to the product's list of reviews and save [12:12:15]
        product.getReviews().add(review);
        productRepository.save(product);

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception {

        Review review = getReviewById(reviewId);


        // Security check: only the author can update the review
        if (!review.getUser().getId().equals(userId)) {
            review.setReviewText(reviewText);
            review.setRating(rating);
            return reviewRepository.save(review);
        }

            throw new Exception("You can't update this review");
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws Exception {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new Exception("Review not found"));

        // Security check: only the author can delete the review
        if (!review.getUser().getId().equals(userId)) {
            throw new Exception("You can't delete this review");
        }

        reviewRepository.delete(review);
    }

    @Override
    public Review getReviewById(Long reviewId) throws Exception {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new Exception("Review not found"));
    }
}
