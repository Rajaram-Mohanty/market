package org.projects.market.repository;

import org.projects.market.model.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {

    @org.springframework.data.jpa.repository.Query("SELECT p FROM PaymentOrder p LEFT JOIN FETCH p.user WHERE p.paymentLinkId = :paymentLinkId")
    PaymentOrder findByPaymentLinkId(@org.springframework.data.repository.query.Param("paymentLinkId") String paymentLinkId);

    @org.springframework.data.jpa.repository.Query("SELECT p FROM PaymentOrder p JOIN p.orders o WHERE o.id = :orderId")
    java.util.List<PaymentOrder> findByOrderId(
            @org.springframework.data.repository.query.Param("orderId") Long orderId);

}
