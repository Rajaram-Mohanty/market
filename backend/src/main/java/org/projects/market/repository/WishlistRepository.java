package org.projects.market.repository;

import org.projects.market.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    @Query("SELECT w FROM Wishlist w LEFT JOIN FETCH w.user u LEFT JOIN FETCH w.products p LEFT JOIN FETCH p.images LEFT JOIN FETCH p.category LEFT JOIN FETCH p.seller s LEFT JOIN FETCH s.pickupAddress WHERE u.id = :userId")
    Wishlist findByUserId(@Param("userId") Long userId);
}
