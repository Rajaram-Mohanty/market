package org.projects.market.service;

import org.projects.market.model.Product;
import org.projects.market.model.Review;
import org.projects.market.model.User;
import org.projects.market.request.CreateReviewRequest;

import java.util.List;

public interface ReviewService {

    Review createReview(CreateReviewRequest req, User user, Product product);

    List<Review> getReviewByProductId(Long productId);

    Review updateReview(Long reviewId, String reviewText, double review, Long userId) throws Exception;

    void deleteReview(Long reviewId, Long userId) throws Exception;

    Review getReviewById(Long reviewId) throws Exception;

}
