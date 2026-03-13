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

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    // Simple pageable listing with proactive fetch of seller and pickupAddress
    @Override
    @EntityGraph(attributePaths = {"category", "seller", "seller.pickupAddress"})
    Page<Product> findAll(Pageable pageable);

    // Specification-based listing with the same graph
    @Override
    @EntityGraph(attributePaths = {"category", "seller", "seller.pickupAddress"})
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);

    // Seller-specific products with nested seller data
    @EntityGraph(attributePaths = {"images", "category", "seller", "seller.pickupAddress"})
    List<Product> findBySellerId(Long Id);

    // Search with the same graph
    @EntityGraph(attributePaths = {"images", "category", "seller", "seller.pickupAddress"})
    @Query("SELECT p FROM Product p WHERE " +
            "(:query IS NULL OR LOWER(p.title) " +
            "LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "OR (:query IS NULL OR LOWER(p.category.name)" +
            "LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchProduct(@Param("query") String query);
}

