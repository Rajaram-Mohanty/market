package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Product;
import org.projects.market.model.Review;
import org.projects.market.model.User;
import org.projects.market.request.CreateReviewRequest;
import org.projects.market.response.ApiResponse;
import org.projects.market.service.ProductService;
import org.projects.market.service.ReviewService;
import org.projects.market.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/product/{productId}/reviews")
    public ResponseEntity<List<Review>> getReviewsByProductId(
            @PathVariable Long productId) {

        List<Review> reviews = reviewService.getReviewByProductId(productId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PostMapping("/product/{productId}/reviews")
    public ResponseEntity<Review> createReview(
            @RequestBody CreateReviewRequest req,
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long productId) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(productId);

        Review review = reviewService.createReview(req, user, product);
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(
            @RequestBody CreateReviewRequest req,
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long reviewId) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Review review = reviewService.updateReview(
                reviewId,
                req.getReviewText(),
                req.getReviewRating(),
                user.getId()
        );
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long reviewId) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        reviewService.deleteReview(reviewId, user.getId());

        ApiResponse res = new ApiResponse();
        res.setMessage("Review deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
