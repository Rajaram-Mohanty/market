package org.projects.market.service;

import org.projects.market.model.Cart;
import org.projects.market.model.CartItem;
import org.projects.market.model.Product;
import org.projects.market.model.User;

public interface CartService {

    public CartItem addCartItem(User user, Product product, String size, int quantity);

    public Cart findUserCart(User user);
}
