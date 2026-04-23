package org.projects.market.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@com.fasterxml.jackson.annotation.JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({ "addresses" })
    private User customer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({ "orderItems", "user", "paymentDetails" })
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    private Seller seller;

    private LocalDateTime date = LocalDateTime.now();
}
