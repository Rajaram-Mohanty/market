package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.exceptions.ProductException;
import org.projects.market.model.Product;
import org.projects.market.model.Seller;
import org.projects.market.request.CreateProductRequest;
import org.projects.market.service.ProductService;
import org.projects.market.service.SellerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers/products")
public class SellerProductController {

    private final ProductService productService;
    private final SellerService sellerService;

    // [08:33:05] - Fetch all products belonging to the logged-in seller
    @GetMapping
    public ResponseEntity<List<Product>> getProductBySellerId(
            @RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        List<Product> products = productService.getProductBySellerId(seller.getId());
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // [08:34:20] - Create a new product for the logged-in seller
    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestBody CreateProductRequest request,
            @RequestHeader("Authorization") String jwt) throws Exception {

        Seller seller = sellerService.getSellerProfile(jwt);
        Product product = productService.createProduct(request, seller);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    // [08:35:45] - Delete a product owned by the seller
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId)
            throws ProductException {
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // [08:36:10] - Update an existing product's details
    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long productId,
            @RequestBody Product product) throws ProductException {

        Product updatedProduct = productService.updateProduct(productId, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
}
