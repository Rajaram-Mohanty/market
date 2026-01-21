package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Cart;
import org.projects.market.model.Coupon;
import org.projects.market.model.User;
import org.projects.market.repository.CartRepository;
import org.projects.market.repository.CouponRepository;
import org.projects.market.repository.UserRepository;
import org.projects.market.service.CouponService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public Cart applyCoupon(String code, double orderValue, User user) throws Exception {
        Coupon coupon = couponRepository.findByCode(code);
        Cart cart = cartRepository.findByUserId(user.getId());

        if (coupon == null) {
            throw new Exception("Coupon not valid");
        }

        if (user.getUsedCoupons().contains(coupon)) {
            throw new Exception("Coupon already used");
        }

        if (orderValue < coupon.getMinimumOrderValue()) {
            throw new Exception("Valid for minimum order value " + coupon.getMinimumOrderValue());
        }

        if (coupon.getIsActive() &&
                LocalDate.now().isAfter(coupon.getValidityStartDate()) &&
                LocalDate.now().isBefore(coupon.getValidityEndDate())) {

            user.getUsedCoupons().add(coupon);
            userRepository.save(user);

            double discountedPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;

            cart.setTotalSellingPrice(cart.getTotalSellingPrice() - discountedPrice);
            cart.setCouponCode(code);
            cartRepository.save(cart);
            return cart;
        }

        throw new Exception("Coupon not valid");
    }

    @Override
    public Cart removeCoupon(String code, User user) throws Exception {
        Coupon coupon = couponRepository.findByCode(code);
        if (coupon == null) {
            throw new Exception("Coupon not found");
        }

        Cart cart = cartRepository.findByUserId(user.getId());
        double discountedPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;

        cart.setTotalSellingPrice(cart.getTotalSellingPrice() + discountedPrice);
        cart.setCouponCode(null);
        user.getUsedCoupons().remove(coupon);

        userRepository.save(user);
        return cartRepository.save(cart);
    }

    @Override
    public Coupon findCouponById(Long id) throws Exception {
        return couponRepository.findById(id)
                .orElseThrow(() -> new Exception("Coupon not found"));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    @Override
    public List<Coupon> findAllCoupons() {
        return couponRepository.findAll();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCoupon(Long id) throws Exception {
        findCouponById(id);
        couponRepository.deleteById(id);
    }
}
