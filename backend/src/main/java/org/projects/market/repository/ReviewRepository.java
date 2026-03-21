package org.projects.market.repository;

import org.projects.market.model.Review;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @EntityGraph(attributePaths = { "user" })
    Optional<Review> findById(Long id);

    @EntityGraph(attributePaths = { "user" })
    List<Review> findByProductId(Long productId);

    @EntityGraph(attributePaths = { "user" })
    List<Review> findByProductIdIn(Collection<Long> productIds);

    @org.springframework.data.jpa.repository.Query("SELECT r.id, img FROM Review r JOIN r.productImages img WHERE r.id IN :reviewIds")
    List<Object[]> findImagesByReviewIds(
            @org.springframework.data.repository.query.Param("reviewIds") Collection<Long> reviewIds);
}
