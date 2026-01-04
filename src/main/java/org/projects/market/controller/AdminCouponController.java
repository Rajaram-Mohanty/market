package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Cart;
import org.projects.market.model.Coupon;
import org.projects.market.model.User;
import org.projects.market.response.ApiResponse;
import org.projects.market.service.CartService;
import org.projects.market.service.CouponService;
import org.projects.market.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupons")
public class AdminCouponController {

    private final CouponService couponService;
    private final UserService userService;
    private final CartService cartService;

    @PostMapping("/apply")
    public ResponseEntity<Cart> applyCoupon(
            @RequestParam String apply,
            @RequestParam String code,
            @RequestParam double orderValue,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart;

        if (apply.equals("true")) {
            cart = couponService.applyCoupon(code, orderValue, user);
        } else {
            cart = couponService.removeCoupon(code, user);
        }

        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PostMapping("/admin/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon) {
        Coupon createdCoupon = couponService.createCoupon(coupon);
        return new ResponseEntity<>(createdCoupon, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteCoupon(@PathVariable Long id) throws Exception {
        couponService.deleteCoupon(id);
        ApiResponse response = new ApiResponse();
        response.setMessage("Coupon deleted successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Coupon>> findAllCoupons() {
        List<Coupon> coupons = couponService.findAllCoupons();
        return new ResponseEntity<>(coupons, HttpStatus.OK);
    }
}