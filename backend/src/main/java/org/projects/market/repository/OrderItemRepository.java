package org.projects.market.repository;

import org.projects.market.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @org.springframework.data.jpa.repository.Query("SELECT oi FROM OrderItem oi LEFT JOIN FETCH oi.product p LEFT JOIN FETCH p.category LEFT JOIN FETCH p.seller WHERE oi.order.id IN :orderIds")
    List<OrderItem> findByOrderIdIn(@org.springframework.data.repository.query.Param("orderIds") Collection<Long> orderIds);
}
