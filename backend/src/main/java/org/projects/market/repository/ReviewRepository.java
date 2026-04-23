package org.projects.market.repository;

import org.projects.market.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r LEFT JOIN FETCH r.user WHERE r.id = :id")
    Optional<Review> findById(@Param("id") Long id);

    @Query("SELECT r FROM Review r LEFT JOIN FETCH r.user WHERE r.product.id = :productId")
    List<Review> findByProductId(@Param("productId") Long productId);

    @Query("SELECT r FROM Review r LEFT JOIN FETCH r.user WHERE r.product.id IN :productIds")
    List<Review> findByProductIdIn(@Param("productIds") Collection<Long> productIds);

    @org.springframework.data.jpa.repository.Query("SELECT r.id, img FROM Review r JOIN r.productImages img WHERE r.id IN :reviewIds")
    List<Object[]> findImagesByReviewIds(
            @org.springframework.data.repository.query.Param("reviewIds") Collection<Long> reviewIds);
}
