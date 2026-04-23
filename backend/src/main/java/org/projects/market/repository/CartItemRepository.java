package org.projects.market.repository;

import org.projects.market.model.Cart;
import org.projects.market.model.CartItem;
import org.projects.market.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);

    @org.springframework.data.jpa.repository.Query("SELECT ci FROM CartItem ci LEFT JOIN FETCH ci.cart LEFT JOIN FETCH ci.product p LEFT JOIN FETCH p.images WHERE ci.id = :id")
    java.util.Optional<CartItem> findById(@org.springframework.data.repository.query.Param("id") Long id);
}
