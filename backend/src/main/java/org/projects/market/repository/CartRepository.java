package org.projects.market.repository;

import org.projects.market.model.Cart;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @EntityGraph(attributePaths = {
            "user",
            "user.addresses",
            "cartItems",
            "cartItems.product",
            "cartItems.product.category",
            "cartItems.product.seller",
            "cartItems.product.seller.pickupAddress",
            "cartItems.product.images"
    })
    Cart findByUserId(Long id);
}
