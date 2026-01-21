package org.projects.market.service;

import org.projects.market.model.CartItem;

public interface CartItemService {

    CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception;

    void removeCartItem(Long userId, Long cartItemid) throws Exception;

    CartItem findCartItemById(Long id) throws Exception;
}
