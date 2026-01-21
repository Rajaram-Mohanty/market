package org.projects.market.service.impl;



import lombok.RequiredArgsConstructor;
import org.projects.market.domain.OrderStatus;
import org.projects.market.domain.PaymentStatus;
import org.projects.market.model.*;
import org.projects.market.repository.AddressRepository;
import org.projects.market.repository.OrderItemRepository;
import org.projects.market.repository.OrderRepository;
import org.projects.market.repository.UserRepository;
import org.projects.market.service.CartService;
import org.projects.market.service.OrderService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {

        // 1. Handle Shipping Address
        if (!user.getAddresses().contains(shippingAddress)) {
            user.getAddresses().add(shippingAddress);
        }
        Address savedAddress = addressRepository.save(shippingAddress);

        //  Brand 1 -> 4 shirts
        //  Brand 2 -> 3 pants
        //  Brand 1 -> 2 shoes

        Map<Long, List<CartItem>> itemsBySeller = cart.getCartItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));

        Set<Order> orders = new HashSet<>();

        for (Map.Entry<Long, List<CartItem>> entry : itemsBySeller.entrySet()) {
            Long sellerId = entry.getKey();
            List<CartItem> items = entry.getValue();

            int totalOrderPrice = items.stream().mapToInt(CartItem::getSellingPrice).sum();
            int totalItem = items.stream().mapToInt(CartItem::getQuantity).sum();

            Order createdOrder = new Order();
            createdOrder.setUser(user);
            createdOrder.setSellerId(sellerId);
            createdOrder.setTotalMrpPrice(totalOrderPrice);
            createdOrder.setTotalSellingPrice(totalOrderPrice);
            createdOrder.setTotalItem(totalItem);
            createdOrder.setShippingAddress(savedAddress);
            createdOrder.setOrderStatus(OrderStatus.PENDING);
            createdOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);

            Order savedOrder = orderRepository.save(createdOrder);
            orders.add(savedOrder);

            List<OrderItem> orderItems = new ArrayList<>();
            for (CartItem item : items) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setMrpPrice(item.getMrpPrice());
                orderItem.setProduct(item.getProduct());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setSize(item.getSize());
                orderItem.setUserId(item.getUserId());
                orderItem.setSellingPrice(item.getSellingPrice());

                OrderItem savedOrderItem = orderItemRepository.save(orderItem);
                savedOrder.getOrderItems().add(savedOrderItem);
            }
        }

        return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {
        return orderRepository.findById(orderId).orElseThrow(()->
                new Exception("order not found ..."));
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> sellersOrder(Long sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        order.setOrderStatus(orderStatus);
        return orderRepository.save(order);
    }

    @Override
    public OrderItem getOrderItemById(Long id) throws Exception {
        return orderItemRepository.findById(id).orElseThrow(() ->
                new Exception("order item not exist ..."));
    }



//    @Override
//    public Order placedOrder(Long orderId) {
//        Order order = findOrderById(orderId);
//        order.setOrderStatus("PLACED");
//        order.getPaymentDetails().setStatus("COMPLETED");
//        return orderRepository.save(order);
//    }
//
//    @Override
//    public Order confirmedOrder(Long orderId) {
//        Order order = findOrderById(orderId);
//        order.setOrderStatus("CONFIRMED");
//        return orderRepository.save(order);
//    }

//    @Override
//    public Order shippedOrder(Long orderId) {
//        Order order = findOrderById(orderId);
//        order.setOrderStatus("SHIPPED");
//        return orderRepository.save(order);
//    }

//    @Override
//    public Order deliveredOrder(Long orderId) {
//        Order order = findOrderById(orderId);
//        order.setOrderStatus("DELIVERED");
//        return orderRepository.save(order);
//    }

    @Override
    public Order cancelOrder(Long orderId, User user) throws Exception {
        Order order = findOrderById(orderId);

        if(!user.getId().equals(order.getUser().getId())){
            throw new Exception("you dont have access to this order");
        }

        order.setOrderStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

//    @Override
//    public List<Order> getAllOrders() {
//        return orderRepository.findAll();
//    }
//
//    @Override
//    public void deleteOrder(Long orderId) {
//        Order order = findOrderById(orderId);
//        orderRepository.deleteById(order.getId());
//    }
}