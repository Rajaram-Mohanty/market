package org.projects.market.service.impl;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.projects.market.exceptions.ProductException;
import org.projects.market.model.Category;
import org.projects.market.model.Product;
import org.projects.market.model.Review;
import org.projects.market.model.Seller;
import org.projects.market.repository.CategoryRepository;
import org.projects.market.repository.ProductRepository;
import org.projects.market.repository.ReviewRepository;
import org.projects.market.request.CreateProductRequest;
import org.projects.market.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public Product createProduct(CreateProductRequest req, Seller seller) {
        Category category1 = categoryRepository.findByCategoryId(req.getCategory());

        if (category1 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory());
            category.setLevel(1);
            category1 = categoryRepository.save(category);
        }

        Category category2 = categoryRepository.findByCategoryId(req.getCategory2());

        if (category2 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory2());
            category.setLevel(2);
            category.setParentCategory(category1);
            category2 = categoryRepository.save(category);
        }

        Category category3 = categoryRepository.findByCategoryId(req.getCategory3());

        if (category3 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory3());
            category.setLevel(3);
            category.setParentCategory(category2);
            category3 = categoryRepository.save(category);
        }

        int discountPercentage = calculateDiscountPercentage(req.getMrpPrice(), req.getSellingPrice());

        Product product = new Product();
        product.setSeller(seller);
        product.setCategory(category3);
        product.setDescription(req.getDescription());
        product.setCreatedAt(LocalDateTime.now());
        product.setTitle(req.getTitle());
        product.setColor(req.getColor());
        product.setSellingPrice(req.getSellingPrice());
        product.setImages(req.getImages());
        product.setMrpPrice(req.getMrpPrice());
        product.setSizes(req.getSizes());
        product.setDiscountPercent(discountPercentage);

        return productRepository.save(product);
    }

    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if (mrpPrice <= 0) {
            throw new IllegalArgumentException("Actual price must be greater than 0*");
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / (double) mrpPrice) * 100;
        return (int) discountPercentage;
    }

    @Override
    public void deleteProduct(Long productId) throws ProductException {
        Product product = findProductById(productId);
        productRepository.delete(product);
    }

    @Override
    public Product updateProduct(Long productId, CreateProductRequest req) throws ProductException {
        Product product = findProductById(productId);

        if (req.getTitle() != null && !req.getTitle().isEmpty()) {
            product.setTitle(req.getTitle());
        }
        if (req.getDescription() != null && !req.getDescription().isEmpty()) {
            product.setDescription(req.getDescription());
        }
        if (req.getColor() != null && !req.getColor().isEmpty()) {
            product.setColor(req.getColor());
        }
        if (req.getSellingPrice() > 0) {
            product.setSellingPrice(req.getSellingPrice());
        }
        if (req.getMrpPrice() > 0) {
            product.setMrpPrice(req.getMrpPrice());
        }
        if (req.getImages() != null && !req.getImages().isEmpty()) {
            product.setImages(req.getImages());
        }
        if (req.getSizes() != null && !req.getSizes().isEmpty()) {
            product.setSizes(req.getSizes());
        }

        if (product.getMrpPrice() > 0 && product.getSellingPrice() > 0) {
            int discountPercentage = calculateDiscountPercentage(product.getMrpPrice(), product.getSellingPrice());
            product.setDiscountPercent(discountPercentage);
        }

        // Handle category updates if category info is sent
        if (req.getCategory() != null && !req.getCategory().isEmpty()) {
            Category category1 = categoryRepository.findByCategoryId(req.getCategory());
            if (category1 == null) {
                Category category = new Category();
                category.setCategoryId(req.getCategory());
                category.setLevel(1);
                category1 = categoryRepository.save(category);
            }

            Category category2 = categoryRepository.findByCategoryId(req.getCategory2());
            if (category2 == null && req.getCategory2() != null && !req.getCategory2().isEmpty()) {
                Category category = new Category();
                category.setCategoryId(req.getCategory2());
                category.setLevel(2);
                category.setParentCategory(category1);
                category2 = categoryRepository.save(category);
            }

            Category category3 = categoryRepository.findByCategoryId(req.getCategory3());
            if (category3 == null && req.getCategory3() != null && !req.getCategory3().isEmpty()) {
                Category category = new Category();
                category.setCategoryId(req.getCategory3());
                category.setLevel(3);
                category.setParentCategory(category2);
                category3 = categoryRepository.save(category);
            }

            if (category3 != null) {
                product.setCategory(category3);
            }
        }

        return productRepository.save(product);
    }

    @Override
    @Transactional(readOnly = true)
    public Product findProductById(Long productId) throws ProductException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("product not found with id " + productId));

        // Manual Secondary Fetch: For a single product, fetch its images if not already
        // loaded by JPA graph
        if (product.getImages() == null || product.getImages().isEmpty()) {
            List<Object[]> results = productRepository.findImagesByProductIds(Collections.singletonList(productId));
            List<String> images = results.stream()
                    .map(res -> (String) res[1])
                    .collect(Collectors.toList());
            product.setImages(images);
        }

        return product;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> searchProduct(String query) {
        List<Product> products = productRepository.searchProduct(query);

        // Manual Multi-Query Strategy for Search results
        stitchCollections(products);

        return products;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> getAllProducts(String category, String brand, String colors, String sizes,
            Integer minPrice, Integer maxPrice, Integer minDiscount,
            String sort, String stock, Integer pageNumber) {

        Specification<Product> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtering by Category
            if (category != null && !category.isBlank()) {
                Join<Product, Category> categoryJoin = root.join("category");
                predicates.add(criteriaBuilder.equal(categoryJoin.get("categoryId"), category));
            }

            // Filtering by Color
            if (colors != null && !colors.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("color"), colors));
            }

            // Filtering by Sizes
            if (sizes != null) {
                predicates.add(criteriaBuilder.equal(root.get("size"), sizes));
            }

            // Filtering by Minimum Price
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sellingPrice"), minPrice));
            }

            // Filtering by Maximum Price
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sellingPrice"), maxPrice));
            }

            // Filtering by Minimum Discount
            if (minDiscount != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("discountPercent"), minDiscount));
            }

            // Filtering by Stock Status
            if (stock != null) {
                predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        // Handling Pagination and Sorting
        Pageable pageable;
        if (sort != null && !sort.isEmpty()) {
            pageable = switch (sort) {
                case "price_low" ->
                    PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("sellingPrice").ascending());
                case "price_high" ->
                    PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("sellingPrice").descending());
                default -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.unsorted());
            };
        } else {
            pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.unsorted());
        }

        Page<Product> page = productRepository.findAll(spec, pageable);

        // Manual Multi-Query Strategy: Fetch and stitch all images and reviews for the
        // current page in one secondary query
        stitchCollections(page.getContent());

        return page;
    }

    private void stitchCollections(List<Product> products) {
        if (products.isEmpty())
            return;

        List<Long> productIds = products.stream()
                .map(Product::getId)
                .collect(Collectors.toList());

        // 1. Stitch Images (ElementCollection)
        List<Object[]> imageResults = productRepository.findImagesByProductIds(productIds);
        Map<Long, List<String>> imagesMap = imageResults.stream()
                .collect(Collectors.groupingBy(
                        res -> (Long) res[0],
                        Collectors.mapping(res -> (String) res[1], Collectors.toList())));

        // 2. Stitch Reviews (OneToMany)
        List<Review> allReviews = reviewRepository.findByProductIdIn(productIds);
        Map<Long, List<Review>> reviewsMap = allReviews.stream()
                .collect(Collectors.groupingBy(r -> r.getProduct().getId()));

        products.forEach(p -> {
            p.setImages(imagesMap.getOrDefault(p.getId(), new ArrayList<>()));
            p.setReviews(reviewsMap.getOrDefault(p.getId(), new ArrayList<>()));
        });
    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> getProductBySellerId(Long sellerId) {
        List<Product> products = productRepository.findBySellerId(sellerId);
        stitchCollections(products);
        return products;
    }
}
