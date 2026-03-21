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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public Review createReview(CreateReviewRequest req, User user, Long productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new Exception("Product not found"));

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReviewText(req.getReviewText());
        review.setRating(req.getReviewRating());
        review.setProductImages(req.getProductImages());
        review.setCreatedAt(LocalDateTime.now());

        // Don't manually add and save parent with child collection because it causes
        // LazyInitializationException [12:12:15]
        // product.getReviews().add(review);
        // productRepository.save(product);

        return reviewRepository.save(review);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Review> getReviewByProductId(Long productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);

        // Manual Multi-Query Strategy: Fetch all images for these reviews in one query
        stitchReviewImages(reviews);

        return reviews;
    }

    private void stitchReviewImages(List<Review> reviews) {
        if (reviews.isEmpty())
            return;

        List<Long> reviewIds = reviews.stream()
                .map(Review::getId)
                .collect(Collectors.toList());

        List<Object[]> imageResults = reviewRepository.findImagesByReviewIds(reviewIds);

        Map<Long, List<String>> imagesMap = imageResults.stream()
                .collect(Collectors.groupingBy(
                        res -> (Long) res[0],
                        Collectors.mapping(res -> (String) res[1], Collectors.toList())));

        reviews.forEach(review -> review.setProductImages(imagesMap.getOrDefault(review.getId(), new ArrayList<>())));
    }

    @Override
    public Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception {

        Review review = getReviewById(reviewId);

        // Security check: only the author can update the review
        if (!review.getUser().getId().equals(userId)) {
            throw new Exception("You can't update this review");
        }

        review.setReviewText(reviewText);
        review.setRating(rating);
        return reviewRepository.save(review);
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
