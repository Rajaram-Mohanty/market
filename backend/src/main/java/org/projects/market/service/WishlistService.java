package org.projects.market.service;

import org.projects.market.model.Product;
import org.projects.market.model.User;
import org.projects.market.model.Wishlist;

public interface WishlistService {
    Wishlist createWishlist(User user);
    Wishlist getWishlistByUserId(User user);
    Wishlist addProductToWishlist(User user, Product product);
}
