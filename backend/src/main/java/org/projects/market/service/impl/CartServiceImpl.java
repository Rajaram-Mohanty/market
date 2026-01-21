package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Cart;
import org.projects.market.model.CartItem;
import org.projects.market.model.Product;
import org.projects.market.model.User;
import org.projects.market.repository.CartItemRepository;
import org.projects.market.repository.CartRepository;
import org.projects.market.service.CartService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
//    private final CartItemService cartItemService;

    @Override
    public Cart findUserCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId());

        // Calculate total price and total items dynamically [09:08:20]
        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getMrpPrice();
            totalDiscountedPrice += cartItem.getSellingPrice();
            totalItem += cartItem.getQuantity();
        }

        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalSellingPrice(totalDiscountedPrice);
        cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice));
        cart.setTotalItem(totalItem);

        return cart;
    }

    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if(mrpPrice<=0){
            return 0;
        }
        double discount = mrpPrice-sellingPrice;
        double discountPercentage = (discount/100)*100;
        return (int)discountPercentage;
    }

    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {
        Cart cart = findUserCart(user);

        // Check if the item already exists in the cart [09:13:05]
        CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, size);

        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(user.getId());
            cartItem.setSize(size);

            int totalPrice = quantity * product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);
            cartItem.setMrpPrice(quantity * product.getSellingPrice());

            cart.getCartItems().add(cartItem);
            cartItem.setCart(cart);

            return cartItemRepository.save(cartItem);
        }

        return isPresent;
    }
}
