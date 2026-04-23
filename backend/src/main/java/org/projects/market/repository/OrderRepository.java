package org.projects.market.repository;

import org.projects.market.model.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

        @Override
        @Query("SELECT o FROM Order o LEFT JOIN FETCH o.user u LEFT JOIN FETCH u.addresses LEFT JOIN FETCH o.shippingAddress LEFT JOIN FETCH o.orderItems oi LEFT JOIN FETCH oi.product p LEFT JOIN FETCH p.category LEFT JOIN FETCH p.seller WHERE o.id = :id")
        Optional<Order> findById(@Param("id") Long id);

        @Query("SELECT o FROM Order o LEFT JOIN FETCH o.user LEFT JOIN FETCH o.shippingAddress WHERE o.user.id = :userId")
        List<Order> findByUserId(@Param("userId") Long userId);

        @Query("SELECT o FROM Order o LEFT JOIN FETCH o.user LEFT JOIN FETCH o.shippingAddress WHERE o.sellerId = :sellerId")
        List<Order> findBySellerId(@Param("sellerId") Long sellerId);
}
