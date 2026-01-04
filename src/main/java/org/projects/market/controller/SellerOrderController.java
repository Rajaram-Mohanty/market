package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.domain.OrderStatus;
import org.projects.market.model.Order;
import org.projects.market.model.Seller;
import org.projects.market.service.OrderService;
import org.projects.market.service.SellerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/orders")
public class SellerOrderController {

    private final OrderService orderService;
    private final SellerService sellerService;

    // Method to get all orders for a specific seller
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrdersHandler(
            @RequestHeader("Authorization") String jwt) throws Exception {

        // Fetch seller profile using the JWT token [10:44:25]
        Seller seller = sellerService.getSellerProfile(jwt);

        // Retrieve orders belonging to this seller
        List<Order> orders = orderService.sellersOrder(seller.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // Method to update the status of an order (e.g., PLACED, SHIPPED, DELIVERED)
    @PatchMapping("/{orderId}/status/{status}")
    public ResponseEntity<Order> updateOrderStatusHandler(
            @PathVariable Long orderId,
            @PathVariable OrderStatus status) throws Exception {

        Order order = orderService.updateOrderStatus(orderId, status);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
