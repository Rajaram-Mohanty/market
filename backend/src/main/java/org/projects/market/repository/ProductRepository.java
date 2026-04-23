package org.projects.market.repository;

import org.projects.market.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    @Override
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.category LEFT JOIN FETCH p.images LEFT JOIN FETCH p.seller s LEFT JOIN FETCH s.pickupAddress WHERE p.id = :id")
    Optional<Product> findById(@Param("id") Long id);

    // Simple pageable listing — load category + seller to avoid lazy proxy errors in JSON
    @Override
    @Query(value = "SELECT p FROM Product p LEFT JOIN FETCH p.category LEFT JOIN FETCH p.seller s LEFT JOIN FETCH s.pickupAddress",
           countQuery = "SELECT COUNT(p) FROM Product p")
    Page<Product> findAll(Pageable pageable);

    // Specification-based listing uses entity graph or dynamic fetch inside Specification
    // so we don't override the query here to not break Specification mapping.

    // Seller-specific products with nested seller data
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.category LEFT JOIN FETCH p.seller s LEFT JOIN FETCH s.pickupAddress WHERE p.seller.id = :sellerId")
    List<Product> findBySellerId(@Param("sellerId") Long sellerId);

    // Search with the same graph
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.category LEFT JOIN FETCH p.seller s LEFT JOIN FETCH s.pickupAddress WHERE " +
            "(:query IS NULL OR LOWER(p.title) " +
            "LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "OR (:query IS NULL OR LOWER(p.category.name)" +
            "LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchProduct(@Param("query") String query);

    @Query("SELECT p.id, img FROM Product p LEFT JOIN p.images img WHERE p.id IN :productIds")
    List<Object[]> findImagesByProductIds(@Param("productIds") List<Long> productIds);
}
