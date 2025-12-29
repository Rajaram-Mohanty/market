package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.exceptions.ProductException;
import org.projects.market.model.Product;
import org.projects.market.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    // [08:28:11] - Method to get a single product by its ID
    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId)
            throws ProductException {
        Product product = productService.findProductById(productId);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    // [08:29:12] - Method to search for products based on a query string
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProduct(@RequestParam String query) {
        List<Product> products = productService.searchProduct(query);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // [08:30:28] - Method to fetch all products with dynamic filtering and pagination
    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer minDiscount,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String stock,
            @RequestParam(defaultValue = "0") Integer pageNumber) {

        return new ResponseEntity<>(productService.getAllProducts(
                category, brand, color, size, minPrice, maxPrice,
                minDiscount, sort, stock, pageNumber), HttpStatus.OK);
    }
}
