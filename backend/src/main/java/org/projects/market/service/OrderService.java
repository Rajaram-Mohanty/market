package org.projects.market.service;


import org.projects.market.domain.OrderStatus;
import org.projects.market.model.*;

import java.util.List;
import java.util.Set;

public interface OrderService {

    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart);

    public Order findOrderById(Long orderId) throws Exception;

    public List<Order> usersOrderHistory(Long userId);

    public List<Order>  sellersOrder(Long seller);

    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception;

    public OrderItem getOrderItemById(Long orderId) throws Exception;

//    public Order placedOrder(Long orderId);
//
//    public Order confirmedOrder(Long orderId);
//
//    public Order shippedOrder(Long orderId);
//
//    public Order deliveredOrder(Long orderId);
//
    public Order cancelOrder(Long orderId, User user) throws Exception;
//
//    public List<Order> getAllOrders();
//
//    public void deleteOrder(Long orderId);
}
