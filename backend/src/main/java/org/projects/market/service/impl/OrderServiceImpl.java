package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.domain.OrderStatus;
import org.projects.market.domain.PaymentStatus;
import org.projects.market.model.*;
import org.projects.market.repository.AddressRepository;
import org.projects.market.repository.OrderItemRepository;
import org.projects.market.repository.OrderRepository;
import org.projects.market.repository.PaymentOrderRepository;
import org.projects.market.repository.ProductRepository;
import org.projects.market.repository.UserRepository;
import org.projects.market.service.CartService;
import org.projects.market.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final ProductRepository productRepository;
    private final PaymentOrderRepository paymentOrderRepository;

    @Override
    @org.springframework.transaction.annotation.Transactional
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {

        // 1. Handle Shipping Address
        Address savedAddress = addressRepository.save(shippingAddress);
        if (!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }

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
    @Transactional(readOnly = true)
    public Order findOrderById(Long orderId) throws Exception {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new Exception("order not found ..."));

        // Safely initialize lazy collections before Hibernate session closes
        if (order.getOrderItems() != null) {
            order.getOrderItems().size();
            for (OrderItem item : order.getOrderItems()) {
                if (item.getProduct() != null && item.getProduct().getImages() != null) {
                    item.getProduct().getImages().size();
                }
            }
        }

        return order;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> usersOrderHistory(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);

        // Manual Multi-Query Strategy: Fetch all order items and stitch them back
        stitchOrderItems(orders);

        return orders;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> sellersOrder(Long sellerId) {
        List<Order> orders = orderRepository.findBySellerId(sellerId);

        // Manual Multi-Query Strategy: Fetch all order items and stitch them back
        stitchOrderItems(orders);

        return orders;
    }

    private void stitchOrderItems(List<Order> orders) {
        if (orders.isEmpty())
            return;

        List<Long> orderIds = orders.stream()
                .map(Order::getId)
                .collect(Collectors.toList());

        // Fetch all order items for these orders in one query
        List<OrderItem> allOrderItems = orderItemRepository.findByOrderIdIn(orderIds);

        // Group by Order ID
        Map<Long, List<OrderItem>> itemsByOrderId = allOrderItems.stream()
                .collect(Collectors.groupingBy(item -> item.getOrder().getId()));

        // Collect all products for manual image fetching
        List<Product> allProducts = allOrderItems.stream()
                .map(OrderItem::getProduct)
                .distinct()
                .collect(Collectors.toList());

        if (!allProducts.isEmpty()) {
            List<Long> productIds = allProducts.stream()
                    .map(Product::getId)
                    .collect(Collectors.toList());

            List<Object[]> imageResults = productRepository.findImagesByProductIds(productIds);
            Map<Long, List<String>> imagesMap = imageResults.stream()
                    .collect(Collectors.groupingBy(
                            res -> (Long) res[0],
                            Collectors.mapping(res -> (String) res[1], Collectors.toList())));

            allProducts.forEach(p -> p.setImages(imagesMap.getOrDefault(p.getId(), new ArrayList<>())));
        }

        // Stitch back to orders
        orders.forEach(order -> {
            List<OrderItem> items = itemsByOrderId.getOrDefault(order.getId(), new ArrayList<>());
            order.setOrderItems(items);
        });
    }

    @Override
    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        order.setOrderStatus(orderStatus);

        Order savedOrder = orderRepository.save(order);
        // Force initialization of lazy User proxy to prevent Jackson serialization
        // error
        if (savedOrder.getUser() != null) {
            String email = savedOrder.getUser().getEmail();
        }

        // Safely initialize the persistent bag without replacing the collection
        // reference
        // (which prevents the 'orphan deletion no longer referenced' Hibernate
        // exception)
        if (savedOrder.getOrderItems() != null) {
            savedOrder.getOrderItems().size();
            for (OrderItem item : savedOrder.getOrderItems()) {
                if (item.getProduct() != null && item.getProduct().getImages() != null) {
                    item.getProduct().getImages().size();
                }
            }
        }

        return savedOrder;
    }

    @Override
    @Transactional(readOnly = true)
    public OrderItem getOrderItemById(Long id) throws Exception {
        OrderItem item = orderItemRepository.findById(id).orElseThrow(() -> new Exception("order item not exist ..."));
        if (item.getProduct() != null && item.getProduct().getImages() != null) {
            item.getProduct().getImages().size();
        }
        return item;
    }

    @Override
    public Order cancelOrder(Long orderId, User user) throws Exception {
        Order order = findOrderById(orderId);

        if (!user.getId().equals(order.getUser().getId())) {
            throw new Exception("you dont have access to this order");
        }

        order.setOrderStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    @Override
    @Transactional
    public void deleteOrder(Long orderId) throws Exception {
        Order order = findOrderById(orderId);

        // Find if this order is tied to any payment orders, to cleanly break the
        // ManyToMany/OneToMany join constraints
        java.util.List<PaymentOrder> paymentOrders = paymentOrderRepository.findByOrderId(orderId);
        for (PaymentOrder po : paymentOrders) {
            po.getOrders().remove(order);
            paymentOrderRepository.save(po);
        }

        orderRepository.delete(order);
    }
}