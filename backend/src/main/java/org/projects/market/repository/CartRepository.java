package org.projects.market.repository;

import org.projects.market.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {


    Cart findByUserId(Long id);
}
