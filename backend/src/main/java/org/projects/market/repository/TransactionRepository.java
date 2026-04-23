package org.projects.market.repository;

import org.projects.market.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @org.springframework.data.jpa.repository.Query("SELECT t FROM Transaction t LEFT JOIN FETCH t.customer LEFT JOIN FETCH t.seller s LEFT JOIN FETCH s.pickupAddress LEFT JOIN FETCH t.order o LEFT JOIN FETCH o.shippingAddress WHERE t.seller.id = :sellerId")
    List<Transaction> findBySellerId(@org.springframework.data.repository.query.Param("sellerId") Long sellerId);

    @org.springframework.data.jpa.repository.Query("SELECT t FROM Transaction t LEFT JOIN FETCH t.customer LEFT JOIN FETCH t.seller LEFT JOIN FETCH t.order WHERE t.order.id = :orderId")
    Transaction findByOrderId(@org.springframework.data.repository.query.Param("orderId") Long orderId);

    @Override
    @org.springframework.data.jpa.repository.Query("SELECT t FROM Transaction t LEFT JOIN FETCH t.customer LEFT JOIN FETCH t.seller s LEFT JOIN FETCH s.pickupAddress LEFT JOIN FETCH t.order o LEFT JOIN FETCH o.shippingAddress")
    List<Transaction> findAll();
}
