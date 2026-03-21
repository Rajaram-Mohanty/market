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
    @EntityGraph(attributePaths = { "category", "images", "seller", "seller.pickupAddress" })
    Optional<Product> findById(Long id);

    // Simple pageable listing with proactive fetch of seller and pickupAddress
    @Override
    @EntityGraph(attributePaths = { "category", "seller", "seller.pickupAddress" })
    Page<Product> findAll(Pageable pageable);

    // Specification-based listing with the same graph
    @Override
    @EntityGraph(attributePaths = { "category", "seller", "seller.pickupAddress" })
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    // Seller-specific products with nested seller data
    @EntityGraph(attributePaths = { "category", "seller", "seller.pickupAddress" })
    List<Product> findBySellerId(@Param("sellerId") Long sellerId);

    // Search with the same graph
    @EntityGraph(attributePaths = { "category", "seller", "seller.pickupAddress" })
    @Query("SELECT p FROM Product p WHERE " +
            "(:query IS NULL OR LOWER(p.title) " +
            "LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "OR (:query IS NULL OR LOWER(p.category.name)" +
            "LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchProduct(@Param("query") String query);

    @Query("SELECT p.id, img FROM Product p LEFT JOIN p.images img WHERE p.id IN :productIds")
    List<Object[]> findImagesByProductIds(@Param("productIds") List<Long> productIds);
}
