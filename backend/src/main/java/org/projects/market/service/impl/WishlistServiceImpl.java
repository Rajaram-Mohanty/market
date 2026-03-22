package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Product;
import org.projects.market.model.User;
import org.projects.market.model.Wishlist;
import org.projects.market.repository.WishlistRepository;
import org.projects.market.service.WishlistService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;

    @Override
    public Wishlist createWishlist(User user) {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        return wishlistRepository.save(wishlist);
    }

    @Override
    @org.springframework.transaction.annotation.Transactional
    public Wishlist getWishlistByUserId(User user) {
        Wishlist wishlist = wishlistRepository.findByUserId(user.getId());
        if (wishlist == null) {
            wishlist = createWishlist(user);
        }

        // Force deep proxy initialization
        if (wishlist.getProducts() != null) {
            wishlist.getProducts().size();
            for (Product p : wishlist.getProducts()) {
                if (p.getImages() != null)
                    p.getImages().size();
            }
        }

        return wishlist;
    }

    @Override
    @org.springframework.transaction.annotation.Transactional
    public Wishlist addProductToWishlist(User user, Product product) {
        Wishlist wishlist = getWishlistByUserId(user);

        boolean found = false;
        java.util.Iterator<Product> iterator = wishlist.getProducts().iterator();
        while (iterator.hasNext()) {
            Product p = iterator.next();
            if (p.getId().equals(product.getId())) {
                iterator.remove();
                found = true;
                break;
            }
        }

        if (!found) {
            wishlist.getProducts().add(product);
        }

        Wishlist savedWishlist = wishlistRepository.save(wishlist);

        if (savedWishlist.getProducts() != null) {
            savedWishlist.getProducts().size();
            for (Product p : savedWishlist.getProducts()) {
                if (p.getImages() != null)
                    p.getImages().size();
            }
        }

        return savedWishlist;
    }
}
