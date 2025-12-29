package org.projects.market.service;


import org.projects.market.exceptions.ProductException;
import org.projects.market.model.Product;
import org.projects.market.model.Seller;
import org.projects.market.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService  {
    public Product createProduct(CreateProductRequest req, Seller seller);
    public void deleteProduct(Long productId) throws ProductException;
    public Product updateProduct (Long productId, Product product) throws ProductException;
    Product findProductById(Long productId) throws ProductException;
    List<Product> searchProduct(String query);
    public Page<Product> getAllProducts(
            String category,
            String brand,
            String colours,
            String sizes,
            Integer minPrice,
            Integer maxPrice,
            Integer minDiscount,
            String sort,
            String stock,
            Integer pageNumber
    );
    List<Product> getProductBySellerId(Long sellerId);

}
