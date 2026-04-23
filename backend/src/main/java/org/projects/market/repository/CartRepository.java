package org.projects.market.repository;

import org.projects.market.model.Cart;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("SELECT c FROM Cart c LEFT JOIN FETCH c.user u LEFT JOIN FETCH c.cartItems ci LEFT JOIN FETCH ci.product p LEFT JOIN FETCH p.images LEFT JOIN FETCH p.category LEFT JOIN FETCH p.seller WHERE c.user.id = :userId")
    Cart findByUserId(@Param("userId") Long id);
}
