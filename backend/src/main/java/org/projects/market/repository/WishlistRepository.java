package org.projects.market.repository;

import org.projects.market.model.Wishlist;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    @EntityGraph(attributePaths = {
            "user",
            "user.addresses",
            "products",
            "products.category",
            "products.seller",
            "products.seller.pickupAddress",
            "products.images"
    })
    Wishlist findByUserId(Long userId);
}
