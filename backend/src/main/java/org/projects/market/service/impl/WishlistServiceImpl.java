package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Product;
import org.projects.market.model.User;
import org.projects.market.model.Wishlist;
import org.projects.market.repository.WishlistRepository;
import org.projects.market.service.WishlistService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;

    @Override
    public Wishlist createWishlist(User user) {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        return wishlistRepository.save(wishlist);
    }

    @Override
    @Transactional(readOnly = true)
    public Wishlist getWishlistByUserId(User user) {
        Wishlist wishlist = wishlistRepository.findByUserId(user.getId());
        if (wishlist == null) {
            wishlist = createWishlist(user);
        }
        return wishlist;
    }

    @Override
    @Transactional
    public Wishlist addProductToWishlist(User user, Product product) {
        Wishlist wishlist = getWishlistByUserId(user);

        // Toggle logic: if product is already in the wishlist, remove it. Otherwise, add it.
        boolean removed = wishlist.getProducts().removeIf(p -> p.getId().equals(product.getId()));

        if (!removed) {
            wishlist.getProducts().add(product);
        }

        // Return the actively managed wishlist directly.
        // Hibernate's dirty checking will automatically flush the collection changes (INSERT/DELETE)
        // without calling .save(). This prevents em.merge() from converting the detached Product's
        // plain ArrayList images back into an uninitialized PersistentBag proxy.
        return wishlist;
    }
}
