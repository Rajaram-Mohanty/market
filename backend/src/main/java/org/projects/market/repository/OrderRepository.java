package org.projects.market.repository;

import org.projects.market.model.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

        @Override
        @EntityGraph(attributePaths = {
                        "user",
                        "user.addresses",
                        "shippingAddress",
                        "orderItems",
                        "orderItems.product"
        })
        Optional<Order> findById(Long id);

        @EntityGraph(attributePaths = {
                        "user",
                        "shippingAddress"
        })
        List<Order> findByUserId(Long userId);

        @EntityGraph(attributePaths = {
                        "user",
                        "shippingAddress"
        })
        List<Order> findBySellerId(Long sellerId);
}
