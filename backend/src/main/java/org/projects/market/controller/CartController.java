package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.exceptions.ProductException;
import org.projects.market.model.Cart;
import org.projects.market.model.CartItem;
import org.projects.market.model.Product;
import org.projects.market.model.User;
import org.projects.market.request.AddItemRequest;
import org.projects.market.response.ApiResponse;
import org.projects.market.service.CartItemService;
import org.projects.market.service.CartService;
import org.projects.market.service.ProductService;
import org.projects.market.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final UserService userService;
    private final ProductService productService;
    private final CartItemService cartItemService;

    @GetMapping
    public ResponseEntity<Cart> findUserCartHandler(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findUserCart(user);

        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    // [09:29:40] - Add an item to the cart
    @PutMapping("/add")
    public ResponseEntity<CartItem> addItemToCart(
            @RequestBody AddItemRequest req,
            @RequestHeader("Authorization") String jwt) throws ProductException, Exception {

        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(req.getProductId());

        CartItem item = cartService.addCartItem(
                user,
                product,
                req.getSize(),
                req.getQuantity()
        );

        ApiResponse res = new ApiResponse();
        res.setMessage("Item added to cart successfully");

        return new ResponseEntity<>(item, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItem(
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse res = new ApiResponse();
        res.setMessage("Item removed from cart successfully");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItem(
            @PathVariable Long cartItemId,
            @RequestBody CartItem cartItem,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        CartItem updatedCartItem = null;

        if(cartItem.getQuantity()>0){
         updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
        }

        return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
    }
}