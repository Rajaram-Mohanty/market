package org.projects.market.repository;

import org.projects.market.model.Cart;
import org.projects.market.model.CartItem;
import org.projects.market.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.jaas.JaasPasswordCallbackHandler;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);

}
