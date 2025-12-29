package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.CartItem;
import org.projects.market.model.User;
import org.projects.market.repository.CartItemRepository;
import org.projects.market.service.CartItemService;
import org.projects.market.service.UserService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final UserService userService;

    // [09:22:15] - Update the quantity of an existing cart item
    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {
        CartItem item = findCartItemById(id);
        User cartItemUser = item.getCart().getUser();

        // Security check: Ensure the user owns the cart item they are updating
        if (cartItemUser.getId().equals(userId)) {
            item.setQuantity(cartItem.getQuantity());
            item.setMrpPrice(item.getQuantity() * item.getProduct().getMrpPrice());
            item.setSellingPrice(item.getQuantity() * item.getProduct().getSellingPrice());

            return cartItemRepository.save(item);
        }
        throw new Exception("You can't update another user's cart item");
    }

    // @Override
    // public CartItem isCartItemExist(Cart cart, Product product, String size, Long
    // userId) {
    // CartItem cartItem = cartItemRepository.isCartItemExist(cart, product, size,
    // userId);
    // return cartItem;
    // }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws Exception {
        CartItem item = findCartItemById(cartItemId);

        User cartItemUser = item.getCart().getUser();

        if (cartItemUser.getId().equals(userId)) {
            cartItemRepository.delete(item);
        } else {
            throw new Exception("You can't remove another user's item");
        }
    }

    // [09:27:50] - Find a cart item by its database ID
    @Override
    public CartItem findCartItemById(Long id) throws Exception {
        return cartItemRepository.findById(id).orElseThrow(() -> new Exception("cart item not found with id " + id));

    }
}
