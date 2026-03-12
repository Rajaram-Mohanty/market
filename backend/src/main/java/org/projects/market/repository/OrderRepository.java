package org.projects.market.repository;

import org.projects.market.model.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = {
            "user",
            "shippingAddress",
            "orderItems",
            "orderItems.product",
            "orderItems.product.category",
            "orderItems.product.seller",
            "orderItems.product.seller.pickupAddress"
    })
    List<Order> findByUserId(Long userId);

    @EntityGraph(attributePaths = {
            "user",
            "shippingAddress",
            "orderItems",
            "orderItems.product",
            "orderItems.product.category",
            "orderItems.product.seller",
            "orderItems.product.seller.pickupAddress"
    })
    List<Order> findBySellerId(Long sellerId);
}
